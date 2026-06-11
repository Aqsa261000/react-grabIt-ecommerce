import React from "react";
import { Footer, Navbar } from "../../common";
import { Outlet, useLocation } from "react-router-dom";
import AuthContext from "../../../context/Auth/AuthContext";

const DefaultLayout = () => {
  const location = useLocation();
  const shouldHideFooter = ["/login", "/signup"].includes(location.pathname);
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default DefaultLayout;
