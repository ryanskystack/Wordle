import { createSlice } from "@reduxjs/toolkit";

// Guesses: The letters users input and will be shown in the InputBoxes
// Original: It's an array of six arrays, each subarray has 5 '' empty strings.
const originalGuesses = () => {
  const row = ["", "", "", "", ""];
  let result = [];
  for (let i = 0; i < 6; i++) {
    result.push(row.concat());
  }
  return result;
};

// For getting the actual length of user's guess
const rowLength = (row) => {
  return row.filter((ch) => ch !== "").length;
};

// The reducer for user guesses.
// Can handle when user puts more character when needed
// can handle when user deletes more than they can.
const guessSlice = createSlice({
  name: "guess",
  initialState: originalGuesses(),
  reducers: {
    addGuess: (state, action) => {
      const tryNum = action.payload.tryNum;
      const letter = action.payload.data;
      const row = state[tryNum];
      const length = rowLength(row);
      if (length < 5) {
        row[length] = letter.toUpperCase();
      }
    },
    deleteGuess: (state, action) => {
      const tryNum = action.payload.tryNum;
      const row = state[tryNum];
      const length = rowLength(row);
      if (length > 0) {
        row[length - 1] = "";
      }
    },
    resetGuess: () => originalGuesses(),
  },
});

export const { addGuess, deleteGuess, resetGuess } = guessSlice.actions;

export default guessSlice.reducer;
