from .db import db


class Chat(db.Model):

    __tablename__ = "chats"

    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey(
        'groups.id'), nullable=False)
    # group_id and user_id will get initial members of chat, if group.user_id
    # == chat.user_id then it is the chat for the group as a whole and
    # not between a group and a new match
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False,)

    group = db.relationship('Group', backref='chats')
    user = db.relationship('User', backref='chats')
    messages = db.relationship('Message', backref='chats', cascade='all,delete')

    def to_dict(self):
        return {
            'id': self.id,
            'matched_group_info': {
                'group_id': self.group.id,
                'group_name': self.group.name,
                'group_user': self.group.user.group_owner(),
            },
            'matched_user_info': {
                'user_id': self.user.id,
                'user_name':self.user.username,
            }
        }

    def chat_messages(self):
        return {message.id:message.to_dict() for message in self.messages}
