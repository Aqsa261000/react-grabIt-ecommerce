import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/Auth/AuthContext";
import { Spinner } from "../components/common";

const RedirectIfAuth = () => {
  // this prevents user to got to login and signup pages if he is logged in already
  const { token, loading } = useContext(AuthContext);

  if (loading)
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );

  return token ? <Navigate to="/" replace /> : <Outlet />;
};

export default RedirectIfAuth;
