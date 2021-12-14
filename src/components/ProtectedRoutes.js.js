import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import Login from "./Login";

const useAuth = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return isLoggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to='/Login' />;
};

export default ProtectedRoutes;
