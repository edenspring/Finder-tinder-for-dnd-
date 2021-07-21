from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, TextField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):

    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("User is already registered.")


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), user_exists, Email()])
    password = StringField('password', validators=[DataRequired()])
    user_photo = StringField('user_photo')
    about = TextField('About', validators=[DataRequired()])
    looking_for_group = BooleanField('looking_for_group',)
