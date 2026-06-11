import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Cart,
  Checkout,
  Home,
  Login,
  NotFound,
  OrderConfirm,
  ProductDetail,
  Products,
  SignUp,
  WishList,
} from "./pages";
import { DefaultLayout } from "./components/layout";
import "./App.css";
import CartState from "./context/Cart/CartState";
import ToastState from "./context/Toast/ToastState";
import PopupState from "./context/Popup/PopupState";
import WishListState from "./context/WishList/WishListState";
import SearchState from "./context/Search/SearchState";
import ProductState from "./context/Product/ProductState";
import OrderState from "./context/Order/OrderState";
import AuthState from "./context/Auth/AuthState";
import { AppRoutes } from "./routes";

const App = () => {
  return (
    <AuthState>
      <ProductState>
        <PopupState>
          <ToastState>
            <SearchState>
              <CartState>
                <WishListState>
                  <OrderState>
                    <AppRoutes />
                  </OrderState>
                </WishListState>
              </CartState>
            </SearchState>
          </ToastState>
        </PopupState>
      </ProductState>
    </AuthState>
  );
};

export default App;
