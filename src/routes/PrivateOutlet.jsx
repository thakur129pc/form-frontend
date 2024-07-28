import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateOutlet = () => {
  const isAuthenticated = Cookies.get("accessToken");
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateOutlet;
