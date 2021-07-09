import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import * as chatActions from '../../store/chat';
import Chat from './chat';

function ChatsList() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const chatsWithGroups = useSelector((state) => state.chat.user_chats);
  const [activeChat, setActiveChat] = useState(null)


  useEffect(() => {
    dispatch(chatActions.getUserChats(user.id));
  }, []);

  function makeActive(e, chat) {
    const currentActive = document.querySelectorAll('.active')
    currentActive.forEach(e=>e.classList.remove('active'))
    console.log(e)
    e.classList.add('active')
    setActiveChat(<>{chat.id} <Chat props={{chat}} /></>)
  }

  return (
    <div className="chats_container__div">
      <div className="chats_with_groups__div">
        Chats with groups you've matched as a player:
        {chatsWithGroups &&
          Object.values(chatsWithGroups).map((chat, index) => (
            <div className="chat_link__div" key={`chat_${chat.id}`}>
              <div className='chat_link_info__div' onClick={(e)=>makeActive(e.target, chat)}>
                Chat with {chat.matched_group_info.group_name}
              </div>
            </div>
          ))}
      </div>
      <div className='active_chat__div'>
        {activeChat}
      </div>
    </div>
  );
}

export default ChatsList;
