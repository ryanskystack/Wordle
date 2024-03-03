import { createSlice } from "@reduxjs/toolkit";

// Control the count state - used to refresh/reset the game
const countSlice = createSlice({
  name: "count",
  initialState: 0,
  reducers: {
    addCount: (state) => state + 1,
  },
});

export const { addCount } = countSlice.actions;

export default countSlice.reducer;
