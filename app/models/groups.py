from .db import db

class Group(db.Model):
  __tablename__ = "groups"

  id= db.Column(db.Integer, primary_key=True, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  name = db.Column(db.String(75), nullable=False)
  game_rules = db.Column(db.String(50))
  recruiting = db.Column(db.Boolean, default=True)

  user = db.relationship('User', back_ref='group')
  