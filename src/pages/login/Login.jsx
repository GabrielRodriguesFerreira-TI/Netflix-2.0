import React, { useRef, useState } from "react";
import "./Login.scss";
import netflixLogo from "../../assets/netflix-94.svg";
import SignUpScreen from "../signUpScreen/SignUpScreen";

function Login() {
  const [signIn, setSignIn] = useState(false);
  const emailRef = useRef(null);

  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <img className="loginScreen__logo" src={netflixLogo} alt="" />

        <button onClick={() => setSignIn(true)} className="loginScreen__button">Login</button>

        <div className="loginScreen__gradient" />
      </div>

      <div className="loginScreen__body">
        {signIn ? (
          <SignUpScreen email={emailRef} />
        ) : (
          <>
            <h1>Filmes ilimitados, programas de TV e muito mais.</h1>
            <h2>
              Assista em qualquer lugar. Cancele a qualquer momento</h2>
            <h3>
              Pronto para assistir? Digite seu e-mail para criar ou logar na sua conta.
            </h3>

            <div className="loginScreen__input">
              <form>
                <input ref={emailRef} type="email" placeholder="Email" />
                <button onClick={() => setSignIn(true)} className="loginScreen__getStarted">ENVIAR</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
