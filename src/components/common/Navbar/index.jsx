import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CartIcon, HeartIcon, Logo, MenuIcon } from "../../../assets";
import AuthContext from "../../../context/Auth/AuthContext";
import CartContext from "../../../context/Cart/CartContext";
import { WishListContext } from "../../../context/WishList/WishListContext";
import SearchContext from "../../../context/Search/SearchContext";

const navClass = ({ isActive }) =>
  `relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#ffae00] after:transition-all after:duration-300 ${
    isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
  }`;

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { token, user, logout } = useContext(AuthContext);
  const { cartData } = useContext(CartContext);
  const { wishListData } = useContext(WishListContext);
  const { search, setSearch } = useContext(SearchContext);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) navigate("/products");
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  const initials = user?.fullName
    .split(" ") // Splits into ["John", "Smith", "Doe"]
    .map((word) => word[0]) // Takes the first letter: ["J", "S", "D"]
    .join("") // Joins them back together: "JSD"
    .toUpperCase();

  return (
    <nav className="w-full relative">
      <div className="flex justify-between md:flex-col md:gap-5 md:justify-center md:h-40 lg:h-22 lg:gap-0 lg:flex-row lg:justify-around items-center h-22 px-5">
        {/* Logo */}
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="logo" className="w-10 h-10" />
          <h1 className="text-3xl font-bold flex items-center gap-1">
            <span className="font-playwrite text-xl">Grab</span>It
          </h1>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-5 text-lg cursor-pointer font-medium">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={navClass}>
            Products
          </NavLink>

          {/* Search */}
          <form onSubmit={handleSearchSubmit}>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search Products"
                className="py-4 px-4 bg-gray-200 rounded-l-xl outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="cursor-pointer bg-black py-4 px-4 text-white rounded-r-xl"
                type="submit"
              >
                Search
              </button>
            </div>
          </form>

          {token ? (
            /* ── Logged in ── */
            <>
              <NavLink to="/cart" className={navClass}>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <CartIcon className="w-7 h-7" />
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white rounded-full bottom-[12px] left-[12px] bg-red-500">
                      {cartData.length}
                    </div>
                  </div>
                  <span className="text-lg">My Cart</span>
                </div>
              </NavLink>

              <NavLink to="/wishlist" className={navClass}>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <HeartIcon className="w-7 h-7" />
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white rounded-full bottom-[12px] left-[12px] bg-red-500">
                      {wishListData.length}
                    </div>
                  </div>
                  <span className="text-lg">Wishlist</span>
                </div>
              </NavLink>

              {/* User greeting + logout */}
              <div className="flex items-center gap-3 bg-gray-300 px-4 py-2 rounded-xl cursor-auto">
                <div className="h-7 w-7 border-2 bg-[#ffae00] p-5 rounded-full flex items-center justify-center">
                  <p>{initials}</p>
                </div>
                <button
                  className="text-lg font-semibold bg-[#ffae00] text-black px-4 py-2 rounded-xl hover:bg-[#e59d00] cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            /* ── Guest ── */
            <>
              <NavLink
                to="/login"
                className="text-lg font-semibold bg-[#ffae00] text-white px-4 py-2 rounded-xl hover:bg-[#e59d00]"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="text-lg font-semibold border-2 border-black px-4 py-2 rounded-xl hover:bg-gray-100"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </ul>

        {/* Mobile menu toggle */}
        <div className="cursor-pointer md:hidden">
          <MenuIcon className="w-10" onClick={() => setOpen(!open)} />
        </div>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`w-[180px] bg-white fixed z-40 right-0 top-0 rounded-l-2xl transition-transform duration-300 md:hidden p-5 flex flex-col gap-4 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {token && (
          <div className="flex items-center justify-center gap-3 bg-gray-300 rounded-xl py-2 ">
            <div className="h-7 w-7 border-2 bg-[#ffae00] p-5 rounded-full flex items-center justify-center text-[15px]">
              <p>{initials}</p>
            </div>
            <button
              className="text-lg font-semibold bg-[#ffae00] text-black rounded-xl py-2 px-2 hover:bg-[#e59d00] text-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
        <NavLink to="/" className={navClass} onClick={() => setOpen(false)}>
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={navClass}
          onClick={() => setOpen(false)}
        >
          Products
        </NavLink>

        {token ? (
          <>
            <NavLink
              to="/cart"
              className={navClass}
              onClick={() => setOpen(false)}
            >
              My Cart ({cartData.length})
            </NavLink>
            <NavLink
              to="/wishlist"
              className={navClass}
              onClick={() => setOpen(false)}
            >
              Wishlist ({wishListData.length})
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
              className="font-semibold bg-[#ffae00] text-white px-4 py-2 rounded-xl text-center"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              onClick={() => setOpen(false)}
              className="font-semibold border-2 border-black px-4 py-2 rounded-xl text-center"
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
