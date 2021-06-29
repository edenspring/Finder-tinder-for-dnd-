from .db import db

class Message(db.Model):

  __tablename__="messages"

  id=db.Column(db.Integer, primary_key=True)
  user_id=db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  chat_id=db.Column(db.Integer, db.ForeignKey('chats.id'), nullable=False)
  content=db.Column(db.String(255), nullable=False)

  user = db.relationship('User', back_ref='messages')
  chat = db.relationship('Chat', back_ref='chats')
