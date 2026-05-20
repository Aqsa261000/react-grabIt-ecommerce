import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Cart,
  Checkout,
  Home,
  NotFound,
  OrderConfirm,
  ProductDetail,
  Products,
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

const App = () => {
  return (
    <ProductState>
      <PopupState>
        <ToastState>
          <SearchState>
            <CartState>
              <WishListState>
                <OrderState>
                  <Routes>
                    <Route element={<DefaultLayout />}>
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/wishList" element={<WishList />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/order-confirm" element={<OrderConfirm />} />
                      <Route path="*" element={<NotFound />} />
                    </Route>
                  </Routes>
                </OrderState>
              </WishListState>
            </CartState>
          </SearchState>
        </ToastState>
      </PopupState>
    </ProductState>
  );
};

export default App;
