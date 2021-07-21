import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as matchActions from "../../store/matches";
import "../css/usercard.css";

import TinderCard from "react-tinder-card";

const GroupCard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => ({ ...state.session.user }));
  const groups = useSelector((state) => state.matches.groups);
  const matchesFull = useSelector(
    (state) => state.matches.groupsMatchedtoUser.full
  );
  const matchesPartial = useSelector(
    (state) => state.matches.groupsMatchedtoUser.partial
  );
  const partialIds = [];
  const fullIds = [];

  if (matchesPartial) {
    for (const key in matchesPartial) {
      partialIds.push(matchesPartial[key].group_id);
    }
  }

  if (matchesFull) {
    for (const key in matchesFull) {
      fullIds.push(matchesFull[key].group_id);
    }
  }
  useEffect(() => {
    dispatch(matchActions.getMatchableGroups()).then(() =>
      dispatch(matchActions.getMatchedGroups(user.id))
    );
  }, [dispatch]);

  const onSwipe = (direction, id) => {
    if (direction == "right") {
      const data = { user_id: user.id, group_id: id, context: "user" };

      dispatch(matchActions.makeMatch(data));
    }
    if (direction == "left") {
      const data = { user_id: user.id, group_id: id, context: "user" };
      dispatch(matchActions.unMatch(data));
    }
  };

  const onCardLeftScreen = (myIdentifier) => {

  };

  function determineMatchStatus(group) {
    if (partialIds.includes(group.id)) {
      return "You chose to match with this group, swipe left to unmatch";
    } else if (fullIds.includes(group.id)) {
      return "Both you and this group have matched! Go to your chats page to get to know each other";
    } else {
      return "";
    }
  }


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
            <div className="tindercard_matchstatus__div">
              {determineMatchStatus(group)}
            </div>
            <div className="tinderCard_content__div">
              <div
                className="tindercard_image__div"
                style={{ backgroundImage: `url(${group.group_photo})` }}
              ></div>
              <div className="tinderCard_info__div">
                <div className="tinderCard_title">Group Name:</div>
                <div className="tinderCard_content">{group.name}</div>
                <div className="tinderCard_title">Group Rules:</div>
                <div className="tinderCard_content">
                  {group.game_rules}
                </div>
                <div className="tinderCard_title">About Group:</div>
                <div className="tinderCard_content">{group.about}</div>
                {!!Object.values(group.tags).length && (
                  <div className="tinderCard_title">
                    Tagged with:
                    <ul>
                      {Object.values(group.tags).map((tag, index) => (
                        <li key={tag.tag}>{tag.tag}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </TinderCard>
        ))}
    </div>
  );
};

export default GroupCard;
