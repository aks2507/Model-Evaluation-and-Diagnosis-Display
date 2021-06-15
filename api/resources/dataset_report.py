import numpy as np
import pandas as pd
import pickle
from sklearn import metrics
import csv
import json

class DatasetReport():
	def __init__(self, dataset_path):
		self.dataset_file = dataset_path

	def make_dataframe_set_cols(self):
		with open(self.dataset_file) as csv_file:
			csv_reader = csv.reader(csv_file, delimiter = ',')
			list_of_column_names = []
			for row in csv_reader:
				list_of_column_names.append(row)
				break
		col_names = list_of_column_names[0]
		dataframe = pd.read_csv(self.dataset_file,header=None,names=col_names,skiprows=1)

		self.dataframe = dataframe
		self.col_names = col_names

	def rows_and_cols(self):
		self.rows = len(self.dataframe)
		self.cols = len(self.dataframe.columns)

	def description(self):
		var = self.dataframe.describe()
		json_desc = var.to_json()
		data = json.loads(json_desc)
		self.describe = data

	def get_duplicates(self):
		x = 0
		for row in self.dataframe.duplicated():
			if row:
				x = x + 1

		self.duplicates = x
  
	def get_output_label(self):
		self.output=self.dataframe[self.col_names[-1]]
		self.output=self.output.tolist()
		print(type(self.output))

  
	def get_memory(self):
		self.memory = self.dataframe.memory_usage(index=True,deep=True).sum()

	def missing_values(self):
		self.missing = self.dataframe.isnull().sum()

	def h_spread(self):
		self.q1 = self.dataframe.quantile(0.25)
		self.q3 = self.dataframe.quantile(0.75)
		self.iqr = self.q3 - self.q1

	def get_outliers(self):
		self.h_spread()
		h = (self.dataframe < (self.q1 - 1.5 * self.iqr)) | (self.dataframe > (self.q3 + 1.5 * self.iqr))
		self.outliers = sum(x == True for x in h)

	def get_report(self):
		self.make_dataframe_set_cols()
		self.rows_and_cols()
		self.description()
		self.get_duplicates()
		self.get_memory()
		self.missing_values()
		self.get_outliers()
		self.get_output_label()

	def dataset_report(self):
		self.get_report()
		return {
			"columns":self.col_names,
			"number_of_columns":self.cols,
			"number_of_rows":self.rows,
			"missing_values":self.missing.tolist(),
			"iqr":self.iqr.to_list(),
			"number_of_outliers":self.outliers,
			"memory":int(self.memory),
			"number_of_duplicates":self.duplicates,
			"description":self.describe,
			"output_label":self.output
		}


# obj = DatasetReport("F:\\flask_related\\Datasets\\housing_test_dataset.csv")
# print(obj.dataset_report())
