import { createSlice } from '@reduxjs/toolkit';

export const emailSlice = createSlice({
    name: "email",
    initialState: {
        email: null,
    },
    reducers: {
        hasEmail: (state, action) => {
            state.email = action.payload
        },
        hasNoEmail: (state) => {
            state.email = null;
        },
    },
});

export const { hasEmail, hasNoEmail } = emailSlice.actions;

export const selectEmail = (state) => state.email.email;

export default emailSlice.reducer;