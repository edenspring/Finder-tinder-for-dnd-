from .db import db
from sqlalchemy.dialects.postgresql import ENUM


class Tag(db.Model):

  __tablename__='tags'

  id=db.Column(db.Integer, primary_key=True)
  taggable_id=db.Column(db.Integer, nullable=False)
  taggable_type=db.Column(ENUM('user', 'group', name='taggable_types'), nullable=False)

  def to_dict(self):
    return{
      'id': self.id,
      'taggable_id': self.taggable_id,
      'taggable_type': self.taggable_type,
    }
