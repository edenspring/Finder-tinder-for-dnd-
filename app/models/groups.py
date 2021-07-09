from .db import db


class Group(db.Model):
    __tablename__ = "groups"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(75), nullable=False)
    game_rules = db.Column(db.String(50))
    recruiting = db.Column(db.Boolean, default=True)
    group_photo = db.Column(db.String(250))
    about = db.Column(db.Text)

    matches = db.relationship('Match', cascade='all,delete', )
    chat_rel = db.relationship('Chat', cascade='all,delete')



    tags = db.relationship(
        'Tag',
        primaryjoin='and_(Tag.taggable_type=="group", foreign(Tag.taggable_id)==Group.id)',
        lazy='select',
        cascade='all, delete',
    )

    def to_dict(self):
        tags_dict = {tag.id: {'id':tag.id, 'tag':tag.tag} for tag in self.tags}
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'game_rules': self.game_rules,
            'recruiting': self.recruiting,
            'group_photo': self.group_photo,
            'about':self.about,
            'tags': tags_dict,
            'owner': self.user.group_owner(),
        }
