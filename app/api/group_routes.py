from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Group, db
from werkzeug.security import generate_password_hash

group_routes = Blueprint('groups', __name__)


@group_routes.route('/new', methods=['POST'])
@login_required
def new_group():
    res = request.get_json()
    group = Group(**res)
    db.session.add(group)
    db.session.commit()
    return group.to_dict()


@group_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_group(id):
    user_id = int(current_user.id)
    res = request.get_json()
    if (user_id != res['user_id']):
        return 'Not allowed'
    print('>>>>', res['looking_for_group'])
    group = db.session.query(Group).get(id)

    if(group.name != res['name']):
        group.name = res['name']
    if(group.group_photo != res['photo']):
        group.group_photo = res['photo']
    if(user.hashed_password != generate_password_hash(res['password'])):
        user.hashed_password = generate_password_hash(res['password'])
    if(user.looking_for_group != res['looking_for_group']):
        print('!!!!!penis!!!!!', user.looking_for_group)

        user.looking_for_group = res['looking_for_group']
        print(user.looking_for_group)
    db.session.add(user)
    db.session.commit()
    return user.to_dict()
