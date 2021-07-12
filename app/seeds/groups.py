from app.models import db, Group
from faker import Faker
from random import randint

faker = Faker()


def seed_groups():
    test_group = Group(user_id=2,
                       name='5e Funsies',
                       game_rules='D&D 5e',
                       recruiting=True,
                       group_photo='https://i.imgur.com/BsBQOgh.jpg',
                       about='A homebrew campaign that\'s been running for the past two years. Looking for new friends to adventure with! Party could use a tank or healer but all are welcome')

    demo_group = Group(user_id=1,
                       name='Demonstration group',
                       game_rules='Pathfinder 2nd Edition',
                       recruiting=True,
                       group_photo='https://i.imgur.com/uQBQkYD.jpg',
                       about='This is a group created for testing purposes, all users are seeded as having matched to this group already, any right swipes will match with that user, any left swipes will nullify the record, setting both matches to false in the database')

    db.session.add(demo_group)
    db.session.add(test_group)

    for i in range(len(user_images)):
        rando = randint(0, (len(group_images)-1))
        temp = Group(user_id=i+2, name=faker.bs(), game_rules=faker.text(max_nb_chars=20), recruiting=True,
                     group_photo=group_images[rando], about=faker.text(max_nb_chars=250))
        db.session.add(temp)
    db.session.commit()


def undo_groups():
    db.session.execute('TRUNCATE groups RESTART IDENTITY CASCADE;')
    db.session.commit()


group_images = ['https://i.imgur.com/wRfBm59.jpg',
                'https://i.imgur.com/8TBhEAS.jpg',
                'https://i.imgur.com/GtQVMMA.jpg',
                'https://i.imgur.com/2gNbWWT.jpg',
                'https://i.imgur.com/fYRDzRg.jpg',
                'https://i.imgur.com/GSHPFPz.jpg',
                'https://i.imgur.com/uQBQkYD.jpg',
                'https://i.imgur.com/6HVPnkp.jpg',
                'https://i.imgur.com/e4sAYQm.jpg',
                'https://i.imgur.com/LKP5Y4B.jpg',
                ]

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
            #    23
