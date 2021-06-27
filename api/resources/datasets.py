from flask_restful import Resource, reqparse
from models.datasets import Dataset
from resources.dataset_report import DatasetReport
import logging
import json

class DatasetResource(Resource):
	def get(self,dataset_id):
		dataset_entity = Dataset.find_by_id(dataset_id)
		if dataset_entity:
			if dataset_entity.meta:
				logging.debug('Dataset metadata already exists')
				return dataset_entity.json()
			try:
				dataset_dict = dataset_entity.json()
				path = '\\'.join(dataset_dict['dataset_path'].split("\\")[:-1])
				filename = dataset_dict['dataset_path'].split("\\")[-1].split(".")[0] + ".json"
				json_path = "\\".join([path, filename])
			except:
				logging.error("Error converting dataset entity to json")
			logging.debug(json_path)
			dataset_object =  DatasetReport(dataset_dict['dataset_path'], json_path)
			dataset_info = dataset_object.dataset_report()
			logging.debug(dataset_info)
			dataset_entity.meta = dataset_info
			try:
				dataset_entity.save_to_db()
			except:
				logging.error("There is an error saving dataset entity to database")
			return dataset_entity.json()

		return {"message":"Requested dataset entity doesn't exist"}, 404

	def delete(self,dataset_id):
		dataset_entity = Dataset.find_by_id(dataset_id)
		if dataset_entity:
			dataset_entity.delete_from_db()
		return {"message":"Dataset removed"}, 201


class DatasetList(Resource):
	parser = reqparse.RequestParser()
	parser.add_argument('dataset_path',
		type=str,
		required=True,
		help="Please provide a dataset path"
	)
	parser.add_argument('name',
		type=str,
		required=True,
		help="Please define the name of dataset"
	)
	def get(self):
		return {"dataset_entities":[x.json() for x in Dataset.query.all()]}

	def post(self):
		data = DatasetList.parser.parse_args()
		logging.debug(data)
		path = '\\'.join(data['dataset_path'].split("\\")[:-1])
		filename = data['dataset_path'].split("\\")[-1].split(".")[0] + ".json"
		json_path = "\\".join([path, filename])
		f = open(json_path,)
		json_payload = json.load(f)
		f.close()
		data["dataset_type"] = json_payload['use_case_type']
		item = Dataset(**data)
		try:
			item.save_to_db()
		except:
			return {"message":"An error occured inserting the evaluation"}, 500

		return item.json(), 201
