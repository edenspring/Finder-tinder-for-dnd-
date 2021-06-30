from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db
from werkzeug.security import generate_password_hash

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# @user_routes.route('/<int:id>', methods=['PUT'])
# @login_required
# def edit_user(id):
#     user_id = int(current_user.id)
#     res = request.get_json()
#     user = db.session.query(User).get(user_id)
#     if(res['password'] != res['repeatPassword']):
#         return {'errors':["Password Does Not Match"]}
#     else:
#         if(user.username != res['username']):
#             user.username = res['username']
#         elif(user.user_photo != res['photo']):
#             user.user_photo = res['photo']
#         elif(user.hashed_password!= generate_password_hash(res['password'])):
#             user.hashed_password = generate_password_hash(res['password'])
#         elif(user.looking_for_group !=res['looking_for_group']):
#             user.looking_for_group = res['looking_for_group']
#         db.session.add(user)
#         db.session.commit()
#         return user.to_dict()
