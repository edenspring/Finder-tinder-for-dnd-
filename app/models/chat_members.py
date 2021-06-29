from .db import db

class ChatMember(db.Model):

  __tablename__="chat_members"

  id=db.Column(db.Integer, primary_key=True)
  user_id=db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  chat_id=db.Column(db.Integer, db.ForeignKey('chats.id'), nullable=False)

  chat = db.relationship('Chat', back_ref='members_list')
