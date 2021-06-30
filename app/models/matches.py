from .db import db

class Match(db.Model):

  __tablename__='matches'

  id= db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  group_id = db.Column(db.Integer, db.ForeignKey('group.id'))
  user_matched = db.Column(db.Boolean, default=False)
  group_matched = db.Column()
