import { Typography, Grid, Box, Divider } from "@mui/material";
import CardsComp from "../../components/CardComp";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";
import LoginContext from "../../store/loginContext";
import normalizeHome from "../HomePage/normalizeHome";

const MyCards = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);

  useEffect(() => {
    axios
      .get("/cards/my-cards")
      .then(({ data }) => {
        setDataFromServer(normalizeHome(data));
      })
      .catch((err) => {
      });
  }, []);

  let dataFromServerFiltered = normalizeHome(
    dataFromServer,
    login.user ? login.user._id : undefined
  );

  if (!dataFromServerFiltered || !dataFromServerFiltered.length) {
    return <Typography>Could not find any items...</Typography>;
  }

  const handleEditCard = (id) => {
    navigate(`${ROUTES.EDITCARD}/${id}`);
  };
  const handleClickCard = (id) => {
    navigate(`${ROUTES.VIEWCARD}/${id}`);
  };

  const handleDeleteCard = async (id) => {
    try {
      if(window.confirm("Are you sure you want to delete this card?")){
        setDataFromServer((currentDataFromServer) =>
          currentDataFromServer.filter((card) => card._id !== id)
        );
        await axios.delete("/cards/" + id);
        toast.success(" ✔ Delete Successfully!", {
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
    } catch (error) {
      toast.error(
        "❗❗❗ Something`s Wrong ! Only The Creator of the card Can Delete !",
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
  };
  const handleLikeCard = async (id) => {
    try {
      let { data } = await axios.patch("/cards/" + id);
      setDataFromServer((cDataFromServer) => {
        let cardIndex = cDataFromServer.findIndex((card) => card._id === id);
        if (cardIndex >= 0) {
          cDataFromServer[cardIndex] = data;
        }
        return [...cDataFromServer];
      });
      toast.success(" ✔ Like Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
    }
  };

  return (
    <Box
      sx={{
        marginTop: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <Typography
        component="h3"
        variant="h3"
        align={"center"}
        color={"primary"}
        sx={{ my: 2, mt: 8 }}
      >
        Welcome to my Cards Page Here you can Change your Cards and Update them
      </Typography>
      <Divider sx={{ my: 2 }}>My Cards</Divider>
      <Grid container spacing={2}>
        {dataFromServerFiltered.map((item, index) => (
          <Grid item lg={3} md={6} xs={12} key={"Card" + index}>
            <CardsComp
              id={item._id}
              title={item.title}
              subtitle={item.subtitle}
              img={item.image.url}
              phone={item.phone}
              address={item.address}
              cardNumber={item.bizNumber}
              liked={item.liked}
              onDelete={handleDeleteCard}
              onEdit={handleEditCard}
              onIdClick={handleClickCard}
              onLike={handleLikeCard}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyCards;
