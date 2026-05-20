import React, { useEffect, useMemo, useState } from "react";
import CartContext from "./CartContext";
import PopupContext from "../Popup/PopupContext";
import { WishListContext } from "../WishList/WishListContext";

const CartState = (props) => {
  const [cartData, setCartData] = useState(() => {
    const data = localStorage.getItem("cart");
    try {
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  const totalItems = useMemo(() => {
    return cartData.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartData]);

  const addToCart = (selectedProduct, quantity = 1) => {
    let status = "";
    setCartData((prevData) => {
      //firstly we will find that the same cart item we want to add is present in the cart or not
      const existingItemInCart = prevData.find(
        (cartProduct) => cartProduct.id === selectedProduct.id,
      );
      // agar same item cart mein already parhi wi hai toh prevData par map lagaa kar ussi item ki quantity increase kar do by 1 warna aise hi rehne do
      if (existingItemInCart) {
        status = "inCart";
        //map function only updates the item of an array by the given condition by checking all the items
        return prevData.map((cartProduct) =>
          cartProduct.id === selectedProduct.id
            ? { ...cartProduct, quantity: cartProduct.quantity + quantity }
            : cartProduct,
        );
      }
      status = "added";
      return [...prevData, { ...selectedProduct, quantity }];
    });
    return status;
  };

  const clearCart = () => {
    setCartData([]);
  };

  const increaseQuantity = (selectedProduct) => {
    setCartData((prevCart) => {
      return prevCart.map((item) =>
        item.id === selectedProduct.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    });
  };

  const decreaseQuantity = (selectedProduct) => {
    setCartData((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === selectedProduct.id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const deleteProduct = (selectedProduct) => {
    setCartData((prevData) =>
      prevData.filter((item) => item.id !== selectedProduct.id),
    );
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartData));
  }, [cartData]);

  useEffect(() => {
    const handleStorageChange = () => {
      const data = localStorage.getItem("cart");
      setCartData(data ? JSON.parse(data) : []);
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartData,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        deleteProduct,
        clearCart,
        totalItems,
        setCartData,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
