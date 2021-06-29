from .db import db

class Character(db.Model):

  __tablename__="characters"

  id= db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  name = db.Column(db.String(75), nullable=False)
  character_class = db.Column(db.String(30))
  character_bio = db.Column(db.Text)
  character_sheet = db.string(250)

  user = db.relationship('User', back_ref='characters')
