/**
Gameboard - A 2-dimentional plane that holds the tiles of the game.
*/
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { api } from "../utils/api";
import { initWord, setWin, setNotify, resetNotify } from "../store";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import {
  resetGame,
  keypressHandler,
  handleSubmit,
  useEventHandler,
} from "../utils/helpers";
import InputRow from "./input-row";
import Grid from "@mui/material/Grid";

const BoardStyle = {
  margin: "10px",
  padding: "10px",
  rowSpacing: {
    xs: 1,
    sm: 5,
  },
  columnSpacing: {
    xs: 1,
    sm: 2,
  },
};

const GameBoard = (props) => {
  const dispatch = useDispatch();
  const values = useSelector((state) => state.guess);
  const tryNum = useSelector((state) => state.tryNumber);
  const target = useSelector((state) => state.word);
  const { message, open } = useSelector((state) => state.notify);

  const count = useSelector((state) => state.count);
  const [showButton, setShowButton] = useState("none");
  // console.log('win: ', win) // debug
  // console.log('notification: ', notification) // debug
  // console.log('target: ', target) // debug
  // console.log('count:', count) // debug

  // Get a new Target word
  // To be controlled by a global state.
  useEffect(() => {
    api
      .get("/new-word")
      .then((response) => {
        if (response.status !== 200) {
          console.error("Error fetching new word:", response);
          dispatch(initWord("BLOOD"));
        }
        if (response.status === 200 && response.data.length === 5) {
          dispatch(initWord(response.data));
        }
      })
      .catch((error) => {
        console.error("Error fetching new word:", error);
        dispatch(initWord("BLOOD"));
      });

    setShowButton("none");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const keypressEventHandler = async (event) => {
    // console.log('inside handler: ', event) ; // debug
    // Handle the 'Enter' key
    if (event.key === "Enter" || event.keyCode === 13) {
      const guess = values[tryNum];
      const feedback = handleSubmit(event, dispatch, guess, target);

      // If the guess is not in the right format
      if (!feedback) {
        dispatch(setNotify({ message: "Not a 5 letter word", open: false }));
        dispatch(resetNotify());
        return;
      }

      const idStart = tryNum * 5;
      await flipRow(idStart, feedback);

      // User has win the game
      if (feedback.join("") === "ggggg") {
        setWin();
        dispatch(setNotify({ message: "Excellent", open: true }));
        setTimeout(() => {
          dispatch(resetNotify());
          setShowButton("");
        }, 1000);
      }
      // used up all the guesses, user loses.
      else if (tryNum === 5) {
        dispatch(
          setNotify({ message: "You have used all guesses", open: false })
        );
        setTimeout(() => {
          dispatch(resetNotify());
          setShowButton("");
        }, 1000);
      }
    }

    // Handle other keys
    else {
      return keypressHandler(event, dispatch, tryNum);
    }
  };

  // register the key press handler, to monitor user keyboard input.
  useEventHandler("keydown", keypressEventHandler);

  return (
    <Grid container rowSpacing={2} sx={BoardStyle}>
      <Snackbar
        key="notification"
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={message}
      />

      <Grid container sx={{ justifyContent: "center", display: showButton }}>
        <Grid item>
          <Button onClick={(event) => resetGame(dispatch)} variant="contained">
            {" "}
            Play Again{" "}
          </Button>
        </Grid>
      </Grid>
      <InputRow values={values[0]} idStart={0} />
      <InputRow values={values[1]} idStart={5} />
      <InputRow values={values[2]} idStart={10} />
      <InputRow values={values[3]} idStart={15} />
      <InputRow values={values[4]} idStart={20} />
      <InputRow values={values[5]} idStart={25} />
    </Grid>
  );
};

// Flip the whole Row of characters.
const flipRow = async (idStart, feedback = "ggggg") => {
  let threads = [];
  for (let i = 0; i < 5; i++) {
    const id = i + idStart;
    const elem = document.getElementById(id + "back");
    switch (feedback[i]) {
      case ".":
        elem.classList.add("Gray-Box");
        break;
      case "g":
        elem.classList.add("Green-Box");
        break;
      case "y":
        elem.classList.add("Yellow-Box");
        break;
      default:
        break;
    }

    let thisPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
        const elemContainer = document.getElementById(id);
        elemContainer.classList.add("flipped");
      }, i * 500);
    });
    threads.push(thisPromise);
  }
  await Promise.all(threads);
};

export default GameBoard;
