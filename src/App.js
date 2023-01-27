import React, { useEffect } from 'react';
import './App.scss';
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
        navigate("/homeScreen")
      } else {
        dispatch(logout())
        navigate("/profile")
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className='app'>
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
