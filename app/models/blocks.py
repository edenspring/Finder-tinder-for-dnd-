from .db import db

class Block(db.Model):

  __tablename__="blocks"

  id= db.Column(db.Integer, priary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=False)
