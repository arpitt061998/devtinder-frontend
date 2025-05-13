import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    authStatus: 'idle',
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.authStatus = "authenticated"
    },
    removeUser: (state) => {
      state.user = null;
      state.authStatus = "unauthenticated";
    },
    setAuthStatus: (state, action) => {
      state.authStatus = action.payload;
    },
  }
});

export const {addUser, removeUser, setAuthStatus} = userSlice.actions
export default userSlice.reducer;