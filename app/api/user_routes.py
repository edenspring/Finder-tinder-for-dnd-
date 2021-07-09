from flask import Blueprint, jsonify, request
from flask.helpers import url_for
from flask_login import login_required, current_user
from app.models import User, db
from werkzeug.security import generate_password_hash

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/matchable')
@login_required
def matchable_users():
    users = db.session.query(User).filter(User.looking_for_group == True).all()
    print('11111111111', users)
    ret_users = {}
    for user in users:
        id = user.id
        ret_users[id] = user.to_dict()
    print('222222222222', ret_users)
    return ret_users


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_user(id):
    user_id = int(current_user.id)
    if (user_id != id):
        return 'Not allowed'
    res = request.get_json()

    user = db.session.query(User).get(id)

    if(user.username != res['username']):
        user.username = res['username']
    if(user.user_photo != res['photo']):
        user.user_photo = res['photo']
    if(user.looking_for_group != res['looking_for_group']):
        user.looking_for_group = res['looking_for_group']

    db.session.add(user)
    db.session.commit()
    return user.to_dict()


@user_routes.route('/<int:id>/password')
@login_required
def update_password(id):
    user_id = int(current_user.id)
    if user_id != id:
        return 'Not allowed'
    res = request.get_json()
    user = db.session.query(User).get(id)
    if(res['password'] != res['repeatPassword'] and res['password'] != ''):
        return {'errors': ["Password Does Not Match"]}
    else:
        if(user.hashed_password != generate_password_hash(res['password'])):
            user.hashed_password = generate_password_hash(res['password'])
        if(user.username != res['username']):
            user.username = res['username']
        if(user.user_photo != res['photo']):
            user.user_photo = res['photo']
        if(user.looking_for_group != res['looking_for_group']):
            user.looking_for_group = res['looking_for_group']
        db.session.add(user)
        db.session.commit()
        return user.to_dict()
