from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    user_photo = db.Column(db.String(200))
    about = db.Column(db.Text)
    looking_for_group = db.Column(db.Boolean, default=True)

    tags = db.relationship(
        'Tag',
        primaryjoin='and_(Tag.taggable_type=="user", foreign(Tag.taggable_id)==User.id)',
        lazy='select',
    )

    group = db.relationship('Group', backref='user', uselist=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def group_dict(self):
        if self.group is not None:
            return self.group.to_dict()

    def to_dict(self):
        tags_dict = {tag.id: {'id': tag.id, 'tag': tag.tag}
                     for tag in self.tags}
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "photo": self.user_photo,
            "about": self.about,
            "looking_for_group": self.looking_for_group,
            "tags": tags_dict,
            "group": self.group_dict()

        }

    def group_owner(self):
        tags_dict = {tag.id: {'id': tag.id, 'tag': tag.tag}
                     for tag in self.tags}
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "photo": self.user_photo,
            "about": self.about,
            "tags": tags_dict,
        }
