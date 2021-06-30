from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want


def seed_users():
    hash_password = generate_password_hash('password')
    demo = User(username='Demo',
                email='demo@aa.io',
                hashed_password=hash_password,
                user_photo='https://i.imgur.com/bHTgt8p.jpeg',
                about="I'm a demo user created to demonstrate site functionality!",
                looking_for_group=True
                )

    vikingbill = User(username='vikingbill',
                      email='vikingbill@gmail.com',
                      hashed_password=hash_password,
                      user_photo='https://i.imgur.com/8xu3dja.jpeg',
                      about='Forever DM looking for new folks to adventure with! Would love a chance to be a player again <3',
                      looking_for_group=True
                      )

    db.session.add(demo)
    db.session.add(vikingbill)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
