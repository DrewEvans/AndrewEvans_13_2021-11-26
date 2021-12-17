import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const useAuth = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return isLoggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to='/Login' />;
};

export default ProtectedRoutes;
