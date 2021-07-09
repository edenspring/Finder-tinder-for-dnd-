import os

from flask_socketio import SocketIO, emit, join_room, leave_room, send


origins = []

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://actual-app-url.herokuapp.com",
        "https://actual-app-url.herokuapp.com"
    ]
else:
    origins = "*"


socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on("chat")
def handle_chat(data):
  room = data['chatId']
  emit("chat", data, room=room)

@socketio.on('join')
def on_join(data):
  username = data['username']
  room = data['chatId']
  join_room(room)
  
