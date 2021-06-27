from flask_restful import Resource, reqparse
from models.mlmodels import MLModel
from resources.model_report import ModelReport
import json
import logging 

class MLModelResource(Resource):

    def get(self,model_id):
        
        model_entity = MLModel.find_by_id(model_id)
        
        if model_entity:
            if model_entity.meta:
                logging.debug("Model metadata exists")
                return model_entity.json()

            model_dict = model_entity.json()
            path = '\\'.join(model_dict['model_path'].split("\\")[:-1])
            filename = model_dict['model_path'].split("\\")[-1].split(".")[0] + ".json"
            json_path = "\\".join([path, filename])
            model_object = ModelReport(model_dict['model_path'], json_path)
            metrics = model_object.model_report()
            logging.debug(metrics)
            model_entity.meta = metrics
            model_entity.save_to_db()
            return model_entity.json()

        return {"message":"Requested model entity doesn't exist"}, 404

    def delete(self,model_id):
        model_entity = MLModel.find_by_id(model_id)
        if model_entity:
            model_entity.delete_from_db()
        return {"message":"Model removed"}


class ModelList(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('model_path',
        type=str,
        required=True,
        help="Please provide a model path"
    )
    parser.add_argument('name',
        type=str,
        required=True,
        help="Please define the name of model"
    )
    def get(self):
        return {"model_entities":[x.json() for x in MLModel.query.all()]}

    def post(self):
        data = ModelList.parser.parse_args()
        path = '\\'.join(data['model_path'].split("\\")[:-1])
        filename = data['model_path'].split("\\")[-1].split(".")[0] + ".json"
        json_path = "\\".join([path, filename])
        f = open(json_path,)
        json_payload = json.load(f)
        f.close()
        data["model_type"] = json_payload['use_case_type']
        item = MLModel(**data)

        try:
            item.save_to_db()
        except:
            return {"message":"An error occured inserting the model"}, 500

        return item.json(), 201
