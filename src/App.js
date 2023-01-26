import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './pages/homeScreen/HomeScreen';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/login/Login';
import { auth } from './services/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
      } else {
        dispatch(logout)
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className='app'>
      <Router>
        {!user ? (
          <Routes>
            <Route path='/' element={<Login />} />
          </Routes>
        ) : (
          <Routes>
            <Route path='/' element={<HomeScreen />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
