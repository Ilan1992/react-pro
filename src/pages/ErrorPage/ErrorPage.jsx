import React from "react";
import imgError from "../../assets/imgs/404/5203299.jpg";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function ErrorPage() {
  return (
    <Grid container spacing={2} direction={"column"} alignItems={"center"}>
      <Typography variant="h1" fontWeight={700} color="">
        ERROR 404 !
      </Typography>
      <img src={imgError} alt="error" width={500} />
    </Grid>
  );
}

export default ErrorPage;
