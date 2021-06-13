from db import db
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.sql import func
import datetime
class EvalModel(db.Model):
    __tablename__ = 'Evaluations'

    eval_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    model_type = db.Column(db.String(80))
    meta = db.Column(JSON)
    date_created = db.Column(db.DateTime, default=datetime.datetime.now)

    dataset_id = db.Column(db.Integer, db.ForeignKey('Datasets.dataset_id'), nullable=False)
    dataset = db.relationship("Dataset")

    model_id = db.Column(db.Integer, db.ForeignKey('MLModels.model_id'), nullable=False)
    model = db.relationship("MLModel")

    def __init__(self,name,model_type,model_id,dataset_id):
        self.name = name
        self.meta = {}
        self.model_type = model_type
        self.model_id = model_id
        self.dataset_id = dataset_id

    def json(self):
        dname = self.dataset.find_by_id(self.dataset_id).json()
        mname = self.model.find_by_id(self.model_id).json()
        return {"eval_id":self.eval_id,
        "name":self.name,
        "model_type":self.model_type,
        "metadata":self.meta,
        "model":mname,
        "dataset":dname,
        "date_created":str(self.date_created)}

    @classmethod
    def find_by_type(cls, type):
        return cls.query.filter_by(model_type=type)

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(eval_id=_id).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
