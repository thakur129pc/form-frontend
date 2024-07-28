import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import PrivateOutlet from "./PrivateOutlet";
import ProfilePage from "../pages/profile/ProfilePage";
import PublicOutlet from "./PublicOutlet";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <PublicOutlet />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/register",
    element: <PublicOutlet />,
    children: [
      {
        index: true,
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/profile",
    element: <PrivateOutlet />,
    children: [
      {
        index: true,
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;
