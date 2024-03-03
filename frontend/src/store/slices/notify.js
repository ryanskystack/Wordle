import { createSlice } from "@reduxjs/toolkit";

// Control the notification state
const notifySlice = createSlice({
  name: "notify",
  initialState: { message: "", open: false },
  reducers: {
    setNotify: (state, action) => {
      state.message = action.payload;
    },
    setNotifyOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const setNotification =
  (text, timeout = 3000) =>
  (dispatch) => {
    dispatch(notifySlice.actions.setNotify(text));
    setTimeout(() => {
      dispatch(notifySlice.actions.setNotifyOpen(true));
    }, 500);
    setTimeout(() => {
      dispatch(notifySlice.actions.setNotifyOpen(false));
    }, timeout + 500);
  };

export const { setNotify, setNotifyOpen } = notifySlice.actions;

export default notifySlice.reducer;
