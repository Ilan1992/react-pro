import {  useState } from "react";
import {useNavigate ,Link} from "react-router-dom"
import axios from "axios"
import ROUTES from "../../routes/ROUTES";
import validateSchema from "../../validation/registerValidation";
import normalizeRegister from "./normalizeRegister";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { toast } from "react-toastify";
import {
  Avatar,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import TextInputComp from "../../components/TextInputComp";
const RegisterPage = () => {
  const [checked , setChecked] = useState(false);
  const [inputsValue, setInputValue] = useState({
    first: "",
    middle: "",
    last: "",
    email: "",
    password: "",
    phone: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const [errors , setErrors] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const navigate = useNavigate();
  const handleInputsChange = (e) =>{
    setInputValue((prev) =>({
      ...prev,[e.target.id]: e.target.value,
    }));
  };
  const handleInputsBlur = (e) =>{
    let { error }  = validateSchema[e.target.id]({
      [e.target.id]: inputsValue[e.target.id]
    });
    if(error){
      setErrors((prev)=>({
        ...prev,[e.target.id]: error.details[0].message,
      }));
    }else{
      setErrors((prev) =>{
        delete prev[e.target.id];
        return {...prev}
      })
    }}
  const handleChangeCheck =() =>{
    setChecked(prev => !prev);
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      await axios.post(
        "/users",
        normalizeRegister({ ...inputsValue, isBusiness: checked })
      );
      toast.success(' ✔ Register Successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
});
      navigate(ROUTES.LOGIN)
    } catch (error) {
      toast.error("❗❗❗ Something`s Wrong !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }}

  let keysArray = Object.keys(inputsValue)
  let notRequired = ["middle","url","alt","state"];
  
  return (
    <Box
      sx={{
        marginTop: 15,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        
      }}>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        REGISTER (⌐■_■)
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ my: 3 }}>
        <Grid container spacing={2}>
          {keysArray.map((keyName,index) => (
            <TextInputComp
              key={"input" + index}
              id={keyName}
              label={keyName}
              value={inputsValue[keyName]}
              onChange={handleInputsChange}
              onBlur={handleInputsBlur}
              errors={errors[keyName]}
              type={keyName === "password" ? "password" : "text"}
              required={!notRequired.includes(keyName)}
            />
          ))}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onClick={handleChangeCheck}
                  color="primary"
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Business Account"
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to={ROUTES.LOGIN} variant="body2">
              Already have an account? Login!
            </Link>
          </Grid>
        </Grid>
        <Box sx={{display: "flex", justifyContent: "space-between",}}>
          <Button
            fullWidth
            type="button"
            color="error"
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate(ROUTES.HOME)}>
            CANCEL
          </Button>
          <Button
            fullWidth
            type="button"
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              setInputValue((prevInputs) => {
                const updatedInputs = { ...prevInputs };
                Object.keys(updatedInputs).forEach((key) => {
                  updatedInputs[key] = "";
                });
                return updatedInputs;
              });
            }}>
            🔄 REFRESH
          </Button>
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 5 }}
          disabled={Object.keys(errors).length > 0}
        >
          REGISTER (⌐■_■)
        </Button>
      </Box>
    </Box>
  );
};
export default RegisterPage;
