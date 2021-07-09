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
      console.log('peepee', data)
    })()

    socket = io();
    socket.emit('join', {chatId: chat.id, username:user.username})

    socket.on('chat', (chat)=>{
      setMessages((messages) => [...messages, chat])
    })
  },[])
  return (
    null
  )

}

export default Chat
