import numpy as np
import pandas as pd
from flask_restful import Api
from db import db

from flask import Flask,request,render_template,redirect,url_for, Response
from resources.evaluation import Evaluate, EvaluateList
from models.evaluation import EvalModel

app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = '#521637819082308ryfbbjdwd89'
api = Api(app)

@app.before_first_request
def create_tables():
	db.create_all()

api.add_resource(Evaluate,"/evaluate/<int:eval_id>")
api.add_resource(EvaluateList,"/evaluate")

db.init_app(app)

# if __name__=="__main__":
# 	db.init_app(app)
# 	app.run(debug=True)
