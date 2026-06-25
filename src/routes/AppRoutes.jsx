import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "../components/layout";
import {
  SignUp,
  Cart,
  Checkout,
  Home,
  Login,
  NotFound,
  OrderConfirm,
  Products,
  WishList,
  ProductDetail,
} from "../pages";
import RequireAuth from "./RequireAuth";
import RedirectIfAuth from "./RedirectIfAuth";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Protected — must be logged in */}
      <Route element={<RequireAuth />}>
        <Route element={<DefaultLayout />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirm" element={<OrderConfirm />} />
        </Route>
      </Route>

      {/* Guests only */}
      <Route element={<RedirectIfAuth />}>
        <Route element={<DefaultLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Route>

      {/* Public */}
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      {/* ── 404 ─────────────────────────────── */}
      <Route path="*" element={<NotFound />} />
      </Route>

    </Routes>
  );
};

export default AppRoutes;
