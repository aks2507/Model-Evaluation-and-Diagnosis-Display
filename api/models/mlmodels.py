from db import db
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.sql import func
import datetime
class MLModel(db.Model):
    __tablename__ = 'Datasets'

    model_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    model_type = db.Column(db.String(80))
    meta = db.Column(JSON)
    model_path = db.Column(db.String(80))
    date_created = db.Column(db.DateTime, default=datetime.datetime.now)

    def __init__(self,name,model_type,model_path):
        self.name = name
        self.meta = {}
        self.model_type = model_type
        self.model_path = model_path

    def json(self):
        return {"model_id":self.model_id,
        "name":self.name,
        "model_type":self.model_type,
        "metadata":self.meta,
        "model_path":self.model_path,
        "date_created":str(self.date_created)}

    @classmethod
    def find_by_type(cls, type):
        return cls.query.filter_by(model_type=type)

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(model_id=_id).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
