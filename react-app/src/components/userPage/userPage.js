import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../store/user';

const UserPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [editName, setEditName] = useState(false);
  const [editPhoto, setEditPhoto] = useState(false);
  const [editTags, setEditTags] = useState(false);
  const [editLFG, setEditLFG] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const [userName, setUserName] = useState(user.username);
  const [user_photo, setPhoto] = useState(user.photo);
  const [looking_for_group, setLFG] = useState(user.looking_for_group);
  const [newPassword, setNewPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [newTag, setNewTag] = useState('');

  function updateUser(e) {
    e.preventDefault();

    const data = {
      id: user.id,
      username: userName,
      photo: user_photo,
      looking_for_group: looking_for_group,
      password: newPassword,
      repeatPassword: verifyPassword,
    };

    console.log('datarrr');
    dispatch(userActions.updateUser(data));
  }

  function lfgUpdate(e) {
    console.log(e.checked);
    e.checked === 'on' ? setLFG(true) : setLFG(false);
  }

  function updatePassword(e) {
    e.preventDefault();
    if (newPassword !== verifyPassword) {
      window.alert('Passwords must be the same!');
      return;
    } else {
      setEditPassword(false);
      updateUser(e);
    }
  }

  function removeUserTag(e) {
    return
  }

  function addUserTag(e){
    e.preventDefault();
    
  }

  return (
    <div className="userpage_main__div">
      {user && (
        <>
          <button onClick={() => setEditPassword(!editPassword)}>
            Change Password?
          </button>
          {editPassword && (
            <>
              <form onSubmit={updatePassword}>
                <label>New password : </label>
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                ></input>
                <label>Confirm Password : </label>
                <input
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  type="password"
                ></input>
                <button type="submit">Submit change</button>
              </form>
            </>
          )}
        </>
      )}
      {user && (
        <>
          <div className="userpage_username__div">
            User name: {user.username}
            <button>Edit</button>
            {editName && (
              <>
                <form onSubmit={updateUser}>
                  <input
                    onChange={(e) => setUserName(e.target.value)}
                    defaultValue={userName}
                  />
                  <button type="submit">Update Username</button>
                </form>
              </>
            )}
          </div>
          <div className="userpage_email__div">Email : {user.email}</div>
          <div className="userpage_photo__div">
            Picture: <img src={user.photo} />
            <button onClick={() => setEditPhoto(!editPhoto)}>Edit</button>
            {editPhoto && (
              <>
                <form onSubmit={updateUser}>
                  <input
                    onChange={(e) => setPhoto(e.target.value)}
                    defaultValue={user_photo}
                  />
                  <button type="submit">Update Photo Link</button>
                </form>
              </>
            )}
          </div>
          <div className="userpage_tags__div">
            Tags:{' '}
            {user.tags && (
              <>
                <ul>
                  {user.tags.map((e, i) => (
                    <li key={`user_tag_key_${i}`}>
                      {e}{' '}
                      {editTags && <button onClick={removeUserTag}>X</button>}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setEditTags(true)}>Edit tags</button>
                {editTags && (
                  <>
                    <form onSubmit={addUserTag}>
                      <input
                        onChange={(e) => setNewTag(e.target.value)}
                        defaultValue="Enter new tag..."
                      />
                      <button type="submit">Add new tag</button>
                    </form>
                  </>
                )}
              </>
            )}
          </div>
          <div className="userpage_lfg__div">
            Currently Looking for group? :{' '}
            {user.looking_for_group ? 'Yes' : 'No'}
            <button onClick={() => setEditLFG(!editLFG)}>Edit</button>
            {editLFG && (
              <>
                <form onSubmit={updateUser}>
                  <input
                    type="checkbox"
                    checked={looking_for_group}
                    onChange={(e) => setLFG(!looking_for_group)}
                    // onClick={(e) => setLFG(e.target.checked)}
                  />
                  <button type="submit">Update Looking for Group Status</button>
                </form>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserPage;
