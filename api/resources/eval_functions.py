from flask import Flask,request,render_template,redirect,url_for
import numpy as np
import pandas as pd
import pickle
from sklearn import metrics
import csv
from sklearn.preprocessing import label_binarize
class EvaluationFunctions():
	def __init__(self, model_type, model_path, dataset_path):
		self.model_path = model_path
		self.model_type = model_type
		self.dataset_path = dataset_path

	def evaluate_classification(self):
		model_file=self.model_path
		dataset_file=self.dataset_path

		with open(dataset_file) as csv_file:
			csv_reader = csv.reader(csv_file, delimiter = ',')
			list_of_column_names = []
			for row in csv_reader:
				list_of_column_names.append(row)
				break
		path = r'%s' % model_file
		loaded_model = pickle.load(open(path, 'rb'))
		feature_scores=[]
		key = "coef_"
		if key in loaded_model.__dict__.keys():
			feature_scores=loaded_model.coef_[0]
		else:
			feature_scores=loaded_model.feature_importances_
		col_names = list_of_column_names[0]
		pima=pd.read_csv(dataset_file,header=None,names=col_names,skiprows=1)
		feature_cols=col_names[0:-1]
		label=col_names[-1]
		x=pima[feature_cols]
		y_test=pima[label]
		y_pred=loaded_model.predict(x)
		probs=loaded_model.predict_proba(x)
		print(loaded_model.get_params())
		y_actual=pima[label]
		n_classes=len(set(y_test.tolist()))
		if n_classes==2:
			acc=metrics.accuracy_score(y_actual,y_pred)
			precision_score=metrics.precision_score(y_actual,y_pred)
			recall=metrics.recall_score(y_actual,y_pred)
			f1=metrics.f1_score(y_actual,y_pred)
			log_loss=metrics.log_loss(y_actual,probs)
			probs=probs[::,1]
			fpr, tpr, _ = metrics.roc_curve(y_actual,  probs)
			roc_auc = metrics.roc_auc_score(y_actual, probs)
			precision_curve, recall_curve, _ = metrics.precision_recall_curve(y_actual, probs)
			precision_recall_auc=metrics.auc(recall_curve,precision_curve)
			cmatrix = metrics.confusion_matrix(y_actual,y_pred)
			cmatrix = cmatrix.tolist()
			fpr=fpr.tolist()
			tpr=tpr.tolist()
			precision_curve=precision_curve.tolist()
			recall_curve=recall_curve.tolist()
			columns=feature_cols
			feature_scores=feature_scores.tolist()
			return {"accuracy_score":acc,
			"precision_score":precision_score,
			"recall":recall,
			"f1_score":f1,
			"log_loss":log_loss,
			"fpr":fpr,
			"tpr":tpr,
			"roc_auc":roc_auc,
			"precision_curve":precision_curve,
			"recall_curve":recall_curve,
			"precision_recall_auc":precision_recall_auc,
			"confusion_matrix":cmatrix,
			"feature_scores":feature_scores,
			"columns":columns,
			"n_classes":n_classes
			}
		else:
			classes=[]
			for i in range(n_classes):
				classes.append(i)
			yy = label_binarize(y_actual, classes=classes)
			y_score = loaded_model.decision_function(x.values)
			fpr = dict()
			tpr = dict()
			roc_auc = dict()

			precision_curve=dict()
			recall_curve=dict()
			precision_recall_auc=dict()
			for i in range(n_classes):
				fpr[i], tpr[i], _ = metrics.roc_curve(yy[:, i], y_score[:, i])
				fpr[i]=fpr[i].tolist()
				tpr[i]=tpr[i].tolist()
				roc_auc[i] = metrics.auc(fpr[i], tpr[i])

				precision_curve[i],recall_curve[i],_=metrics.precision_recall_curve(yy[:,i],y_score[:,i])
				precision_curve[i]=precision_curve[i].tolist()
				recall_curve[i]=recall_curve[i].tolist()
				precision_recall_auc[i]=metrics.auc(recall_curve[i],precision_curve[i])
			acc=metrics.accuracy_score(y_actual,y_pred)
			precision_score=metrics.precision_score(y_actual,y_pred,average='macro')
			recall=metrics.recall_score(y_actual,y_pred,average='macro')
			f1=metrics.f1_score(y_actual,y_pred,average='macro')
			log_loss=metrics.log_loss(y_actual,probs)
			probs=probs[::,1]
			cmatrix = metrics.confusion_matrix(y_actual,y_pred)
			cmatrix = cmatrix.tolist()
			columns=feature_cols
			feature_scores=feature_scores.tolist()
			print(precision_curve)
			print(recall_curve)
			return {"accuracy_score":acc,
			"precision_score":precision_score,
			"recall":recall,
			"fpr":fpr,
			"tpr":tpr,
			"roc_auc":roc_auc,
			"f1_score":f1,
			"log_loss":log_loss,
			"confusion_matrix":cmatrix,
			"feature_scores":feature_scores,
			"columns":columns,
			"n_classes":n_classes,
			"precision_curve":precision_curve,
			"recall_curve":recall_curve,
			"precision_recall_auc":precision_recall_auc,
			}


	def evaluate_regression(self):
		model_file=self.model_path
		dataset_file=self.dataset_path

		with open(dataset_file) as csv_file:
			csv_reader = csv.reader(csv_file, delimiter = ',')
			list_of_column_names = []
			for row in csv_reader:
				list_of_column_names.append(row)
				break
		print(list_of_column_names[0])
		path = r'%s' % model_file
		loaded_model = pickle.load(open(path, 'rb'))

		key = "coef_"
		if key in loaded_model.__dict__.keys():
			feature_scores=loaded_model.coef_
		else:
			feature_scores=loaded_model.feature_importances_

		col_names = list_of_column_names[0]
		dataset=pd.read_csv(dataset_file,header=None,names=col_names,skiprows=1)

		feature_cols= col_names[0:-1]
		label=col_names[-1]

		X = dataset.loc[:,feature_cols]
		y_test_pred=loaded_model.predict(X)
		y_test=dataset[label]

		from sklearn.preprocessing import MinMaxScaler
		scaler = MinMaxScaler()
		y_test_pred_rs = y_test_pred.reshape(-1,1)

		scaler.fit(y_test_pred_rs)
		y_test_pred_scaled = scaler.transform(y_test_pred_rs)
		k = y_test_pred_scaled.shape
		y_pred = y_test_pred_scaled.reshape(k[0])

		y_test_np = np.asarray(y_test)
		y_test_rs = y_test_np.reshape(-1,1)

		scaler.fit(y_test_rs)
		y_test_scaled = scaler.transform(y_test_rs)
		k = y_test_scaled.shape
		y_test_new = y_test_scaled.reshape(k[0])

		r2 = metrics.r2_score(y_test, y_test_pred)
		ar2 = 1 - (1-metrics.r2_score(y_test, y_test_pred))*(len(y_test)-1)/(len(y_test)-X.shape[1]-1)
		mae = metrics.mean_absolute_error(y_test, y_test_pred)
		mse = metrics.mean_squared_error(y_test, y_test_pred)
		rmse = np.sqrt(metrics.mean_squared_error(y_test, y_test_pred))
		rmsle = np.sqrt(metrics.mean_squared_log_error( y_test_new, y_pred ))

		columns=feature_cols
		feature_scores=feature_scores.tolist()
		print(columns,type(columns),'ih')
		return {
			"Coefficient_of_Determination":r2,
			"Adjusted_r_squared":ar2,
			"mean_absolute_error":mae,
			"mean_squared_error":mse,
			"root_mean_squared_error":rmse,
			"root_mean_squared_log_error":rmsle,
			"feature_scores":feature_scores,
			"columns":columns,
			"observed":y_test.tolist(),
			"predicted":y_test_pred.tolist()
		}
