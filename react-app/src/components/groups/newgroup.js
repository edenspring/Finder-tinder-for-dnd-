import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

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
    history.push('/group')
  }

  const user = useSelector((state) => state.session.user);
  const [groupName, setGroupName] = useState('');
  const [rules, setRules] = useState('');
  const [recruiting, setRecruiting] = useState(false);
  const [photo, setGroupPhoto] = useState('');
  const [about, setGroupAbout] = useState('')

  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className='newgroup_form__div'>
      <form onSubmit={createGroup}>
        <div className="groupform_name__div form__field">
          <label>Group Name: </label>
          <input
          className='form__input'
            placeholder="Group Name"
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <div className="groupform_rules__div form__field">
          <label>Ruleset: </label>
          <input
          className='form__input'
            placeholder="5e, Pathfinder2e, etc...."
            onChange={(e) => setRules(e.target.value)}
          />
        </div>
        <div className="groupform_about__div form__field">
          <label>About our group:</label>
          <textarea
          className='form__input'
          placeholder="A little about the group, what you're looking for in new players or maybe the atmosphere you aim for"
          onChange={(e)=>setGroupAbout(e.target.value)}></textarea>
        </div>
        <div className="groupform_photo__div form__field">
          <label>Photo link:</label>
          <input
          className='form__input'
            placeholder="Your link here..."
            onChange={(e) => setGroupPhoto(e.target.value)}
          />
        </div>
        <div className="groupform_recruiting__div form__field">
          <label>Currently Recruiting?: </label>
          <input
            type="checkbox"
            checked={recruiting}
            onClick={() => setRecruiting(!recruiting)}
          />
        </div>
        <button type='submit'>Create group!</button>
      </form>
    </div>
  );
};

export default NewGroup;
