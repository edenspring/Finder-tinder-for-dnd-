from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Group, db
from werkzeug.security import generate_password_hash

group_routes = Blueprint('groups', __name__)

@group_routes.route('/new')
@login_required
def new_group():
  res = request.get_json()
  group = Group(**res)
  db.session.add(group)
  db.session.commit()
  return group.to_dict()

