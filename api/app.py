import numpy as np
import pandas as pd
from flask_restful import Api
from db import db

from flask import Flask
from resources.evaluation import Evaluate, EvaluateList
from resources.datasets import DatasetResource, DatasetList
from resources.mlmodels import MLModelResource, ModelList
from flask_swagger_ui import get_swaggerui_blueprint

from logging.config import fileConfig

fileConfig('logging.cfg')

app=Flask(__name__)

### swagger specific ###
SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
SWAGGERUI_BLUEPRINT = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "Seans-Python-Flask-REST-Boilerplate"
    }
)
app.register_blueprint(SWAGGERUI_BLUEPRINT, url_prefix=SWAGGER_URL)
### end swagger specific ###



app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = '#521637819082308ryfbbjdwd89'
api = Api(app)

@app.before_first_request
def create_tables():
	db.create_all()

api.add_resource(Evaluate,"/modelEvaluations/<int:eval_id>")
api.add_resource(EvaluateList,"/modelEvaluations")
api.add_resource(DatasetResource,"/datasets/<int:dataset_id>")
api.add_resource(DatasetList,"/datasets")
api.add_resource(MLModelResource,"/models/<int:model_id>")
api.add_resource(ModelList,"/models")

db.init_app(app)
