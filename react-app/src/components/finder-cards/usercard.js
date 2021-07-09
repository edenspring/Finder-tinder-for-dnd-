import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../store/user';
import * as tagActions from '../../store/tag';
import * as matchActions from '../../store/matches';
import '../css/usercard.css';

import TinderCard from 'react-tinder-card';

// ...

const UserCard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => ({...state.session.user}));
  const users = useSelector((state) => state.matches.users);
  const [currentCard, setCurrentCard] = useState('');

  const groupId = 1;

  let index = 1;

  useEffect(() => {
    console.log('beepboop');
    dispatch(matchActions.getMatchableUsers());
  }, [dispatch]);

  const onSwipe = (direction, id) => {
    console.log('You swiped: ' + direction);
    if (direction == 'right') {
      const data = {user_id: id, group_id: groupId, context: 'group'};
      dispatch(matchActions.makeMatch(data));
    }
    if (direction == 'left'){
      const data = {user_id: id, group_id: groupId, context: 'group'};
      dispatch(matchActions.unMatch(data));
    }
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen');
  };

  return (
    //the following code was based off of: https://github.com/3DJakob/react-tinder-card-demo/blob/master/src/examples/Advanced.js,
    //this repo is a demo for the TinderCard package
    //I chose to base my code off of this demo after attempting to get dynamic renders but struggling
    //to execute. I hope to find a way to tweak and get the code working as I intend rather than
    //cribbing execution from the demo
    <div className="matches_container__div">
      {users &&
        users.map((user, index) => (
          <TinderCard
            className="potential_match__card"
            key={user.username}
            onSwipe={(direction) => onSwipe(direction, user.id)}
            onCardLeftScreen={() => onCardLeftScreen(user.username)}
          >
            <div className="tindercard_content__div">
              <div
                className="tindercard_image__div"
                style={{backgroundImage: `url(${user.photo})`}}
              ></div>
              <div className="tindercard_username__div">{user.username}</div>
              <div className="tindercard_aboutuser__div">{user.about}</div>
              {user.tags.length &&
                user.tags.map((tag, index) => (
                  <div key={tag.tag}>{tag.tag}</div>
                ))}
            </div>
          </TinderCard>
        ))}
    </div>
  );
};
export default UserCard;
