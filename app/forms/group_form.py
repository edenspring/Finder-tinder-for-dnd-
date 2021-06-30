from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired
from app.models import Group


# def user_exists(form, field):
#     print("Checking if user exits", field.data)
#     email = field.data
#     user = User.query.filter(User.email == email).first()
#     if user:
#         raise ValidationError("User is already registered.")


class GroupCreateForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    game_rules = StringField('game_rules', validators=[DataRequired()])
    recruiting = BooleanField('recruiting',)
