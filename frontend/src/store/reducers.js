import { combineReducers } from "@reduxjs/toolkit";

import {
  countReducer,
  winReducer,
  notifyReducer,
  tryNumberReducer,
  guessReducer,
  wordReducer,
} from "./slices";

// // Guesses: The letters users input and will be shown in the InputBoxes
// // Original: It's an array of six arrays, each subarray has 5 '' empty strings.
// const originalGuesses = () => {
//   const row = ["", "", "", "", ""];
//   let result = [];
//   for (let i = 0; i < 6; i++) {
//     result.push(row.concat());
//   }
//   return result;
// };

// // For getting the actual length of user's guess
// const rowLength = (row) => {
//   return row.filter((ch) => ch !== "").length;
// };

// // Control the count state - used to refresh/reset the game
// const countSlice = createSlice({
//   name: "count",
//   initialState: 0,
//   reducers: {
//     addCount: (state) => state + 1,
//   },
// });

// // Control the Win state
// const winSlice = createSlice({
//   name: "win",
//   initialState: false,
//   reducers: {
//     setWin: (state, action) => action.payload,
//   },
// });

// // Control the notification state
// const notifySlice = createSlice({
//   name: "notify",
//   initialState: "",
//   reducers: {
//     setNotify: (state, action) => action.payload,
//   },
// });

// // Specify how many tries the users have been made already.
// // Starts from 0, then 1,2,3,4,5.
// const tryNumberSlice = createSlice({
//   name: "tryNumber",
//   initialState: 0,
//   reducers: {
//     addTry: (state) => state + 1,
//     resetTry: () => 0,
//   },
// });

// // The reducer for user guesses.
// // Can handle when user puts more character when needed
// // can handle when user deletes more than they can.
// const guessSlice = createSlice({
//   name: "guess",
//   initialState: originalGuesses(),
//   reducers: {
//     addGuess: (state, action) => {
//       const tryNum = action.payload.tryNum;
//       const letter = action.payload.data;
//       const row = state[tryNum];
//       const length = rowLength(row);
//       if (length < 5) {
//         row[length] = letter.toUpperCase();
//       }
//     },
//     deleteGuess: (state, action) => {
//       const tryNum = action.payload.tryNum;
//       const row = state[tryNum];
//       const length = rowLength(row);
//       if (length > 0) {
//         row[length - 1] = "";
//       }
//     },
//     resetGuess: () => originalGuesses(),
//   },
// });

// const wordSlice = createSlice({
//   name: "word",
//   initialState: "",
//   reducers: {
//     initWord: (state, action) => action.payload,
//     resetWord: () => "",
//   },
// });

// export const { addCount } = countSlice.actions;
// export const { setWin } = winSlice.actions;
// export const { setNotify } = notifySlice.actions;
// export const { addTry, resetTry } = tryNumberSlice.actions;
// export const { addGuess, deleteGuess, resetGuess } = guessSlice.actions;
// export const { initWord, resetWord } = wordSlice.actions;

// export const countReducer = countSlice.reducer;
// export const winReducer = winSlice.reducer;
// export const notifyReducer = notifySlice.reducer;
// export const tryNumberReducer = tryNumberSlice.reducer;
// export const guessReducer = guessSlice.reducer;
// export const wordReducer = wordSlice.reducer;

export const rootReducer = combineReducers({
  count: countReducer,
  win: winReducer,
  notify: notifyReducer,
  tryNumber: tryNumberReducer,
  guess: guessReducer,
  word: wordReducer,
});
