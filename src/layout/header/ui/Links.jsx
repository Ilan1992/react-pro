import {
  alwaysLinks,
  loginLinks,
  bizLinks,
  logOutLinks,
  adminLinks,
} from "./myLinks";
import NavLinkComp from "./NavLinkComp";
import {Box} from "@mui/material"
import { useContext } from "react";
import  LoginContext  from "../../../store/loginContext";

const Links = () => {
  const { login } = useContext(LoginContext);
  
  const loggedIn = login;
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: {
          xs: { xs: "flex", flexDirection: "column" },
          sm: "flex",
          md: "flex",
        },
      }}
    >
      {alwaysLinks.map((item, index) => (
        <NavLinkComp to={item.to} key={"navlink" + index}>
          {item.children}
        </NavLinkComp>
      ))}
      {loggedIn.user &&
        loginLinks.map((item, index) => (
          <NavLinkComp to={item.to} key={"navlink1" + index}>
            {item.children}
          </NavLinkComp>
        ))}
      {loggedIn.user &&
        loggedIn.role === "Business" &&
        bizLinks.map((item, index) => (
          <NavLinkComp to={item.to} key={"navlink2" + index}>
            {item.children}
          </NavLinkComp>
        ))}
      {loggedIn.role === "Normal" &&
        loggedIn.isAdmin &&
        adminLinks.map((item, index) => (
          <NavLinkComp to={item.to} key={"navlink3" + index}>
            {item.children}
          </NavLinkComp>
        ))}
      {loggedIn.role === "" &&
        logOutLinks.map((item, index) => (
          <NavLinkComp to={item.to} key={"navlink4" + index}>
            {item.children}
          </NavLinkComp>
        ))}
    </Box>
  );
}

export default Links;