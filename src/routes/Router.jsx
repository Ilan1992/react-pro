import ROUTES from "./ROUTES";
import {useRoutes} from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
import AboutUsPage from "../pages/AboutUs/AboutUsPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import CardShow from "../components/CardShow";
import EditCard from "../pages/EditCard/EditCard";
import CreateCard from "../pages/CreateCard/CreateCard";
import ProfilePage from "../pages/UserProfile/ProfilePage";
import MyCards from "../pages/MyCards/MyCards";
import MyFavCards from "../pages/MyFavCards/MyFavCards";
import BizGuard from "../guard/BizGuard"
import AuthGuard from "../guard/AuthGuard";


const Router = () => {
let routses = useRoutes([
  { path: ROUTES.HOME, element: <HomePage /> },
  { path: ROUTES.ABOUT, element: <AboutUsPage /> },
  { path: ROUTES.REGISTER, element: <RegisterPage /> },
  { path: ROUTES.LOGIN, element: <LoginPage /> },
  {
    path: `${ROUTES.EDITCARD}/:id`,
    element: (
      <BizGuard>
        <EditCard />
      </BizGuard>
    ),
  },
  {
    path: ROUTES.CREATECARD,
    element: (
      <BizGuard>
        <CreateCard />
      </BizGuard>
    ),
  },
  {
    path: ROUTES.USER_PROFILE,
    element: (
      <AuthGuard>
        <ProfilePage />
      </AuthGuard>
    ),
  },
  {
    path: ROUTES.MY_CARDS,
    element: (
      <BizGuard>
        <MyCards />
      </BizGuard>
    ),
  },
  {
    path: ROUTES.FAV_CARDS,
    element: (
      <AuthGuard>
        <MyFavCards />
      </AuthGuard>
    ),
  },
  { path: `${ROUTES.VIEWCARD}/:id`, element: <CardShow /> },
  { path: "*", element: <ErrorPage /> },
]);
  return routses;
}

export default Router