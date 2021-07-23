import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../store/user";
import * as tagActions from "../../store/tag";

const UserPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => ({ ...state.session.user }));
  const [editName, setEditName] = useState(false);
  const [editPhoto, setEditPhoto] = useState(false);
  const [editTags, setEditTags] = useState(false);
  const [editLFG, setEditLFG] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const [userName, setUserName] = useState(user.username);
  const [user_photo, setPhoto] = useState(user.photo);
  const [looking_for_group, setLFG] = useState(user.looking_for_group);
  const [newPassword, setNewPassword] = useState("password");
  const [verifyPassword, setVerifyPassword] = useState("repeatpassword");
  const [newTag, setNewTag] = useState("");

  function updateUser(e) {
    e.preventDefault();

    const data = {
      id: user.id,
      username: userName,
      photo: user_photo,
      looking_for_group: looking_for_group,
    };

    dispatch(userActions.updateUser(data));
  }

  function lfgUpdate(e) {
    e.checked === "on" ? setLFG(true) : setLFG(false);
  }

  function updatePassword(e) {
    e.preventDefault();
    if (newPassword !== verifyPassword) {
      window.alert("Passwords must be the same!");
      return;
    } else {
      setEditPassword(false);
      const data = {
        id: user.id,
        username: userName,
        photo: user_photo,
        looking_for_group: looking_for_group,
        password: newPassword,
        repeatPassword: verifyPassword,
      };
      dispatch(userActions.updatePassword(data));
    }
  }

  function removeUserTag(id, e) {
    // setEditTags(!editTags)

    dispatch(tagActions.removeTag(id, "user"));
    // e.closest('li').remove();
    // e.remove()
  }

  function addUserTag(e) {
    e.preventDefault();
    const data = {
      taggable_id: user.id,
      taggable_type: "user",
      tag: newTag,
    };
    setNewTag("");
    document.querySelector(".user_tag__input").value = "";
    dispatch(tagActions.createTag(data));
  }

  function enableTagEdit(e) {
    e.preventDefault();
    e.stopPropagation();
    setEditTags(!editTags);
  }

  return (
    <div className="userpage_main__div">
      {user && (
        <>
          <button onClick={() => setEditPassword(!editPassword)}>
            {editPassword ? "Cancel" : "Change Password?"}
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
          <button onClick={() => setEditName(!editName)}>
            {editName ? "Done editing username" : "Edit Username"}
          </button>
          <div className="userpage_email__div">Email : {user.email}</div>
          <div className="userpage_photo__div">
            Picture: <img src={user.photo} />
            <div></div>
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
          <button onClick={() => setEditPhoto(!editPhoto)}>
            {editPhoto ? "Done Editing Photo Link" : "Edit Photo Link"}
          </button>
          <div className="userpage_lfg__div">
            Currently Looking for group? :{" "}
            {user.looking_for_group ? "Yes" : "No"}
            <div>
              <button onClick={() => setEditLFG(!editLFG)}>
                {editLFG ? "Done Editing LFG Status" : "Edit LFG Status"}
              </button>
            </div>
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
          <div className="userpage_tags__div">
            Tags:{" "}
            {user.tags && (
              <>
                <ul>
                  {Object.values(user.tags).map((tag, i) => (
                    <li key={`user_tag_key_${i}`}>
                      {tag.tag}{" "}
                      {editTags && (
                        <button
                          onClick={(e) => removeUserTag(tag.id, e.target)}
                        >
                          X
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                <button onClick={(e) => enableTagEdit(e)}>
                  {editTags ? "Done Editing" : "Edit Tags"}
                </button>
                {editTags && (
                  <>
                    <form onSubmit={addUserTag}>
                      <input
                        className="user_tag__input"
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Enter new tag..."
                      />
                      <button type="submit">Add new tag</button>
                    </form>
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserPage;
