import { Route, Routes } from "react-router-dom";
import { AuthLayout, DefaultLayout } from "../components/layout";
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

const AppRoutes = () => {
  return (
    <Routes>
      {/* protected app */}
      <Route element={<RequireAuth />}>
        <Route element={<DefaultLayout />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishList" element={<WishList />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirm" element={<OrderConfirm />} />
        </Route>
      </Route>

      {/* auth only */}
      <Route element={<AuthLayout />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* public app */}
      <Route>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
