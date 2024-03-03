import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import InputBox from "./input-box";

const RowStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
};

const InputRow = (props) => {
  // const [values, setValues] = useState(['','','','',''])

  const { values, idStart } = props;

  // I need python's list comprehension.
  let ids = [];
  for (let i = idStart; i < idStart + 5; i++) {
    ids.push(i);
  }

  return (
    <Grid item xs={12} sm={12} style={RowStyle}>
      {values.map((v, index) => {
        return (
          <InputBox
            key={ids[index]}
            value={v}
            order={index}
            idFor={ids[index]}
          />
        );
      })}
    </Grid>
  );
};

InputRow.propTypes = {
  values: PropTypes.array.isRequired,
  idStart: PropTypes.number.isRequired,
};
export default InputRow;
