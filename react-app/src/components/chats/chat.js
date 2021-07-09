import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router';
import React, {useEffect, useState, useRef} from 'react';
import {io} from 'socket.io-client';


let socket;

function Chat({props}){
  console.log(props)
  const user = useSelector((state)=>state.session.user)
  const {chat} = props;
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([])

  useEffect(()=>{
    (async () => {
      const res = await fetch(`/api/chats/${chat.id}/messages`);
      const data = await res.json();
      for (const key in data){
        setMessages((messages)=> [...messages, data[key]])
      }
    })()

    socket = io();
    socket.emit('join', {chatId: chat.id, username:user.username})

    socket.on('chat', (chat)=>{
      setMessages((messages) => [...messages, chat])
    })
    return () => {
        socket.disconnect();
        setMessages([])
      }
  },[chat])
  return (
    <>
    <div className = "chat_body__div" id='chat_window'>
      {messages.length? (<div className='messages_container__div'>
        {messages.map((message, index) => (
          <div className='message_content__div' key={`message.no${message.id}`}>
            {JSON.stringify(message)}
          </div>
        ))}
      </div>):'Connect to your new match! Say something....'}
    </div>
    </>
  )

}

export default Chat
