import sqlite3
from flask_restful import Resource, reqparse
from models.mlmodels import MLModel
# from resources.eval_functions import EvaluationFunctions
from flask import Flask,request,render_template,redirect,url_for, jsonify
import json

class MLModels(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('model_path',
        type=str,
        required=True,
        help="Please provide a model path"
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
        model_entity = MLModel.find_by_id(eval_id)

        if model_entity:
            if model_entity.meta:
                return model_entity.json()
            eval_dict = model_entity.json()
            model_object = EvaluationFunctions(eval_dict['model_type'], eval_dict['model_path'], eval_dict['dataset_path'])
            if eval_dict['model_type'] == 'regression':
                metrics = model_object.evaluate_regression()
                model_entity.meta = metrics
            else:
                metrics = model_object.evaluate_classification()
                model_entity.meta = metrics
            model_entity.save_to_db()
            return model_entity.json()

        return {"message":"Requested evaluation entity doesn't exist"}, 404

    def delete(self,eval_id):
        evaluation_entity = EvalModel.find_by_id(eval_id)
        if evaluation_entity:
            evaluation_entity.delete_from_db()
        return {"message":"Evaluation removed"}
