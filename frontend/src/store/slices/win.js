import { createSlice } from "@reduxjs/toolkit";

// Control the Win state
const winSlice = createSlice({
  name: "win",
  initialState: false,
  reducers: {
    setWin: (state, action) => action.payload,
    resetWin: () => false,
  },
});

export const { setWin, resetWin } = winSlice.actions;

export default winSlice.reducer;
