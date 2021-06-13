import sqlite3
from flask_restful import Resource, reqparse
from models.evaluation import EvalModel
from resources.eval_functions import EvaluationFunctions
from flask import Flask,request,render_template,redirect,url_for, jsonify
import json

class Evaluate(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('model_id',
        type=int,
        required=True,
        help="Please provide a model id"
    )
    parser.add_argument('dataset_id',
        type=int,
        required=True,
        help="Please provide a datset id"
    )
    parser.add_argument('model_type',
        type=str,
        required=True,
        help="Please define the type of model"
    )
    parser.add_argument('name',
        type=str,
        required=True,
        help="Please define the name of model"
    )

    def get(self,eval_id):
        evaluation_entity = EvalModel.find_by_id(eval_id)

        if evaluation_entity:
            if evaluation_entity.meta:
                return evaluation_entity.json()
            eval_dict = evaluation_entity.json()
            evaluation_object = EvaluationFunctions(eval_dict['model_type'], eval_dict['model']['model_path'], eval_dict['dataset']['dataset_path'])
            if eval_dict['model_type'] == 'regression':
                metrics = evaluation_object.evaluate_regression()
                evaluation_entity.meta = metrics
            else:
                metrics = evaluation_object.evaluate_classification()
                evaluation_entity.meta = metrics
            evaluation_entity.save_to_db()
            return evaluation_entity.json()

        return {"message":"Requested evaluation entity doesn't exist"}, 404

    def delete(self,eval_id):
        evaluation_entity = EvalModel.find_by_id(eval_id)
        if evaluation_entity:
            evaluation_entity.delete_from_db()
        return {"message":"Evaluation removed"}


class EvaluateList(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('model_id',
        type=int,
        required=True,
        help="Please provide a model id"
    )
    parser.add_argument('dataset_id',
        type=int,
        required=True,
        help="Please provide a datset id"
    )
    parser.add_argument('model_type',
        type=str,
        required=True,
        help="Please define the type of model"
    )
    parser.add_argument('name',
        type=str,
        required=True,
        help="Please define the name of model"
    )
    def get(self):
        return {"evaluation_entities":[x.json() for x in EvalModel.query.all()]}

    def post(self):
        data = EvaluateList.parser.parse_args()

        item = EvalModel(**data)

        try:
            item.save_to_db()
        except:
            return {"message":"An error occured inserting the evaluation"}, 500

        return item.json(), 201
