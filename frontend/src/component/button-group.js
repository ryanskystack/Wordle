import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { api } from "../utils/api";
import { distributeGuessesToRows } from "../utils/helpers";
import {
  updateCandidate,
  resetCandidate,
  resetTry,
  resetGuess,
} from "../store";

const generateQueryData = (guesses, info) => {
  // console.log('guesses: ', guesses) // debug
  // console.log('info: ', info) // debug
  const guessList = distributeGuessesToRows(guesses);

  const result = [];
  for (let i = 0; i < guessList.length; i++) {
    let gl = guessList[i];
    // If the list is not filled, do not include in the final result.
    if (gl.join("").length < gl.length) {
      break;
    } else {
      let temp = [gl.join(""), info[i].join("")];
      // console.log('temp: ', JSON.stringify(temp)) // debug
      result.push(temp);
    }
  }
  return result;
};

const ButtonGroup = (props) => {
  const guesses = useSelector((state) => state.guesses);
  const info = useSelector((state) => state.info);
  const dispatch = useDispatch();

  const style = {
    justifyContent: "space-between",
  };

  const analyzeHandler = async (event) => {
    const queryData = generateQueryData(guesses, info);
    const payload = {
      data: queryData,
    };
    // axios.defaults.headers.post["Content-Type"] = "application/json";
    // axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    api
      .post("guess", payload)
      .then((response) => {
        // console.log(response.data) ; // debug
        if (response.status !== 200) {
          console.error("Error fetching new word:", response);
          dispatch(resetCandidate());
        }
        if (response.status === 200) {
          dispatch(updateCandidate(response.data));
        }
      })
      .catch((error) => {
        console.log("error:", error);
        dispatch(resetCandidate());
      });
  };

  const resetHandler = (event) => {
    event.preventDefault();
    // use redux dispatch to reset the states
    dispatch(resetCandidate());
    dispatch(resetTry());
    dispatch(resetGuess());
  };

  return (
    <Grid container style={style}>
      <Grid item xs={6} sm={6}>
        <Button variant="outlined" onClick={analyzeHandler}>
          {" "}
          Analyze{" "}
        </Button>
      </Grid>
      <Grid item xs={6} sm={6}>
        <Button variant="outlined" onClick={resetHandler}>
          {" "}
          Reset{" "}
        </Button>
      </Grid>
    </Grid>
  );
};

export default ButtonGroup;
