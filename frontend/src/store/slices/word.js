import { createSlice } from "@reduxjs/toolkit";

// Control the word state - used to init/reset the game
const wordSlice = createSlice({
  name: "word",
  initialState: "",
  reducers: {
    initWord: (state, action) => action.payload,
    resetWord: () => "",
  },
});

export const { initWord, resetWord } = wordSlice.actions;

export default wordSlice.reducer;
