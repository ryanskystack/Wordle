export { default as countReducer, addCount } from "./count";
export { default as winReducer, setWin, resetWin } from "./win";
export { default as notifyReducer, setNotify, resetNotify } from "./notify";
export { default as tryNumberReducer, addTry, resetTry } from "./try-number";
export {
  default as guessReducer,
  addGuess,
  deleteGuess,
  resetGuess,
} from "./guess";
export { default as wordReducer, initWord, resetWord } from "./word";
export {
  default as candidateSlice,
  updateCandidate,
  resetCandidate,
} from "./candidate";
