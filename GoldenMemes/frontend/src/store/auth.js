import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: { accessToken: null, refreshToken: null, user: { name: null, loggedIn: false } },
  reducers: {
    userLoggedIn: (auth, action) => {
      auth.user.loggedIn = true;
      auth.user.name = action.payload.username;
      auth.accessToken = action.payload.access;
      auth.refreshToken = action.payload.refresh;
    },
    userLoggedOut: (auth) => {
      auth.user.loggedIn = false;
      auth.user.name = null;
      auth.accessToken = null;
      auth.refreshToken = null;
    },
    userRefreshToken: (auth, action) => {
      auth.accessToken = action.payload.access;
    },
  },
});

export default slice.reducer;
export const { userLoggedIn, userLoggedOut, userRefreshToken } = slice.actions;
