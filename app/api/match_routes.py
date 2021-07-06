from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Match, db
from werkzeug.security import generate_password_hash

match_routes = Blueprint('matches', __name__)

@match_routes.route('/user/<int:id>')
@login_required
def get_or_create_usermatch(id):
  res = request.get_json()
  group_id = res.group_id
  match = db.session.query(Match).filter(Match.user_id == id and Match.group_id == group_id)
