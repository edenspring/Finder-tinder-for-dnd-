import React, {useState} from 'react';
import {useSelector} from 'react-redux';

const UserPage = () => {
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

  function updateUser(e) {
    e.preventDefault();
    const data = {
      id: user.id,
      username: userName,
      user_photo,
    };
  }

  function updatePassword(e) {
    e.preventDefault();
    if (newPassword !== verifyPassword){
      window.alert('Passwords must be the same!')
      return
    }
    else {
      setEditPassword(false)
      updateUser(e)
    }
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
                <input onChange={(e)=>setNewPassword(e.target.value)} type="password"></input>
                <label>Confirm Password : </label>
                <input onChange={(e)=>setVerifyPassword(e.target.value)} type="password>"></input>
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
            <button onClick={() => setEditName(!editName)}>Edit</button>
            {editName && (
              <>
                <form onSubmit={updateUser}>
                  <input
                    onChange={(e) => setUserName(e.target.value)}
                    defaultValue={userName}
                  />
                  <button type="submit" onClick={() => setEditName(false)}>
                    Update Username
                  </button>
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
                  <button type="submit" onClick={() => setEditPhoto(false)}>
                    Update Photo Link
                  </button>
                </form>
              </>
            )}
          </div>
          <div className="userpage_tags__div">
            Tags:{' '}
            {user.tags && (
              <ul>
                {user.tags.map((e, i) => (
                  <li key={`user_tag_key_${i}`}>{e}</li>
                ))}
              </ul>
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
                    onChange={(e) => setLFG(e.target.value)}
                    checked={looking_for_group}
                  />
                  <button type="submit" onClick={() => setEditLFG(false)}>
                    Update Looking for Group Status
                  </button>
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
