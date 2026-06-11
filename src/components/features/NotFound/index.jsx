import React from "react";
import { Logo } from "../../../assets";

const NotFoundDefault = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex items-center justify-center gap-5 flex-col">
        <img src={Logo} alt="not-found-image" className="w-50 h-50" />
        <p className="text-xl">Oops! 404 NOT FOUND</p>
      </div>
    </div>
  );
};

export default NotFoundDefault;
