/**
The virtual keyboard.
*/
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/base";

const KeyboardBackgroundStyle = {
  backgroundColor: "#ececec",
  padding: "2px",
  margin: "8px",
};

// const ButtonStyle = {
//   minWidth: "40px",
// };

const Keyboard = (props) => {
  const topRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const midRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const bottom = ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"];
  const dispatch = useDispatch();
  const tryNum = useSelector((state) => state.tryNumber);

  // handle the virtual keyboard keystrokes
  const keyHandler = (event) => {
    event.preventDefault();
    const value = event.target.textContent;
    if (value === "DEL") {
      dispatch({ type: "DELETE_GUESS", tryNum: tryNum });
    } else if (value === "ENTER") {
      // trigger the keyboard press event.
      const enterEvent = new KeyboardEvent("keydown", { key: "Enter" });
      document.dispatchEvent(enterEvent);
    } else {
      dispatch({ type: "ADD_GUESS", tryNum: tryNum, data: value });
    }
  };

  return (
    // The keyboard is a grid item of the board but also the container of the keys.
    <div style={KeyboardBackgroundStyle}>
      <div
        style={{ display: "flex", justifyContent: "center" }}
        id="topRow"
        className="virtual-key-row"
        spacing={2}>
        {topRow.map((key) => {
          return (
            <Button
              key={key}
              id={key + "button"}
              onClick={keyHandler}
              className="virtual-key">
              {key}
            </Button>
          );
        })}
      </div>

      <div
        style={{ display: "flex", justifyContent: "center" }}
        id="midRow"
        className="virtual-key-row"
        spacing={2}>
        {midRow.map((key) => {
          return (
            <Button
              key={key}
              id={key + "button"}
              onClick={keyHandler}
              className="virtual-key"
              variant="outlined">
              {key}
            </Button>
          );
        })}
        {}
      </div>
      <div
        style={{ display: "flex", justifyContent: "center" }}
        id="bottom"
        className="virtual-key-row">
        {bottom.map((key) => {
          return (
            <Button
              key={key}
              id={key + "button"}
              onClick={keyHandler}
              className="virtual-key"
              variant="outlined">
              {key}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Keyboard;
