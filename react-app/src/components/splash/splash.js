import React, { useState } from "react";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";

const SplashPage = () => {
  const [signup, setSignUp] = useState(false);

  return (
      <div className='splash_signuplogin__div' >
        {signup ? (
          <div className="signup_form__div">
            <SignUpForm />
          </div>
        ) : (
          <div className="login_form__div">
            <LoginForm />
          </div>
        )}
        <button onClick={() => setSignUp(!signup)}>
          {signup ? "Have an Account? Login" : "Create an Account"}
        </button>
      </div>
  );
};

export default SplashPage;
