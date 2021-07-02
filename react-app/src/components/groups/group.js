import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import * as groupActions from '../../store/group';
import * as tagActions from '../../store/tag';

const Group = () => {
  const group = useSelector((state) => ({...state.group}));
  const user = useSelector((state) => state.session.user);
  const [groupName, setGroupName] = useState('');
  const [rules, setRules] = useState('');
  const [recruiting, setRecruiting] = useState(false);
  const [photo, setGroupPhoto] = useState('');

  const [editName, setEditName] = useState(false);
  const [editRules, setEditRules] = useState(false);
  const [editRecruiting, setEditRecruiting] = useState(false);
  const [editTags, setEditTags] = useState(false);

  const [newName, setNewName] = useState(group.name);
  const [newRules, setNewRules] = useState(group.game_rules);
  const [newRecruiting, setNewRecruiting] = useState(group.recruiting);
  const [newTag, setNewTag] = useState('');
  const [newPhoto, setNewPhoto] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  function updateGroup() {
    return;
  }

  function removeGroupTag(id, e) {
    // setEditTags(!editTags)
    dispatch(tagActions.removeTag(id, 'group'));
    // e.closest('li').remove();
    // e.remove();
  }

  function createGroupTag(e) {
    e.preventDefault();
    const data = {
      taggable_id: group.id,
      taggable_type: 'group',
      tag: newTag,
    };
    dispatch(tagActions.createTag(data));
  }

  return (
    <>
      {group.name && (
        <>
          <div className="usergroup_container__div">
            <div className="group_name__div">Group Name: {group.name}</div>
            <button onClick={() => setEditName(!editName)}>Edit name?</button>
            {editName && (
              <>
                <form onSubmit={updateGroup}>
                  <input
                    onChange={(e) => setNewName(e.target.value)}
                    defaultValue={group.name}
                  />
                  <button type="submit">Update Group Name</button>
                </form>
              </>
            )}
            <div className="group_rules__div">Rulest: {group.game_rules}</div>
            <button onClick={() => setEditRules(!editRules)}>
              Edit rules?
            </button>
            {editRules && (
              <>
                <form onSubmit={updateGroup}>
                  <input
                    onChange={(e) => setNewRules(e.target.value)}
                    defaultValue={group.game_rules}
                  />
                  <button type="submit">Update Ruleset</button>
                </form>
              </>
            )}
            <div className="group_recruiting__div">
              Currently Recruiting? : {group.recruiting ? 'Yes' : 'No'}
            </div>
            <button onClick={() => setEditRecruiting(!editRecruiting)}>
              Edit
            </button>
            {editRecruiting && (
              <>
                <form onSubmit={updateGroup}>
                  <input
                    type="checkbox"
                    checked={group.recruiting}
                    onChange={(e) => setNewRecruiting(!newRecruiting)}
                  />
                  <button type="submit">Update Recruiting Status</button>
                </form>
              </>
            )}
          </div>
          {editTags && (
            <div className="userpage_edittags__div">
              <form onSubmit={createGroupTag}>
                <input
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Enter new tag..."
                />
                <button type="submit">Add new tag</button>
              </form>
            </div>
          )}
          <div className="group_tags__div">
            Tags:
            {group.tags && (
              <>
                <ul>
                  {Object.values(group.tags).map((tag, i) => (
                    <li key={`group_tag_key_${i}`}>
                      {tag.tag}{' '}
                      {editTags && (
                        <button
                          onClick={(e) => removeGroupTag(tag.id, e.target)}
                        >
                          X
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <button onClick={() => setEditTags(!editTags)}>Edit tags</button>
          </div>
        </>
      )}
    </>
  );
};

export default Group;
