from db import db
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.sql import func
import datetime

class Dataset(db.Model):
	__tablename__ = 'Datasets'

	dataset_id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(80))
	dataset_type = db.Column(db.String(80))
	meta = db.Column(JSON)
	dataset_path = db.Column(db.String(100))
	date_created = db.Column(db.DateTime, default=datetime.datetime.now)

	def __init__(self,name,dataset_type,dataset_path):
		self.name = name
		self.meta = {}
		self.dataset_type = dataset_type
		self.dataset_path = dataset_path

	def json(self):
		return {"dataset_id":self.dataset_id,
		"name":self.name,
		"dataset_type":self.dataset_type,
		"metadata":self.meta,
		"dataset_path":self.dataset_path,
		"date_created":str(self.date_created)}

	@classmethod
	def find_by_type(cls, type):
		return cls.query.filter_by(dataset_type=type)

	@classmethod
	def find_by_name(cls, name):
		return cls.query.filter_by(name=name).first()

	@classmethod
	def find_by_id(cls, _id):
		return cls.query.filter_by(dataset_id=_id).first()

	def save_to_db(self):
		db.session.add(self)
		db.session.commit()

	def delete_from_db(self):
		db.session.delete(self)
		db.session.commit()
