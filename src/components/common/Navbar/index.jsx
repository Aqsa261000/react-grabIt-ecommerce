import React, { useContext, useEffect, useState } from "react";
import { CartIcon, HeartIcon, Logo, MenuIcon } from "../../../assets";
import { NavLink, useNavigate } from "react-router-dom";
import CartContext from "../../../context/Cart/CartContext";
import { WishListContext } from "../../../context/WishList/WishListContext";
import SearchContext from "../../../context/Search/SearchContext";

const navClass = ({ isActive }) =>
  `relative pb-1 after:content-[''] border-transparent after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#ffae00] after:transition-all after:duration-300 ${
    isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
  }`;
const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { cartData } = useContext(CartContext);
  const { search, setSearch } = useContext(SearchContext);
  const { wishListData } = useContext(WishListContext);

  const onChangeHandler = (value) => {
    setSearch(value);
  };

  const handleSearchClick = () => {
    const query = search.trim();
    if (!query) return;
    navigate("/products");
  };

  return (
    <>
      <nav className="w-full relative">
        <div className="flex justify-between md:flex-col md:gap-5 md:justify-center md:h-40 lg:h-22 lg:gap-0 lg:flex-row  lg:justify-around items-center h-22 px-5">
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={Logo} alt="logo" className="w-10 h-10" />
            <h1 className="text-3xl font-bold flex items-center gap-1">
              <span className="font-playwrite text-xl ">Grab</span>It
            </h1>
          </div>
          <ul className="hidden md:flex items-center gap-5 text-lg cursor-pointer font-medium">
            <NavLink to={"/"} className={navClass}>
              Home
            </NavLink>
            <NavLink to={"/products"} className={navClass}>
              Products
            </NavLink>
            <NavLink to={"/cart"} className={navClass}>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <CartIcon className="w-7 h-7" />
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-danger border-2 border-buffer rounded-full bottom-[12px] left-[12px] bg-red-500">
                    {cartData.length}
                  </div>
                </div>
                <span className="flex gap-2 items-center text-lg">My Cart</span>
              </div>
            </NavLink>
            <NavLink to={"/wishlist"} className={navClass}>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <HeartIcon className="w-7 h-7" />
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-danger border-2 border-buffer rounded-full bottom-[12px] left-[12px] bg-red-500">
                    {wishListData.length}
                  </div>
                </div>
                <span className="flex gap-2 items-center text-lg">
                  Wishlist
                </span>
              </div>
            </NavLink>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearchClick();
              }}
            >
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search Products"
                  className="py-4 px-4 bg-gray-200 rounded-l-xl outline-none"
                  name="search"
                  id="search"
                  value={search}
                  onChange={(e) => onChangeHandler(e.target.value)}
                />
                <button
                  className="cursor-pointer bg-black py-4 px-4 text-white rounded-r-xl"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </form>
            {/* <button
              type="button"
              className=" text-black hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium font-medium leading-5 rounded-lg text-sm p-3 focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img src={CartIcon} alt="logo" className="w-7 h-7" />
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-danger border-2 border-buffer rounded-full bottom-[12px] bg-red-500">
                    {cartData.length}
                  </div>
                </div>
                <NavLink to={"/cart"} className={navClass}>
                  <span className="flex gap-2 items-center text-lg">My Cart</span>
                </NavLink>
              </div>
              <span className="sr-only">My Cart</span>
            </button> */}
          </ul>
          <div className="cursor-pointer md:hidden">
            <MenuIcon className="w-10" onClick={() => setOpen(!open)} />
          </div>
        </div>

        {open && (
          <>
            <div
              className="fixed inset-0 bg-black/30 z-30 md:hidden"
              onClick={() => setOpen(false)}
            ></div>
          </>
        )}

        <div
          className={`w-[150px] h-[200px] bg-white fixed z-40 right-0 rounded-l-2xl transition-transform duration-300 md:hidden p-5 ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <ul className="flex flex-col md:hidden cursor-pointer font-medium gap-2 justify-between h-full text-md">
            <div className="flex flex-col justify-center gap-2 w-min">
              <NavLink to={"/"} className={navClass}>
                Home
              </NavLink>
              <NavLink to={"/products"} className={navClass}>
                Products
              </NavLink>
            </div>
            <NavLink to={"/cart"} className={navClass}>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <CartIcon className="w-5 h-5" />
                  <div className="absolute inline-flex items-center justify-center w-5 h-5 text-sm font-bold text-white bg-danger border-2 border-buffer rounded-full bottom-[12px] left-[12px] bg-red-500 text-sm">
                    {cartData.length}
                  </div>
                </div>
                <span className="flex gap-2 items-center text-md">My Cart</span>
              </div>
            </NavLink>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
