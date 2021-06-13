import numpy as np
import pandas as pd
import pickle
from sklearn import metrics
import csv
import json

class ModelReport():
	def __init__(self, model_path):
		self.model_file = model_path

	def encode(self):
		for i in range(len(self.values)):
			if isinstance(self.values[i],np.ndarray):
				self.values[i] = self.values[i].tolist()
			if isinstance(self.values[i],np.float64):
				self.values[i] = float(self.values[i])
			if isinstance(self.values[i],np.int64):
				self.values[i] = int(self.values[i])

	def get_loaded_model(self):
		path = r'%s' % self.model_file
		self.loaded_model = pickle.load(open(path, 'rb'))

	def get_parameters(self):
		self.params = self.loaded_model.__dict__
		self.keys = list(self.loaded_model.__dict__.keys())
		self.values = list(self.loaded_model.__dict__.values())

	def get_report(self):
		self.get_loaded_model()
		self.get_parameters()
		self.encode()

	def model_report(self):
		self.get_report()
		return {
			"keys":self.keys,
			"values":self.values
		}
