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

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "photo": self.user_photo,
            "about": self.about,
            "looking_for_group": self.looking_for_group,
            "tags": [tag.tag for tag in self.tags]

        }
