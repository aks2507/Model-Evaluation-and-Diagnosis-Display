import sqlite3
from flask_restful import Resource, reqparse
from models.datasets import Dataset
from resources.dataset_report import DatasetReport
from flask import Flask,request,render_template,redirect,url_for, jsonify
import json

class DatasetResource(Resource):
	parser = reqparse.RequestParser()
	parser.add_argument('dataset_path',
		type=str,
		required=True,
		help="Please provide a model path"
	)
	parser.add_argument('dataset_type',
		type=str,
		required=True,
		help="Please define the type of model"
	)
	parser.add_argument('name',
		type=str,
		required=True,
		help="Please define the name of model"
	)

	def get(self,dataset_id):
		dataset_entity = Dataset.find_by_id(dataset_id)
		if dataset_entity:
			if dataset_entity.meta:
				return dataset_entity.json()
			dataset_dict = dataset_entity.json()
			# print(dataset_dict,type(dataset_dict))
			dataset_object =  DatasetReport(dataset_dict['dataset_path'])
			print(dataset_object.dataset_report(),type(dataset_object.dataset_report()))
			dataset_info = dataset_object.dataset_report()
			dataset_entity.meta = dataset_info

			dataset_entity.save_to_db()
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
	parser.add_argument('dataset_type',
		type=str,
		required=True,
		help="Please define the type of dataset"
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
		print(data)
		item = Dataset(**data)

		try:
			item.save_to_db()
		except:
			return {"message":"An error occured inserting the evaluation"}, 500

		return item.json(), 201
