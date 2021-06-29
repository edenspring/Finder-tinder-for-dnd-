from .db import db

class Chat(db.Model):

  __tablename__="chats"

  id = db.Column(db.Integer, primary_key=True)
  group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=False)

  group = db.relationship('Groups', back_ref='chats')
