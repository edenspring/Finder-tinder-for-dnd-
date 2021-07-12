import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as chatActions from "../../store/chat";
import Chat from "./chat";

function ChatsList() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const group = useSelector((state) => state.group);
  const chatsWithGroups = useSelector((state) => state.chat.user_chats);
  const chatsWithPlayers = useSelector((state) => state.chat.group_chats);
  const [activeChatClass, setActiveChatClass] = useState("none");
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    dispatch(chatActions.getUserChats(user.id));
    dispatch(chatActions.getGroupChats(group.id));
  }, []);

  function makeActive(e, chat) {
    setActiveChatClass("active_chat__div");
    const currentActive = document.querySelectorAll(".active");
    currentActive.forEach((e) => e.classList.remove("active"));
    console.log(e);
    e.classList.add("active");
    setActiveChat(
      <>
        <span>
          {" "}
          {determineChatTitle(chat)} <Chat props={{ chat }} />{" "}
        </span>
      </>
    );
  }

  function determineChatTitle(chat) {
    return chat.matched_group_info.group_name === group.name
      ? chat.matched_user_info.user_name
      : chat.matched_group_info.group_name;
  }

  return (
    <div className="chats_container__div">
      <div className="chats_with_groups__div">
        Chats with groups you've matched as a player:
        {Object.values(chatsWithGroups).length ? (
          Object.values(chatsWithGroups).map((chat, index) => (
            <div className="chat_link__div" key={`chat_${chat.id}`}>
              <div
                className="chat_link_info__div"
                onClick={(e) => makeActive(e.target, chat)}
              >
                Chat with {chat.matched_group_info.group_name}
              </div>
            </div>
          ))
        ) : (
          <div>No full matches yet, keep swiping!</div>
        )}
      </div>
      <div className="chats_with_users__div">
        Chats with players your group has matched with:
        {Object.values(chatsWithPlayers).length ? (
          Object.values(chatsWithPlayers).map((chat, index) => (
            <div className="chat_link__div" key={`chat_${chat.id}`}>
              <div
                className="chat_link_info__div"
                onClick={(e) => makeActive(e.target, chat)}
              >
                Chat with {chat.matched_user_info.user_name}
              </div>
            </div>
          ))
        ) : (
          <div>No full matches yet, keep swiping!</div>
        )}
      </div>
      <div className={activeChatClass}>{activeChat}</div>
    </div>
  );
}

export default ChatsList;
