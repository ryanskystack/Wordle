import { createSlice } from "@reduxjs/toolkit";

// Specify how many tries the users have been made already.
// Starts from 0, then 1,2,3,4,5.
const tryNumberSlice = createSlice({
  name: "tryNumber",
  initialState: 0,
  reducers: {
    addTry: (state) => state + 1,
    resetTry: () => 0,
  },
});

export const { addTry, resetTry } = tryNumberSlice.actions;

export default tryNumberSlice.reducer;
