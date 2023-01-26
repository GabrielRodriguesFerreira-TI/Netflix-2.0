import React, { useState } from "react";
import "./Login.scss";
import netflixLogo from "../../assets/netflix-94.svg";
import SignUpScreen from "../signUpScreen/SignUpScreen";

function Login() {
  const [signIn, setSignIn] = useState(false);

  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <img className="loginScreen__logo" src={netflixLogo} alt="" />

        <button onClick={() => setSignIn(true)} className="loginScreen__button">Sign in</button>

        <div className="loginScreen__gradient" />
      </div>

      <div className="loginScreen__body">
        {signIn ? (
          <SignUpScreen />
        ) : (
          <>
            <h1>Unlimited films, TV programmes and more.</h1>
            <h2>Watch anywhere. Cancel at any time.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>

            <div className="loginScreen__input">
              <form>
                <input type="email" placeholder="Email" />
                <button onClick={() => setSignIn(true)} className="loginScreen__getStarted">GET STARTED</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
