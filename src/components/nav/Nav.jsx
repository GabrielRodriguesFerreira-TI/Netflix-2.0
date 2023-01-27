import React, { useEffect, useState } from "react";
import "./Nav.scss";
import netflixLogo from "../../assets/netflix-94.svg";
import { useNavigate } from "react-router";

function Nav() {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate()

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);

    return () => window.removeEventListener("scroll", transitionNavBar)
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img onClick={() => navigate("/homeScreen")} className="img__logo" src={netflixLogo} alt="" />

        <img
          onClick={() => navigate("/profileScreen")}
          className="img__avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Nav;
