import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import * as groupActions from '../../store/group';
import * as tagActions from '../../store/tag';

const Group = () => {
  const group = useSelector((state) => ({...state.group}));
  const user = useSelector((state) => state.session.user);

  const [editName, setEditName] = useState(false);
  const [editRules, setEditRules] = useState(false);
  const [editRecruiting, setEditRecruiting] = useState(false);
  const [editTags, setEditTags] = useState(false);
  const [editPhoto, setEditPhoto] = useState(false);
  const [editAbout, setEditAbout] = useState(false);

  const [newName, setNewName] = useState(group.name);
  const [newRules, setNewRules] = useState(group.game_rules);
  const [newRecruiting, setNewRecruiting] = useState(group.recruiting);
  const [newTag, setNewTag] = useState('');
  const [newPhoto, setNewPhoto] = useState(group.group_photo);
  const [newAbout, setNewAbout] = useState(group.about);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {}, []);

  function updateGroup(e) {
    e.preventDefault();
    const data = {
      id: group.id,
      name: newName,
      game_rules: newRules,
      recruiting: newRecruiting,
      group_photo: newPhoto,
      about: newAbout,
    };

    dispatch(groupActions(updateGroup(data)));
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

  function deleteGroup() {
    dispatch(groupActions.deleteGroup(group.id));
    history.push('/');
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
            <div className="group_photo__div">
              <img src={group.group_photo} />
              <button onClick={() => setEditPhoto(!editPhoto)}>
                Edit Photo?
              </button>
              {editPhoto && (
                <>
                  <form onSubmit={updateGroup}>
                    <input
                      onChange={(e) => setNewPhoto(e.target.value)}
                      defaultValue={newPhoto}
                    />
                    <button type="submit">Update Photo Link</button>
                  </form>
                </>
              )}
            </div>
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
              Edit Recruiting Status
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
            {editTags && (
              <div className="group_edittags__div">
                <form onSubmit={createGroupTag}>
                  <input
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Enter new tag..."
                  />
                  <button type="submit">Add new tag</button>
                </form>
              </div>
            )}
            <div className="group_about__div">About: {group.about}</div>
            <button onClick={() => setEditAbout(!editAbout)}>
              Edit About Group
            </button>
            {editAbout && (
              <>
                <form onSubmit={updateGroup}>
                  <input
                    onChange={(e) => setNewAbout(e.target.value)}
                    placeholder={newAbout}
                  />
                  <button type='submit'>Update About Group</button>
                </form>
              </>
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
            <div className="group_delete__div">
              <button
                className="group_delete__button"
                onClick={() => deleteGroup()}
              >
                Delete Group?
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Group;
