import ROUTES from "../../../routes/ROUTES";

const alwaysLinks = [
  { to: ROUTES.HOME, children: "🏡 Home" },
  { to: ROUTES.ABOUT, children: "About" },
];

const loginLinks = [
  { to: ROUTES.FAV_CARDS, children: "My Fav Cards" },
];

const bizLinks = [
  { to: ROUTES.MY_CARDS, children: "My Cards" },
  { to: ROUTES.CREATECARD, children: "Create Card" },
  
];

const adminLinks = [
  { to: ROUTES.EDIT_USER, children: "Edit User" },
  { to: ROUTES.CREATECARD, children: "Create Card" },
];

const logOutLinks = [
  { to: ROUTES.LOGIN, children: "Login" },
  { to: ROUTES.REGISTER, children: "Register" },
];

export { alwaysLinks, loginLinks, bizLinks, logOutLinks, adminLinks };
