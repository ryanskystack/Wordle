/**
The main component for the Game. Including the gameboard, input boxes, keyboards, etc.
*/
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Header from "./header";
import GameBoard from "./game-board";
import Keyboard from "./keyboard";
import ButtonGroup from "./button-group";

export function Main() {
  return (
    <div className="Main">
      <Header />
      <Divider />
      <ButtonGroup />
      <Container maxWidth="sm">
        <GameBoard />
      </Container>
      <Container maxWidth="sm">
        <Keyboard />
      </Container>
    </div>
  );
}
