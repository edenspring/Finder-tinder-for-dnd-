import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

const UserPage = () => {
  const user = useSelector((state) => state.session.user);
  const [editName, setEditName] = useState(false);
  const [editPhoto, setEditPhoto] = useState(false);
  const [editTags, setEditTags] = useState(false);
  const [editLFG, setEditLFG] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const [userName, setUserName] = useState(user.userName);
  const [user_photo, setPhoto] = useState(user.photo);
  const [looking_for_group, setLFG] = useState(user.looking_for_group);
  const [newPassword, setNewPassword] = useState('');

  useEffect(()=>{

    if (user) {
      setUserName(user.username);
      setPhoto(user.photo);
      setLFG(user.looking_for_group);
    }
  },[])

  function updateUser(e) {
    e.preventDefault();
  }

  return (
    <div className="userpage_main__div">
      {user && (
        <>
          <div className="userpage_username__div">
            User name: {user.username}
            <button onClick={()=>setEditName(!editName)}>Edit</button>
            {editName && (
              <>
                <form onSubmit={updateUser}>
                  <input
                    onChange={(e) => setUserName(e.target.value)}
                    defaultValue={userName}
                  />
                  <submit onClick={()=>setEditName(false)}>Update Username</submit>
                </form>
              </>
            )}
          </div>
          <div className="userpage_email__div">Email : {user.email}</div>
          <div className="userpage_photo__div">
            Picture: <img src={user.photo} />
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
          </div>
        </>
      )}
    </div>
  );
};

export default UserPage;
