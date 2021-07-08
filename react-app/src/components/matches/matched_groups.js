import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as matchActions from '../../store/matches'

const MatchedGroups = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => ({...state.session.user}))

  useEffect(()=>{
    dispatch(matchActions.getMatchedGroups(user.id))
  },[dispatch])

  return (
    null
  )
}

export default MatchedGroups
