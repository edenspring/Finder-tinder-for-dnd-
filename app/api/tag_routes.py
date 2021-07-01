from flask import Blueprint, jsonify, session, request
from app.models import Tag, db
from flask_login import current_user, login_required

tag_routes = Blueprint('tag', __name__)

@tag_routes.route('/new', methods=['POST'])
@login_required
def add_tag():
  res = request.get_json()
  new_tag = Tag(**res)
  db.session.add(new_tag)
  db.session.commit()
  return new_tag.to_dict()



@tag_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_tag(id):
  user_id = int(current_user.id)
  deletion_tag = Tag.query.get(id)
  if (user_id != deletion_tag.parent_id()):
    return "Not allowed"
  elif (deletion_tag.parent_id() == user_id):
    db.session.delete(deletion_tag)
    db.session.commit()
    return "deleted"
  else:
    return "unknown issue"

@tag_routes.route('/<int:id>', methods=['GET'])
def get_tag(id):
  tag = Tag.query.get(id)
  return tag.to_dict()
