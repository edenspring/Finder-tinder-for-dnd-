from app.api.user_routes import user
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Match, db, Chat, ChatMember
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
        Match.user_id == user_id, Match.group_id == group_id).first()
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
            return new_match.to_dict()
    else:
        print(match.to_dict())
        if context == 'group':
            match.group_matched = True
        elif context == 'user':
            match.user_matched = True
        if match.user_matched == True and match.group_matched == True:
            chat = db.session.query(Chat).filter(
                Chat.group_id == group_id, Chat.user_id == user_id).first()
            if chat is None:
                chat = Chat(**{
                    'user_id': user_id,
                    'group_id': group_id,
                })
                db.session.add(chat)
        db.session.add(match)
        db.session.commit()
        return match.to_dict()


@match_routes.route('/unmatch', methods=["POST"])
@login_required
def unmatch():
    print('-=-=-=-=-=-=-MADE IT IN=-=-=-=-=-=-=-=-')
    res = request.get_json()
    group_id = res['group_id']
    user_id = res['user_id']
    context = res['context']
    match = db.session.query(Match).filter(
        Match.user_id == user_id, Match.group_id == group_id).first()
    if match is None:
        print('``````nomatchfound````````')
        return("No match created")
    else:
        print('!!!!!!!!match found!!!!!!!!')
        print(match.to_dict())
        # if context == 'group':
        #     match.group_matched = False
        # elif context == 'user':
        #     match.user_matched = False

        # db.session.add(match)
        if(match.group_matched == True and match.user_matched == True):
            chat = db.session.query(Chat).filter(
                Chat.group_id == group_id, Chat.user_id == user_id).first()
            db.session.delete(chat)
            db.session.commit()
        db.session.delete(match)
        db.session.commit()
        return 'match deleted'


@match_routes.route('/users/<int:id>', methods=["GET"])
@login_required
def get_user_matches(id):
    matches = db.session.query(Match).filter(
        Match.user_id == id and Match.user_matched is True).all()
    ret_dict = {match.id: match.to_dict() for match in matches}
    print(ret_dict)
    return ret_dict


@match_routes.route('/groups/<int:id>', methods=["GET"])
@login_required
def get_group_matches(id):
    matches = db.session.query(Match).filter(
        Match.group_id == id and Match.group_matched is True).all()
    return {match.id: match.to_dict() for match in matches}
