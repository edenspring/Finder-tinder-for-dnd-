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
                'user_id':user_id,
                'group_id':group_id,
                'group_matched':True,}
            )
            db.session.add(new_match)
            db.session.commit()
    print(match, 'yyyyyyyyyyyyy')
    return "no"
