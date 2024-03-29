import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { api } from "../utils/api";
import { distributeGuessesToRows } from "../utils/helpers";
import { updateCandidate, resetCandidate } from "../store";

const generateQueryData = (guesses, info) => {
  // console.log('guesses: ', guesses) // debug
  // console.log('info: ', info) // debug
  if (!guesses || !info) {
    return [];
  }
  if (guesses.length !== 25) {
    return [];
  }
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
  const [candidate, setCandidate] = useState("");
  const [showCandidate, setShowCandidate] = useState(false);

  const style = {
    justifyContent: "space-between",
  };

  const analyzeHandler = async (event) => {
    const queryData = generateQueryData(guesses, info);
    const payload = {
      data: queryData,
    };
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
          setCandidate(response.data);
          setShowCandidate(true);
        }
      })
      .catch((error) => {
        console.log("error:", error);
        dispatch(resetCandidate());
      });
  };

  const resetHandler = (event) => {
    event.preventDefault();
    dispatch(resetCandidate());
    setShowCandidate(false);
    setCandidate("");
  };

  return (
    <>
      <div style={{ margin: "0 auto" }}>
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
              Stop Analyzing{" "}
            </Button>
          </Grid>
        </Grid>
      </div>
      {showCandidate && (
        <div>
          <p> {candidate} </p>
        </div>
      )}
    </>
  );
};

export default ButtonGroup;
