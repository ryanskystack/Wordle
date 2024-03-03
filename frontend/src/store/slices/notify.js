import { createSlice } from "@reduxjs/toolkit";

// Control the notification state
const notifySlice = createSlice({
  name: "notify",
  initialState: { message: "", open: false },
  reducers: {
    setNotify: (state, action) => {
      state.message = action.payload.message;
      state.open = action.payload.open;
    },
    resetNotify: (state, action) => {
      state.message = "";
      state.open = false;
    },
  },
});

export const { setNotify, resetNotify } = notifySlice.actions;

export default notifySlice.reducer;
