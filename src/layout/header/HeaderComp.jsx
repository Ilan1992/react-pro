import { useState,useContext } from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Switch,
} from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import imgOfLogo from "../../assets/imgs/LoGO.png";
import Links from "./ui/Links";
import SearchComp from "./ui/SearchComp";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import LoginContext from "../../store/loginContext";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const HeaderComp = ({ isDarkMode, onDarkModeChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const openMenu = Boolean(anchorElMenu);
  const navigate = useNavigate()
  const { login } = useContext(LoginContext);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    
  };
  const handleClick = (event) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleTo = () =>{
    navigate(ROUTES.USER_PROFILE)
  }

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElMenu(null);
  };
  const handleLogout = ()=>{
    localStorage.removeItem("token")
    navigate(ROUTES.HOME)
    window.location.reload();
  }

  const handleThemeChange = (e) => {
    onDarkModeChange(e.target.checked);
  };
  return (
    <Box sx={{}}>
      <AppBar position="fixed" color="primary">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "initial", md: "initial" } }}
          >
            <img src={imgOfLogo} alt="logo" width={120} />
          </Typography>
          <div>
            <IconButton
              id="basic-button"
              aria-controls={openMenu ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              onClick={handleClick}
              sx={{ display: { xs: "initial", sm: "initial", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorElMenu}
              open={openMenu}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={handleClose}
                style={{ backgroundColor: "cadetblue" }}
              >
                <Links />
              </MenuItem>
            </Menu>
          </div>
          <Box sx={{ display: { xs: "none", sm: "none", md: "initial" } }}>
            <Links />
          </Box>
          <SearchComp />
          <Box
            sx={{
              my: 2,
              p: 1,
            }}
          >
            <Typography sx={{ display: { xs: "none", md: "inline" } }}>
              {isDarkMode ? "Dark" : "Light"} Mode
            </Typography>
            <Switch checked={isDarkMode} onChange={handleThemeChange} />
          </Box>
          {login.user && (
            <>
              <Box>
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                    sx={{
                      display: "flex",
                      width: "100%",
                      alignItems: "flex-end",
                    }}
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    onClick={handleTo}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                  </Menu>
                </div>
              </Box>
              <IconButton title="LogOut" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderComp;
