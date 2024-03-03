import {
  addCount,
  resetWin,
  resetGuess,
  addTry,
  resetTry,
  addGuess,
  deleteGuess,
} from "../store/slices";

import { useRef, useEffect } from "react";

// helper function: To change a flat array into an array of arrays.
export const distributeGuessesToRows = (guesses) => {
  const result = [];
  const rows = 5;
  const rowSize = 5;
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < rowSize; j++) {
      let cur = guesses[i * rowSize + j];
      if (!cur) {
        row.push("");
      } else {
        row.push(cur.toUpperCase());
      }
    }
    result.push(row);
  }
  return result;
};

// To register a event listener
// Helper function for keyboard monitor.
export const useEventHandler = (eventName, handler, element = window) => {
  // create a ref that stores handler
  const savedHandler = useRef();
  // console.log(savedHandler) // debug

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // console.log('add event listener') // debug
    function eventHandler(event) {
      savedHandler.current(event);
    }
    element.addEventListener(eventName, eventHandler);
    return () => {
      element.removeEventListener(eventName, eventHandler);
    };
  }, [eventName, element]);
};

export const resetGame = (dispatch) => {
  dispatch(addCount());
  dispatch(resetWin());
  dispatch(resetGuess());
  dispatch(resetTry());

  // Flip back all the boxes
  for (let i = 0; i < 5 * 6; i++) {
    let container = document.getElementById(i);
    container.classList.remove("flipped");
    let elem = document.getElementById(i + "back");
    elem.classList.remove("Gray-Box");
    elem.classList.remove("Green-Box");
    elem.classList.remove("Yellow-Box");
  }
};

// Monitor user's keyboard input, if they decided not to use the virtual keyboard.
export const keypressHandler = (event, dispatch, tryNum) => {
  const keycode = event.keyCode;
  const aCode = 65;
  const zCode = 90;
  const delCode = 8; // backspace

  // console.log(event) // debug

  // ignore non-alphabet and backspace keystrokes.
  if (keycode !== delCode && (keycode < aCode || keycode > zCode)) {
    return;
  }

  // Handle deletion.
  if (keycode === delCode) {
    dispatch(deleteGuess({ tryNum }));
  } else {
    dispatch(addGuess({ data: event.key, tryNum }));
  }
};

// Feedback of the wordle.
// For example: target = 'MOVIE', guess = 'BIBLE', return '.y..g'
// . means mismatch, y means right word in wrong position, g means exact match.
// Maybe add some test cases
export const feedback = (target, guess) => {
  const result = [".", ".", ".", ".", "."];
  const mismatches = new Map();

  // Get the exact matches first (green)
  for (let i = 0; i < 5; i++) {
    if (target[i] === guess[i]) {
      result[i] = "g";
    } else if (mismatches.has(target[i])) {
      mismatches[target[i]] += 1;
    } else {
      mismatches[target[i]] = 1;
    }
  }

  // Now get the yellow matches
  for (let i = 0; i < 5; i++) {
    if (mismatches[guess[i]] > 0 && result[i] === ".") {
      result[i] = "y";
      mismatches[guess[i]] -= 1;
    }
  }
  return result;
};

// The function that handles when the user submit a guess by hitting 'enter'
// It sends the feedback to the user, and update the tryNum
// return the feedback to the caller.
export const handleSubmit = (event, dispatch, guess, target) => {
  const length = guess.filter((ch) => ch !== "").length;
  if (length < 5) {
    // '' will trigger another notification on gameBoard.
    return "";
  } else {
    // Valid Guess.
    // Accept the guess, compare it with the target and give feedback to the user.
    const result = feedback(target, guess);
    // update the tryNum
    dispatch(addTry());
    return result;
  }
};
