from .db import db

class GroupMember(db.Model):

  __tablename__="group_members"

  id= db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  character_id = db.Column(db.Integer, db.ForeignKney('characters.id'))

  user = db.relationship('User', back_ref='users')
