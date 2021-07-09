from .db import db

class Message(db.Model):

  __tablename__="messages"

  id=db.Column(db.Integer, primary_key=True)
  user_id=db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  chat_id=db.Column(db.Integer, db.ForeignKey('chats.id'), nullable=False)
  content=db.Column(db.String(255), nullable=False)
  created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
  updated_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), server_onupdate=db.func.now())

  user = db.relationship('User', backref='messages')
  

  def to_dict(self):
    return {
      'user':self.user.username,
      'content':self.content,
      'created_at':self.created_at,
    }
