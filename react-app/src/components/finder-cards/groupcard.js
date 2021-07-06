import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as matchActions from '../../store/matches';
import '../css/usercard.css';

import TinderCard from 'react-tinder-card';

const GroupCard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => ({...state.session.user}));
  const groups = useSelector((state) => state.matches.groups);

  useEffect(() => {
    dispatch(matchActions.getMatchableGroups());
  }, []);

  const onSwipe = (direction, id) => {
    if (direction == 'right') {
      const data = {user_id: id, group_id: id, context: 'user'};
      dispatch(matchActions.makeMatch(data));
    }
    if (direction == 'left') {
      const data = {user_id: user.id, group_id: id, context: 'user'};
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
      {groups &&
        groups.map((group, index) => (
          <TinderCard
            className="potential_match__card"
            key={group.name}
            onSwipe={(direction) => onSwipe(direction, group.id)}
            onCardLeftScreen={() => onCardLeftScreen(group.name)}
          >
            <div className="tindercard_content__div">
              <div
                className="tindercard_image__div"
                style={{backgroundImage: `url(${group.photo})`}}
              ></div>
              <div className="tindercard_groupname__div">{group.name}</div>
              <div className="tindercard_grouprules__div">{group.rules}</div>
              {group.tags.length &&
                group.tags.map((tag, index) => (
                  <div key={tag.tag}>{tag.tag}</div>
                ))}
            </div>
          </TinderCard>
        ))}
    </div>
  );
};

export default GroupCard;
