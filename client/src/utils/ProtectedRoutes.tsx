import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const PrivateRoute: React.FC = () => {
  const userData = useSelector((state: RootState) => state.auth.userData);

  if (!userData) {
    return <Navigate to="/signin" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
