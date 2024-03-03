import { createSlice } from "@reduxjs/toolkit";

// Control the Win state
const winSlice = createSlice({
  name: "win",
  initialState: false,
  reducers: {
    setWin: (state, action) => action.payload,
  },
});

export const { setWin } = winSlice.actions;

export default winSlice.reducer;
