import React from "react";
import "./ProfileScreen.scss"
import Nav from "../../components/nav/Nav";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { auth } from "../../services/firebase";
import PlansScreen from "../../components/plans/PlansScreen";

function ProfileScreen() {
  const user = useSelector(selectUser);

  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edite seu perfil</h1>

        {user ? (
          <div className="profileScreen__info">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt=""
            />

            <div className="profileScreen__details">
              <h2>{user?.email}</h2>
              <div className="profileScreen__plans">
                <h3>Planos</h3>

                <PlansScreen />
                <button onClick={() => auth.signOut()} className="profileScreen__signOut">Deslogar</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="divCenter">
            <div />
            <span>Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileScreen;
