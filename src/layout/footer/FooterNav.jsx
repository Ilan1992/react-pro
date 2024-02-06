import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const FooterNav = ({ to, children, label }) => {
  return (
    <NavLink to={to} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Typography
          color={isActive ? "text.headerActive" : "text.headerColor"}
          variant="div"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textDecoration: "none",
          }}
        >
          {children}
          <Typography color={"primary"}>{label}</Typography>
        </Typography>
      )}
    </NavLink>
  );
};

export default FooterNav;
