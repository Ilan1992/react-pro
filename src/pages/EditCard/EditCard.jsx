import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Avatar, Typography, Grid, Button } from "@mui/material";
import axios from "axios";
import LoginContext from "../../store/loginContext";
import { toast } from "react-toastify";
import normalizeCreateCard from "../CreateCard/normalizeCreateCard";
import { fromServer } from "../EditCard/normalizeEdit"
import ValidateSchema from "../../validation/cardValidation";
import EditNoteIcon from '@mui/icons-material/EditNote';
import TextInputComp from "../../components/TextInputComp";
import ROUTES from "../../routes/ROUTES";

const EditCard = () => {
  const [inputsValue, setInputsValue] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
  });
  let { id } = useParams();
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || !login.user) {
      return;
    }
    axios.get("/cards/" + id).then(({ data }) => {
      if (data.user_id === login.user._id) {
        setInputsValue(fromServer(data));
        setErrors({})
      } else {
        toast.error(
          "❗❗❗ Something`s Wrong ! Only The Creator of the card Can Edit !",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      }
    })
    .catch((err)=>{
      
    })
  }, [id, login]);

  let keysArray = Object.keys(inputsValue);
  let notRequired = ["web","state","zip"]

  const handleInputsChange = (e) =>{
    setInputsValue((prev)=>({
      ...prev,[e.target.id]: e.target.value,
    }))
  };

   const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      await axios.put("/cards/"+id, normalizeCreateCard(inputsValue));
      navigate(ROUTES.MY_CARDS)
      toast.success(" ✔ Update Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
    }
   }

  const handleInputsBlur = (e) =>{
    const { error } = ValidateSchema[e.target.id]({
      [e.target.id]: inputsValue[e.target.id] || "null",
    });
    if(error){
      setErrors((prev)=>({
        ...prev,[e.target.id]: error.details[0].message,
      }));
    }else{
      setErrors((prev)=>{
        delete prev[e.target.id];
        return {...prev}
      });
    }
  }
  return (
    <Box
      sx={{
        marginTop: 15,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <EditNoteIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Edit your card
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {keysArray.map((keyName) => (
            <TextInputComp
              key={"inputs" + keyName}
              id={keyName}
              label={keyName}
              value={inputsValue[keyName]}
              onChange={handleInputsChange}
              onBlur={handleInputsBlur}
              errors={errors[keyName]}
              required={!notRequired.includes(keyName)}
            />
          ))}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            fullWidth
            type="button"
            color="error"
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate(ROUTES.HOME)}
          >
            CANCEL
          </Button>
          <Button
            fullWidth
            type="button"
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              setInputsValue((prevInputs) => {
                const updatedInputs = { ...prevInputs };
                Object.keys(updatedInputs).forEach((key) => {
                  updatedInputs[key] = "";
                });
                return updatedInputs;
              });
            }}
          >
            🔄 REFRESH
          </Button>
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={Object.keys(errors).length > 0}
        >
          Edit Card
        </Button>
      </Box>
    </Box>
  );
};

export default EditCard;
