import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import * as chatActions from '../../store/chat';

import Chat from './chat';

function ChatsList() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const chatsWithGroups = useSelector((state) => state.chat.user_chats);

  useEffect(() => {
    dispatch(chatActions.getUserChats(user.id));
  }, []);

  return (
    <div className="chats_container__div">
      <div className="chats_with_groups__div">
        Chats with groups you've matched as a player:
        {chatsWithGroups &&
          Object.values(chatsWithGroups).map((chat, index) => (
            <div classname="chat_link__div">
              <NavLink to={`/chats/${chat.id}`} key={`chat_${chat.id}`}>
                Chat with {chat.matched_group_info.group_name}
              </NavLink>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ChatsList;
