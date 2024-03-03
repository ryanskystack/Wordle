const HeaderStyle = {
  marginTop: "5px",
  marginBottom: "5px",
};

const Header = (props) => {
  return (
    <div className="Header">
      <h1 style={HeaderStyle}>
        {" "}
        Wordle <sup style={{ fontSize: "10px" }}> unlimited </sup>{" "}
      </h1>
    </div>
  );
};

export default Header;
