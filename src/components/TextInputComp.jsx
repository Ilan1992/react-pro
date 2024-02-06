import {Grid, TextField, Alert} from "@mui/material"

const TextInputComp = ({
  xs,
  id,
  label,
  autoFocus,
  value,
  onChange,
  onBlur,
  errors,
  type,
  required,
}) => {
  return (
    <Grid item xs={xs}>
      <TextField
        name={id}
        required={required}
        fullWidth
        id={id}
        label={label}
        autoFocus={autoFocus}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
      />
      {errors && <Alert severity="error">{errors}</Alert>}
    </Grid>
  );
};
TextInputComp.defaultProps = {
  xs: 6,
  autoFocus:false,
}

export default TextInputComp