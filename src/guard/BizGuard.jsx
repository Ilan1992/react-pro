import { useContext } from "react";
import { Navigate } from "react-router-dom";
import LoginContext from "../store/loginContext";
import ROUTES from "../routes/ROUTES";

const BizGuard = ({children}) => {
  const { login } = useContext(LoginContext);
  if(login.user && login.role === "Business"){
    return children;
  }else{
    return <Navigate to={ROUTES.LOGIN}/>;
  }
};

export default BizGuard;
