import { combineReducers } from "@reduxjs/toolkit";

import {
  countReducer,
  winReducer,
  notifyReducer,
  tryNumberReducer,
  guessReducer,
  wordReducer,
} from "./slices";

export const rootReducer = combineReducers({
  count: countReducer,
  win: winReducer,
  notify: notifyReducer,
  tryNumber: tryNumberReducer,
  guess: guessReducer,
  word: wordReducer,
});
