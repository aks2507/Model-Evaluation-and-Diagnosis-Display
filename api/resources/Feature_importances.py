
import logging

def featureImportances(loaded_model,model_type):

    if model_type=='classification':
        key = "coef_"
        feature_scores=[]
        if key in loaded_model.__dict__.keys():
            feature_scores=loaded_model.coef_[0]
        elif 'support_vectors_' in loaded_model.__dict__.keys():
            feature_scores=loaded_model.support_vectors_[0]
        elif '_fit_X' in loaded_model.__dict__.keys():
            feature_scores=loaded_model._fit_X[0]
        else:
            try:
                feature_scores=loaded_model.feature_importances_
            except:
                logging.debug("Model's feature importance doesn't exist")
        if isinstance(feature_scores,list)==False:
            feature_scores=feature_scores.tolist()
        return feature_scores
    else:
        key = "coef_"
        feature_scores=[]
        if key in loaded_model.__dict__.keys():
            feature_scores=loaded_model.coef_
        elif 'support_vectors_' in loaded_model.__dict__.keys():
            feature_scores=loaded_model.support_vectors_[0]
        else:
            try:
                feature_scores=loaded_model.feature_importances_
            except:
                logging.debug("Model's feature importance doesn't exist")
        if isinstance(feature_scores,list)==False:
            feature_scores=feature_scores.tolist()
        return feature_scores





