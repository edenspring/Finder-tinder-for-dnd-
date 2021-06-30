from app.models import db, Group

def seed_groups():
  test_group = Group(user_id=2,
                      name='5e Funsies',
                      game_rules='D&D 5e',
                      recruiting=True)

  db.session.add(test_group)

  db.session.commit()


def undo_groups():
  db.session.execute('TRUNCATE groups RESTART IDENTITY CASCADE;')
  db.session.commit()
