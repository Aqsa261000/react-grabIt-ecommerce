import React, { useContext } from "react";
import AuthContext from "../context/Auth/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "../components/common";

const RequireAuth = () => {
  // it helps user to not access the protected(login neccessary) pages so it will be taken to home when he tries to enter that
  const { token, loading } = useContext(AuthContext);
  if (loading)
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default RequireAuth;
