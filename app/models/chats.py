from .db import db


class Chat(db.Model):

    __tablename__ = "chats"

    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey(
        'groups.id'), nullable=False)

    group = db.relationship('Group', backref='chats')

    def to_dict(self):
        return {
            'id': self.id,
            'group_id': self.group_id,
            'members_list': self.members_list,
        }
