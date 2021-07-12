from faker import Faker
from app.models import db, Match

faker = Faker()

def seed_matches():
  for  i in range (2, 25):
    temp = Match(**{'user_id': i, 'group_id': 1, 'user_matched':True})
    db.session.add(temp)

  for i in range(2, 25):
    temp = Match(**{'user_id': 1, 'group_id': i, 'group_matched':True})
    db.session.add(temp)

  db.session.commit()

def undo_matches():
  db.session.execute('TRUNCATE matches RESTART IDENTITY CASCADE;')
  db.session.commit()
