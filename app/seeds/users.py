from werkzeug.security import generate_password_hash
from app.models import db, User
from faker import Faker

# Adds a demo user, you can add other users here if you want

user_images = ['https://i.imgur.com/pUFovgC.jpg',
'https://i.imgur.com/6lK2jQV.jpg',
'https://i.imgur.com/K69jKSJ.jpg',
'https://i.imgur.com/BtfO0U8.jpg',
'https://i.imgur.com/iTHEa8B.jpg',
'https://i.imgur.com/5ZKrrJL.jpg',
'https://i.imgur.com/216ruRN.jpg',
'https://i.imgur.com/WpPihtV.jpg',
'https://i.imgur.com/823VquT.jpg',
'https://i.imgur.com/caeh67P.jpg',
'https://i.imgur.com/cAW15DY.jpg',
'https://i.imgur.com/3ZzsL0Q.jpg',
'https://i.imgur.com/oKDKVOY.jpg',
'https://i.imgur.com/LKP5Y4B.jpg',
'https://i.imgur.com/LDonSW9.jpg',
'https://i.imgur.com/x8p1fB8.jpg',
'https://i.imgur.com/t1CWnel.jpg',
'https://i.imgur.com/CMkwWMl.jpg',
'https://i.imgur.com/xboTY5Z.jpg',
'https://i.imgur.com/DNGIoCK.jpg',
'https://i.imgur.com/6HVPnkp.jpg',
'https://i.imgur.com/LgLIqFu.jpg',
'https://i.imgur.com/VfepWRg.png',
]


faker = Faker()

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

    for link in user_images:
        temp = User(username=faker.user_name(), email=faker.email(), hashed_password=hash_password, about=faker.text(), looking_for_group=True, user_photo=link)
        db.session.add(temp)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
