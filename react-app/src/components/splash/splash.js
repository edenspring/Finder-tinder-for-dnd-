import React, { useState } from "react";
import { useDispatch } from "react-redux";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import {demoLogin} from "../../store/session"

const SplashPage = () => {
  const [signup, setSignUp] = useState(false);
  const dispatch = useDispatch();

  const demoSignIn = () => {
    dispatch(demoLogin())
  }

  return (
    <div className="splash_signuplogin__div">
      {signup ? (
        <>
          <SignUpForm />
          <button onClick={() => setSignUp(!signup)}>
            {signup ? "Have an Account? Login" : "Create an Account"}
          </button>
        </>
      ) : (
        <>
          <LoginForm />
          <button onClick={() => setSignUp(!signup)}>
            {signup ? "Have an Account? Login" : "Create an Account"}
          </button>
        </>
      )}
      <button class='demo_login__button' onClick={()=> demoSignIn()}>Demo Login</button>
    </div>
  );
};

export default SplashPage;
