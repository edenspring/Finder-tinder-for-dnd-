import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [about, setAbout] = useState("")
  const [user_photo, setUserPhoto] = useState("")
  const [looking_for_group, setLFG] = useState(false)


  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, about, user_photo, looking_for_group));
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateAbout = (e) => {
    setAbout(e.target.value);
  }

  const updateLFG = (e) => {
    setLFG(e.target.value);
  }

  const updatePhoto = (e) => {
    setUserPhoto(e.target.value)
  }

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        <label>User Name</label>
        <input
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div>
        <label>About Me:</label>
        <textarea
        name="about"
        onChange={updateAbout}
        placeholder={'A little about me....'}>
        </textarea>
      </div>
      <div>
        <label>A picture of me or my favorite character to play:</label>
        <input
        type='text'
        onChange={updatePhoto}
        placeholder='A link to the picture...'/>
      </div>
      <div>
        <label>Currently Looking for Group?</label>
        <input
        type='checkbox'
        checked={looking_for_group}
        onChange={updateLFG} />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
