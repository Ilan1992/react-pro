import {
  Grid,
  Typography,
  TextField,
  CardActionArea,
  Card,
  CardMedia,
  CardHeader,
  Divider,
  CardContent,
  Box,
  Button,
} from "@mui/material";
import axios from "axios"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleMap from "./GoogleMap";

const CardShow = () => {
  const [email ,setEmail] = useState("")
  const [phone ,setPhone] = useState("")
  const [dataFromApi,setDataFromApi] = useState({})
  let { id } = useParams();
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    setEmail("")
    setPhone("")
    toast.success(" ✔ Message Sand Successfully!", {
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
  useEffect(()=>{
    const handleShowCard = async ()=>{
      try {
      let { data } = await axios.get("/cards/"+id)
      setDataFromApi(data);
      } catch (error) {
      }
    }
    handleShowCard();
  },[id])
  
  return (
    <Box>
      <Typography variant="h3" align={"center"} color="initial">
        Card Details
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          mt: 7,
          justifyContent: "center",
          border: "3px solid black",
          height: "80%",
          borderRadius: "20px",
          boxShadow: "3px 3px 5px black",
          mb: 10,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ mb: 2 }} variant="h6">
            Here you can send us your Email and we will contact you
          </Typography>
          <GoogleMap city={dataFromApi?.address?.city} />
        </Box>
        <Grid item lg={6} md={6} xs={12}>
          <Card square raised sx={{ borderRadius: "20px", mb: 2 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                image={dataFromApi?.image?.url}
                alt="img"
                height={200}
              />
            </CardActionArea>
            <CardHeader
              title={dataFromApi?.title}
              subheader={dataFromApi?.subtitle}
            />
            <Divider></Divider>
            <CardContent>
              <Typography>
                <Typography component="span" fontWeight={700}>
                  Phone:
                </Typography>
                {dataFromApi?.phone}
              </Typography>
              <Typography>
                <Typography component="span" fontWeight={700}>
                  Address:
                </Typography>
                {dataFromApi?.address?.country}, {dataFromApi?.address?.city}
              </Typography>
              <Typography>
                <Typography component="span" fontWeight={700}>
                  Card number:
                </Typography>
                {dataFromApi?.bizNumber}
              </Typography>
              <Typography>
                <Typography component="span" fontWeight={700}>
                  Description:
                </Typography>
                {dataFromApi?.description}
              </Typography>
              <Typography>
                <Typography component="span" fontWeight={700}>
                  Email:
                </Typography>
                {dataFromApi?.email}
              </Typography>
            </CardContent>
          </Card>
          <Box component="form" onSubmit={handleSubmit}>
          <TextField
            id="email"
            label="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            id="phone"
            label="Enter phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button type="submit" variant="contained" sx={{ height: 55 }}>
            Submit
          </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CardShow