import os

from datetime import date, datetime
from flask_socketio import SocketIO, emit, join_room, leave_room, send
from .models import db, Message

origins = []

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "https://finder-tinder-for-dnd.herokuapp.com/",
        "http://finder-tinder-for-dnd.herokuapp.com/"
    ]
else:
    origins = "*"


socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on("chat")
def handle_chat(data):
    print('```data```', data)
    message = Message(**{
        'user_id': data['user_id'],
        'chat_id': data['chat_id'],
        'content': data['content'],
    })
    db.session.add(message)
    db.session.commit()
    print(message.to_dict())
    chat_data = {
        'user': data['username'],
        'content': data['content'],
        'created_at': str(datetime.now()),
    }
    room = str(data['chat_id'])
    emit("chat", chat_data, room=room)


@socketio.on('join')
def on_join(data):
    username = data['username']
    room = str(data['chatId'])
    print('room', room)
    join_room(room)
