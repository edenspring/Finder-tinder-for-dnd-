from flask import Blueprint, jsonify, session, request
from app.models import Tag, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

tag_routes = Blueprint('tag', __name__)

@tag_routes.route('/new', methods=['POST'])
@login_required
def add_tag():
  res = request.get_json()
  print('++++', res)
  new_tag = Tag(**res)
  db.session.add(new_tag)
  db.session.commit()
  return new_tag.to_dict()



@tag_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_tag(id):
  user_id = int(current_user.id)
  deletion_tag = Tag.query.get(id)
  print(user_id)
  print(deletion_tag.parent_id())
  if (user_id != deletion_tag.parent_id()):
    print('NOT GON DELETE')
    return "Not allowed"
  elif (deletion_tag.parent_id() == user_id):
    print ('GON DELETE')
    db.session.delete(deletion_tag)
    db.session.commit()
    return "deleted"
  else:
    print('AM CONFUSE')
    return "unknown issue"

@tag_routes.route('/<int:id>', methods=['GET'])
def get_tag(id):
  tag = Tag.query.get(id)
  return tag.to_dict()
