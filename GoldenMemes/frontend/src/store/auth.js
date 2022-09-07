import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: { accessToken: null, user: { name: null, loggedIn: false } },
  reducers: {
    userLoggedIn: (auth, action) => {
      auth.user.loggedIn = true;
      auth.user.name = action.payload.username;
      auth.accessToken = action.payload.access;
    },
    userLoggedOut: (auth, action) => {
      auth.user.loggedIn = false;
      auth.user.name = null;
      auth.accessToken = null;
    },
  },
});

export default slice.reducer;
export const { userLoggedIn, userLoggedOut } = slice.actions;
