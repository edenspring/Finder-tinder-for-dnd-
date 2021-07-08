import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as chatActions from '../../store/chat'

function ChatsList(){

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)

  useEffect(()=>{
    dispatch(chatActions.getUserChats(user.id))
  },[])

  return (
    null,
  )
}

export default ChatsList
