import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as groupActions from '../../store/group'

const Group = () => {
  const group = useSelector((state)=> ({...state.group}))
  const user = useSelector ((state) => state.session.user)
  const [groupName, setGroupName] = useState("");
  const [rules, setRules] = useState("");
  const [recruiting, setRecruiting] = useState(false)

  const dispatch = useDispatch()

  useEffect(()=>{},[])

  function createGroup(e){
    e.preventDefault();
    const data = {
      'user_id': user.id,
      'name' : groupName,
      'game_rules': rules,
      recruiting,
    }
    dispatch(groupActions.createGroup(data))
  }
  return (
    <>
    {group &&
    <>
    </> }
    {!group && (
    <form onSubmit={createGroup}>
      <div className='groupform_name__div'>
        <label>Group Name: </label>
        <input placeholder='Group Name'> </input>
      </div>
      <div className='groupform_rules__div'>
        <label>Ruleset: </label>
        <input placeholder='5e, Pathfinder2e, etc....'></input>
      </div>
      <div className='groupform_recruiting__div'>
        <label>Currently Recruiting?: </label>
        <input type='checkbox' checked={recruiting} onClick={()=>setRecruiting(!recruiting)} />
      </div>
      <submit>Create group!</submit>
    </form>)
  }
    </>
  )
}

export default Group;
