from .db import db


class Character(db.Model):

    __tablename__ = "characters"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(75), nullable=False)
    character_class = db.Column(db.String(30))
    character_bio = db.Column(db.Text)
    character_sheet = db.String(250)

    user = db.relationship('User', backref='characters')

    def to_dict(self): {
        'id': self.id,
        'user_id': self.user_id,
        'name': self.name,
        'character_class': self.character_class,
        'character_bio': self.character_bio,
        'character_sheet': self.character_sheet,
    }
