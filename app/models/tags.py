from .db import db
from sqlalchemy.dialects.postgresql import ENUM


class Tag(db.Model):

    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    taggable_id = db.Column(db.Integer, nullable=False)
    taggable_type = db.Column(
        ENUM('user', 'group', name='taggable_types'), nullable=False)
    tag = db.Column(db.String(25), nullable=False)

    user = db.relationship(
        'User',
        primaryjoin='and_(Tag.taggable_type=="user", foreign(Tag.taggable_id)==User.id)',
        uselist=False,
    )

    group = db.relationship(
        'Group',
        primaryjoin='and_(Tag.taggable_type=="group", foreign(Tag.taggable_id)==Group.id)',
        uselist=False,
    )

    def tagged(self):
      if self.taggable_type == 'user':
          return self.user.to_dict()
      elif self.taggable_type == 'group':
          return self.group.to_dict()
      else:
          return "Invalid taggable type"

    def parent_id(self):
        if self.taggable_type == 'user':
            return self.user.id
        elif self.taggable_type == 'group':
            return self.group.user_id
        else: return 'indeterminate'
    def to_dict(self):
        return{
            'id': self.id,
            'taggable_id': self.taggable_id,
            'taggable_type': self.taggable_type,
            'tag': self.tag,
            # 'tagged_entity': self.tagged(),
            'parent_id': self.parent_id()
        }
