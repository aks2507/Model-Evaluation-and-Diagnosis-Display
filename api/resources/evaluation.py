from flask_restful import Resource, reqparse
from db import db
from models.evaluation import EvalModel
from resources.eval_functions import EvaluationFunctions
from models.datasets import Dataset
from models.mlmodels import MLModel
import logging
class Evaluate(Resource):
    regression_parser = reqparse.RequestParser()
    classification_parser = reqparse.RequestParser()  
    # Regression Parser
    regression_parser.add_argument('mean_absolute_error',
        type=float,
        required=True,
        help="Please provide Mean absolute score"
    )
    regression_parser.add_argument('mean_squared_error',
        type=float,
        required=True,
        help="Please provide a mean squared error value"
    )
    regression_parser.add_argument('root_mean_squared_error',
        type=float,
        required=True,
        help="Please provide a root mean squared error value"
    )
    regression_parser.add_argument('root_mean_squared_log_error',
        type=float,
        required=True,
        help="Please provide a root mean squared logarithmic error value"
    )
    regression_parser.add_argument('Coefficient_of_Determination',
        type=float,
        required=True,
        help="Please provide a r squared score"
    )
    regression_parser.add_argument('Adjusted_r_squared',
        type=float,
        required=True,
        help="Please provide an adjusted r squared score"
    )
    regression_parser.add_argument('additional_metrics',
        type=dict,
        required=True,
        help="Please provide additional metrics"
    )

    # Classification parser
    classification_parser.add_argument('accuracy_score',
        type=float,
        required=True,
        help="Please provide Accuracy score"
    )
    classification_parser.add_argument('precision_score',
        type=float,
        required=True,
        help="Please provide Precision score"
    )
    classification_parser.add_argument('f1_score',
        type=float,
        required=True,
        help="Please provide an f1 score"
    )
    classification_parser.add_argument('recall',
        type=float,
        required=True,
        help="Please provide a recall value"
    )
    classification_parser.add_argument('log_loss',
        type=float,
        required=True,
        help="Please provide a log loss value"
    )
    classification_parser.add_argument('additional_metrics',
        type=dict,
        required=True,
        help="Please provide additional metrics"
    )

    def get(self,eval_id):
        evaluation_entity = EvalModel.find_by_id(eval_id)
        if evaluation_entity:
            # if evaluation_entity.meta:
            #     logging.debug("Evaluation instance metrics are already computed")
            #     return evaluation_entity.json()
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
    
    def patch(self, eval_id):
        evaluation_entity = EvalModel.query.filter_by(eval_id = eval_id).first()
        update_entity = EvalModel.query.filter_by(eval_id = eval_id)
        if evaluation_entity:
            data=[]
            
            if evaluation_entity.model_type == "regression":
                data = Evaluate.regression_parser.parse_args()
            else:
                data = Evaluate.classification_parser.parse_args()
            
            eval_dict = evaluation_entity.json()
            for key, value in data.items():
                if data[key] is not None:
                    eval_dict["metadata"][key] = value
            metrics = eval_dict["metadata"]
            update_entity.update(dict(meta = metrics))
            db.session.commit()
            return {"message":"Patch request done"}, 201
        return {"message":"Evaluation entity does not exist"}, 404


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
