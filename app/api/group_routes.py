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
    group = db.session.query(Group).get(id)

    if(group.name != res['name']):
        group.name = res['name']
    if(group.group_photo != res['photo']):
        group.group_photo = res['photo']
    if(group.recruiting != res['recruiting']):
       group.recruiting = res['recruiting']
    if (group.about != res['about']):
        group.about = res['about']
    if (group.game_rules != res['game_rules']):
        group.game_rules = res['game_rules']
    db.session.add(group)
    db.session.commit()
    return group.to_dict()

@group_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_group(id):
    user_id = int(current_user.id)
    group_for_deletion = db.session.query(Group).get(id)
    if group_for_deletion.user_id != user_id:
        return "Not allowed"
    elif group_for_deletion.user_id == user_id:
        db.session.delete(group_for_deletion)
        db.session.commit()
        return "deleted"
    else:
        return "unknown issue"

@group_routes.route('/matchable')
@login_required
def matchable_groups():
    groups = db.session.query(Group).filter(Group.recruiting == True).all()
    ret_groups = {}
    for group in groups:
        id = group.id
        ret_groups[id] = group.to_dict()
    print(ret_groups,'222222')
    return ret_groups
