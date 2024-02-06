import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Divider,
  IconButton,
  Box ,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import { useContext ,memo} from "react";
import LoginContext from "../store/loginContext";
import DataContext from "../store/DataContext";
import ImgError from "../assets/imgs/laptop.jpg"

const CardComp = ({
  title,
  subtitle,
  img,
  phone,
  address,
  cardNumber,
  id,
  liked,
  onDelete,
  onEdit,
  onPhoneNumber,
  onLike,
  onIdClick,
}) => {
const { login } = useContext(LoginContext);
const { filterData } = useContext(DataContext)
  
const handleDeleteClick = () => {
  onDelete(id);
};
const handleEditClick = () => {
  onEdit(id);
};
const handlePhoneNumberClick = () => {
  onPhoneNumber(id, phone);
};
const handleLikeClick = () => {
  onLike(id);
};
const handleClickCard= ()=>{
  onIdClick(id)
}
const handleImagError = (e)=>{
e.target.src = ImgError;
} 
const alwaysIcons = [
  {onClick: handlePhoneNumberClick, children: <LocalPhoneIcon /> },
];
const loggedInIcons = [
  {
    onClick: handleLikeClick,
    children: <FavoriteIcon color={liked ? "error" : "inherit"} />,
  },
];
const logBizIcons = [
  {
    onClick: handleEditClick,
    children: <ModeIcon/>,
  },
  {
    onClick: handleDeleteClick,
    children: <DeleteIcon/>,
  },
];

  return (
    <Card raised>
      <CardActionArea onClick={handleClickCard}>
        <CardMedia
          component="img"
          image={img || ImgError}
          onError={handleImagError}
          alt="image"
          height={200}
        />
      </CardActionArea>
      <CardHeader
        title={title}
        subheader={
          subtitle.length > 20 ? subtitle.slice(0, 20) + "..." : subtitle
        }
      />
      <Divider />
      <CardContent sx={{ paddingBottom: "0 !important" }}>
        <Typography>
          <Typography component="span" fontWeight={700}>
            Phone:
          </Typography>
          {phone}
        </Typography>
        <Typography>
          <Typography component="span" fontWeight={700}>
            Address:
          </Typography>
          {address.city}
        </Typography>
        <Typography>
          <Typography component="span" fontWeight={700}>
            Card number:
          </Typography>
          {cardNumber}
        </Typography>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            {alwaysIcons.map((item, index) => {
              return (
                <IconButton onClick={item.onClick} key={"icon" + index}>
                  {item.children}
                </IconButton>
              );
            })}
            {login.user &&
              loggedInIcons.map((item, index) => {
                return (
                  <IconButton onClick={item.onClick} key={"icon1" + index}>
                    {item.children}
                  </IconButton>
                );
              })}
          </Box>
          <Box>
            {login.user &&
              filterData.filter((card) => card?.user_id.includes(login.user._id)) &&
              logBizIcons.map((item, index) => {
                return (
                  <IconButton onClick={item.onClick} key={"icon2" + index}>
                    {item.children}
                  </IconButton>
                );
              })}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

CardComp.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  img: PropTypes.string,
  phone: PropTypes.string.isRequired,
  address: PropTypes.shape({
    city: PropTypes.string,
    street: PropTypes.string,
    streetNumber: PropTypes.string,
  }),
  cardNumber: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onPhoneNumber: PropTypes.func,
  onLike: PropTypes.func,
  onIdClick: PropTypes.func,
  liked: PropTypes.bool,
}
CardComp.defaultProps = {
  subtitle: "",
  img: "../assets/imgs/laptop.jpg",
  onDelete: () => {},
  onEdit: () => {},
  onPhoneNumber: () => {},
  onLike: () => {},
}

export default memo(CardComp);