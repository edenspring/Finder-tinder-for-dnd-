from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Chat, db

chat_routes = Blueprint('chats', __name__)

@chat_routes.route('/users/<int:id>')
@login_required
def get_user_chats(id):
  current_user_id = int(current_user.id)
  if (id != current_user_id):
    return 'Not Allowed'
  chats = db.session.query(Chat).filter(Chat.user_id == id).all()
  return {chat.id: chat.to_dict() for chat in chats}

@chat_routes.route('/<int:id>/messages')
@login_required
def get_chat_messages(id):
  current_user_id = int(current_user.id)
  chat = db.session.query(Chat).get(id)





  if (current_user_id != chat.user_id) and (current_user_id != chat.group.user_id):
  # if current_user_id != chat.user_id:

    return "Not allowed"

  return chat.chat_messages()

@chat_routes.route('/groups/<int:id>')
@login_required
def get_group_chats(id):
  current_user_id = int(current_user.id)
  chats = db.session.query(Chat).filter(Chat.group_id == id).all()


  if len(chats) == 0:
    return "No chats found"
  chatdict = chats[0].to_dict()

  if (chatdict['matched_group_info']['group_user']['id'] != current_user_id):
    return 'Not Allowed'

  return {chat.id: chat.to_dict() for chat in chats}
