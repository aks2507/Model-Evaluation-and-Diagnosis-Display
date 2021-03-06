import logging
import numpy as np 
import pickle
import json
class ModelReport():
	def __init__(self, model_path, json_path):
		self.model_file = model_path
		self.json_path = json_path
	
	def extract_json(self):
		f = open(self.json_path,)
		self.json_payload = json.load(f)
		f.close()

	def encode(self):
		final_values=[]
		final_keys=[]
		for i in range(len(self.values)):
			if self.keys[i] == 'estimators_':
				continue
			if isinstance(self.values[i],np.ndarray):
				final_values.append(self.values[i].tolist())
				final_keys.append(self.keys[i])
			elif isinstance(self.values[i],np.float64):
				final_values.append(float(self.values[i]))
				final_keys.append(self.keys[i])
			elif isinstance(self.values[i],np.int64):
				final_values.append(int(self.values[i]))
				final_keys.append(self.keys[i])
			elif self.values[i] is None:
				final_values.append(self.values[i])
				final_keys.append(self.keys[i])
			else:
				try:
					if isinstance(self.values[i],(float, int, str, list, dict, tuple, bool, complex, set, bytes, bytearray, frozenset)) == True:
						final_values.append(self.values[i])
						final_keys.append(self.keys[i])
				except:
					logging.error("Model Encoding Error")
		self.final_values = final_values
		self.final_keys = final_keys

	def get_loaded_model(self):
		path = r'%s' % self.model_file
		self.loaded_model = pickle.load(open(path, 'rb'))

	def get_parameters(self):
		self.params = self.loaded_model.__dict__
		self.keys = list(self.loaded_model.__dict__.keys())
		self.values = list(self.loaded_model.__dict__.values())

	def get_report(self):
		self.extract_json()
		self.get_loaded_model()
		self.get_parameters()
		self.encode()


	def model_report(self):
		self.get_report()
		return {
			"keys":self.final_keys,
			"values":self.final_values,
			"library":self.json_payload["library"],
			"model":self.json_payload["model"],
			"algorithm":self.json_payload["algorithm"],
			"library_version":self.json_payload["library_version"],
			"author":self.json_payload["author"],
			"hyperparameters":self.json_payload["hyperparameters"]
		}
