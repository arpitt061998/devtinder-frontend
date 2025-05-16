import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequests: (state, action) => {
      const newArray = state.filter(r => r.id !== action.payload);
      return newArray;
    },
    removeAllRequests: (state, action) => null
  }
});


export const {addRequests, removeRequests, removeAllRequests} = requestsSlice.actions;
export default requestsSlice.reducer;