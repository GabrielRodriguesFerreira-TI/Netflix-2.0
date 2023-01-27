import React, { useEffect } from 'react';
import './App.scss';
import { ToastContainer } from "react-toastify";
import HomeScreen from './pages/homeScreen/HomeScreen';
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Login from './pages/login/Login';
import { auth } from './services/firebase';
import { useDispatch } from 'react-redux';
import { login, logout } from './features/userSlice';
import ProfileScreen from './pages/profileScreen/ProfileScreen';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
      } else {
        dispatch(logout())
        navigate("/profile")
      }
    });

    return unsubscribe;
  }, [dispatch, navigate]);

  return (
    <div className='app'>

      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path='/profile' element={<Login />} />
        <Route path='/homeScreen' element={<HomeScreen />} />
        <Route path='/profileScreen' element={<ProfileScreen />} />
        <Route path='*' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
