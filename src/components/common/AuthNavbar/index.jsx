import React, { useContext, useEffect, useState } from "react";
import { CartIcon, HeartIcon, Logo, MenuIcon } from "../../../assets";
import { NavLink, useNavigate } from "react-router-dom";
import CartContext from "../../../context/Cart/CartContext";
import { WishListContext } from "../../../context/WishList/WishListContext";
import SearchContext from "../../../context/Search/SearchContext";

const AuthNavbar = () => {
  const navigate = useNavigate();
  return (
      <nav className="w-full relative">
        <div className="flex justify-between gap-5 h-22 items-center px-5">
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={Logo} alt="logo" className="w-10 h-10" />
            <h1 className="text-3xl font-bold flex items-center gap-1">
              <span className="font-playwrite text-xl ">Grab</span>It
            </h1>
          </div>
          <ul className="flex items-center gap-5 text-lg cursor-pointer font-medium">
            <NavLink to={"/login"} className="text-lg font-semibold bg-[#ffae00] text-white px-4 py-2 rounded-xl hover:bg-[#e59d00]">
              Login
            </NavLink>
            <NavLink to={"/signup"}>
              Sign Up
            </NavLink>
          </ul>
        </div>
      </nav>
  );
};

export default AuthNavbar;
