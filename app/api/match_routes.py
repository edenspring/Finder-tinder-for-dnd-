from app.api.user_routes import user
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Match, db
from werkzeug.security import generate_password_hash

match_routes = Blueprint('matches', __name__)


@match_routes.route('/', methods=["POST"])
@login_required
def get_or_create_usermatch():
    res = request.get_json()
    group_id = res['group_id']
    user_id = res['user_id']
    context = res['context']
    match = db.session.query(Match).filter(
        Match.user_id == user_id and Match.group_id == group_id).first()
    if match is None:
        if context == 'group':
            new_match = Match(**{
                'user_id': user_id,
                'group_id': group_id,
                'group_matched': True, }
            )
            db.session.add(new_match)
            db.session.commit()
            return new_match
        elif context == 'user':
            new_match = Match(**{
                'user_id': user_id,
                'group_id': group_id,
                'user_matched': True, }
            )
            db.session.add(new_match)
            db.session.commit()
            return new_match
    else:
      if context == 'group':
        match.group_matched = True
      elif context == 'user':
        match.user_matched = True
      db.session.add(match)
      db.session.commit()
      return match.to_dict()

@match_routes.route('/users/<int:id>', methods=["GET"])
@login_required
def get_user_matches(id):
    matches = db.session.query(Match).filter(Match.user_id == id and Match.user_matched is True).all()
    return 
