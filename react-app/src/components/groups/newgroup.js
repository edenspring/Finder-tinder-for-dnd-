import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import * as groupActions from '../../store/group';
import * as tagActions from '../../store/tag';

const NewGroup = () => {
  function createGroup(e) {
    e.preventDefault();
    const data = {
      user_id: user.id,
      name: groupName,
      game_rules: rules,
      recruiting,
      group_photo: photo,
    };
    dispatch(groupActions.createGroup(data));
  }

  const user = useSelector((state) => state.session.user);
  const [groupName, setGroupName] = useState('');
  const [rules, setRules] = useState('');
  const [recruiting, setRecruiting] = useState(false);
  const [photo, setGroupPhoto] = useState('');

  const dispatch = useDispatch();

  return (
    <>
      <form onSubmit={createGroup}>
        <div className="groupform_name__div">
          <label>Group Name: </label>
          <input
            placeholder="Group Name"
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <div className="groupform_rules__div">
          <label>Ruleset: </label>
          <input
            placeholder="5e, Pathfinder2e, etc...."
            onChange={(e) => setRules(e.target.value)}
          />
        </div>
        <div className="groupform_recruiting__div">
          <label>Currently Recruiting?: </label>
          <input
            type="checkbox"
            checked={recruiting}
            onClick={() => setRecruiting(!recruiting)}
          />
        </div>
        <div className="groupform_photo__div">
          <label>Photo link:</label>
          <input
            placeholder="Your link here..."
            onChange={(e) => setGroupPhoto(e.target.value)}
          />
        </div>
        <button type='submit'>Create group!</button>
      </form>
    </>
  );
};

export default NewGroup;
