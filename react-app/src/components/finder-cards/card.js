import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../store/user';
import * as tagActions from '../../store/tag';
import * as matchActions from '../../store/matches';

import TinderCard from 'react-tinder-card';

// ...

const Card = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => ({...state.session.user}));
  const users = useSelector((state) => state.matches.users);
  const [currentCard, setCurrentCard] = useState('');

  let index = 1;

  useEffect(() => {
    console.log('beepboop');
    dispatch(matchActions.getMatchableUsers());
  }, [dispatch]);

  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction);
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen');
  };
  if (users) setCard(index);

  function setCard(i) {
    if (users) {
      let currentUser = users[i];
      if (index < users.length) index++;
      return (
        <>
          <TinderCard
            onSwipe={setCard(index)}
            onCardLeftScreen={() => onCardLeftScreen('fooBar')}
            preventSwipe={['right', 'left']}
          >
            <div className="card_username__div">{currentUser.username}</div>
            <div className="card_userpic__div">
              <img src={currentUser.photo} />
            </div>
            <div className="card_userabout__div">{currentUser.about}</div>
            <div></div>
          </TinderCard>
        </>
      );
    }
  }

  return (
    <>
      {' '}
      {users && (
        <TinderCard
          onSwipe={setCard(index)}
          onCardLeftScreen={() => onCardLeftScreen('fooBar')}
          preventSwipe={['right', 'left']}
        >
          <div className="card_username__div">{users[0].username}</div>
          <div className="card_userpic__div">
            <img src={users[0].photo} />
          </div>
          <div className="card_userabout__div">{users[0].about}</div>
          <div></div>
        </TinderCard>
      )}
    </>
  );
};
export default Card;
