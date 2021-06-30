from .db import db

class GroupMember(db.Model):

  __tablename__="group_members"

  id= db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  character_id = db.Column(db.Integer, db.ForeignKney('characters.id'))

  user = db.relationship('User', back_ref='group_joined')
  character = db.relationship('Character', back_ref="member_of_group")

  def to_dict(self):
    return {
      'id': self.id,
      'user_id':self.user_id,
      'character_id':self.character,
    }
