import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import emailReducer from '../features/emailSlice'

export const store = configureStore({
  reducer: {
    counter: userReducer,
    email: emailReducer,
  },
});
