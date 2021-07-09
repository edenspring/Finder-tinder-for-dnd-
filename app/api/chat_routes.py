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
  print('++++++',chat.chat_messages())
  print('------', chat.to_dict())
  print('current_user_id : ', current_user_id)
  print('chat.user_id : ', chat.user_id)
  print('chat.group.user_id : ', chat.group.user_id)
  if (current_user_id != chat.user_id) and (current_user_id != chat.group.user_id):
  # if current_user_id != chat.user_id:
    print('----NOT ALLOWED---')
    return "Not allowed"
  print('am hurrrrrr--+++---+++')
  return chat.chat_messages()

@chat_routes.route('/groups/<int:id>')
@login_required
def get_group_chats(id):
  current_user_id = int(current_user.id)
  chats = db.session.query(Chat).filter(Chat.group_id == id).all()
  print('000011110000chats--------',chats)
  print(current_user_id)
  chatdict = chats[0].to_dict()
  print('/*/*/*/*/*/*/*/*/',)
  if (chatdict['matched_group_info']['group_user']['id'] != current_user_id):
    return 'Not Allowed'
  print('++++ I ALLOW THIS ++++')
  return {chat.id: chat.to_dict() for chat in chats}
