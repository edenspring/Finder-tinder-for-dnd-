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
