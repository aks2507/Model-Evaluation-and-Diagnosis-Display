from flask_restful import Resource, reqparse
from models.evaluation import EvalModel
from resources.eval_functions import EvaluationFunctions
from models.datasets import Dataset
from models.mlmodels import MLModel
import logging
class Evaluate(Resource):
    def get(self,eval_id):
        evaluation_entity = EvalModel.find_by_id(eval_id)
        if evaluation_entity:
            if evaluation_entity.meta:
                logging.debug("Evaluation instance metrics are already computed")
                return evaluation_entity.json()
            eval_dict = evaluation_entity.json()
            evaluation_object = EvaluationFunctions(
                                        eval_dict['model_type'], 
                                        eval_dict['model']['model_path'], 
                                        eval_dict['dataset']['dataset_path'],
                                        eval_dict['dataset']['metadata']['label'])
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
    parser.add_argument('name',
        type=str,
        required=True,
        help="Please define the name of model"
    )
    def get(self):
        return {"evaluation_entities":[x.json() for x in EvalModel.query.all()]}

    def post(self):
        data = EvaluateList.parser.parse_args()
        model_entity = MLModel.find_by_id(data["model_id"])
        logging.debug(model_entity)
        model_type = model_entity.model_type
        logging.debug(model_type)
        data["model_type"] = model_type

        item = EvalModel(**data)
        logging.debug([item.model_id, item.dataset_id, item.model_type, item.name])
        try:
            item.save_to_db()
        except:
            return {"message":"An error occured inserting the evaluation"}, 500

        return item.json(), 201
