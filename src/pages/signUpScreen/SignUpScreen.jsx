import React, { useRef, useState } from "react";
import "./SignUpScreen.scss";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router";
import Loading from "../../components/loading/Loading";
import { toast } from "react-toastify";

function SignUpScreen({ email }) {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();


  const register = (e) => {
    e.preventDefault();
    setLoading(true)

    auth.createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
      .then((authUser) => {
        if (authUser) {
          navigate("/homeScreen")
        }
      }).catch(error => {
        alert("O email fornecido não é valido")
        setLoading(false)
        toast.error(error, {
          autoClose: 2500,
        })
      })
  };

  const signIn = (e) => {
    e.preventDefault();
    setLoading(true)

    auth.signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
      .then((authUser) => {
        if (authUser) {
          navigate("/homeScreen")
        }
      }).catch(error => {
        alert("Esse email não existe. Por favor, forneça um email valido")
        setLoading(false)
        toast.error(error, {
          autoClose: 2500,
        })
      })
  };

  return (
    <div className="signUpScreen">
      {loading && <Loading />}
      <form>
        <h1>Login</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} placeholder="Senha" type="password" />
        <button type="submit" onClick={signIn}>
          Logar
        </button>

        <h4>
          <span className="signUpScreen__gray">Novo na Netflix?</span>{" "}
          <span className="signUpScreen__link" onClick={register}>
            Crie uma conta agora.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignUpScreen;
