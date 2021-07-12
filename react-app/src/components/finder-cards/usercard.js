import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../store/user";
import * as tagActions from "../../store/tag";
import * as matchActions from "../../store/matches";
import "../css/usercard.css";

import TinderCard from "react-tinder-card";

// ...

const UserCard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => ({ ...state.session.user }));
  const group = useSelector((state) => ({ ...state.group }));
  const users = useSelector((state) => state.matches.users);
  const [currentCard, setCurrentCard] = useState("");

  // const groupId = 1;
  const matchesFull = useSelector(
    (state) => state.matches.usersMatchedtoGroup.full
  );
  const matchesPartial = useSelector(
    (state) => state.matches.usersMatchedtoGroup.partial
  );
  const partialIds = [];
  const fullIds = [];

  if (matchesPartial) {
    for (const key in matchesPartial) {
      partialIds.push(matchesPartial[key].user_id);
    }
  }

  if (matchesFull) {
    for (const key in matchesFull) {
      fullIds.push(matchesFull[key].user_id);
    }
  }
  console.log("0-0-0-0-0-", partialIds);

  useEffect(() => {
    console.log("beepboop");
    dispatch(matchActions.getMatchableUsers()).then(() =>
      dispatch(matchActions.getMatchedUsers(group.id))
    );
  }, [dispatch]);

  const onSwipe = (direction, id) => {
    console.log("You swiped: " + direction);
    if (direction == "right") {
      const data = { user_id: id, group_id: group.id, context: "group" };
      dispatch(matchActions.makeMatch(data));
    }
    if (direction == "left") {
      const data = { user_id: id, group_id: group.id, context: "group" };
      dispatch(matchActions.unMatch(data));
    }
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };

  function determineMatchStatus(user) {
    if (partialIds.includes(user.id)) {
      return "You chose to match with this user, swipe left to unmatch";
    } else if (fullIds.includes(user.id)) {
      return "Both your group and this user have matched! Go to your chats page to get to know each other";
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
      {users &&
        users.map((user, index) => (
          <TinderCard
            className="potential_match__card"
            key={user.username}
            onSwipe={(direction) => onSwipe(direction, user.id)}
            onCardLeftScreen={() => onCardLeftScreen(user.username)}
          >
            <div className="tindercard_matchstatus__div">
              {determineMatchStatus(user)}
            </div>
            <div className="tinderCard_content__div">
              <div
                className="tindercard_image__div"
                style={{ backgroundImage: `url(${user.photo})` }}
              ></div>
              <div className="tinderCard_info__div">
                <div className="tinderCard_title">User Name:</div>
                <div className="tindercard_content">{user.username}</div>
                <div className="tinderCard_title">About this user:</div>
                <div className="tindercard_content">{user.about}</div>
                {!!Object.values(user.tags).length && (
                  <div className="tinderCard_title">
                    Tagged with:
                    <ul>
                      {Object.values(user.tags).map((tag, index) => (
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
export default UserCard;
