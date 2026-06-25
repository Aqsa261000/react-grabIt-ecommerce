import React, { useContext, useEffect, useMemo, useState } from "react";
import CartContext from "./CartContext";
import PopupContext from "../Popup/PopupContext";
import { WishListContext } from "../WishList/WishListContext";
import {
  createCartItem,
  deleteCartItem,
  fetchCart,
  updateCartItem,
} from "../../services/cartService";
import AuthContext from "../Auth/AuthContext";

const CartState = (props) => {
  const { user } = useContext(AuthContext);
  const [cartData, setCartData] = useState([]);

  const totalItems = useMemo(() => {
    return cartData.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartData]);

  const addToCart = async (selectedProduct, quantity = 1) => {
    
    let status = "";
    const existingItemInCart = cartData.find(
      (cartItem) => cartItem.productId === selectedProduct.id,
    );

    if (existingItemInCart) {
      status = "inCart";
      const updateItem = await updateCartItem(existingItemInCart.id, {
        ...existingItemInCart,
        quantity: existingItemInCart.quantity + quantity,
      });
      setCartData((prevData) =>
        prevData.map((cartItem) =>
          cartItem.id === existingItemInCart.id ? updateItem : cartItem,
        ),
      );
      return;
    }

    const newItem = {
      ...selectedProduct,
      quantity,
      productId: selectedProduct.id,
      userId: user.id,
    };
    const addItem = await createCartItem(newItem);

    setCartData((prevData) => [...prevData, addItem]);

    return status;
  };

  const clearCart = async () => {
    for (let i = 0; i < cartData.length; i++) {
      const chunk = cartData.slice(i, i + 20);

      await Promise.all(chunk.map((item) => deleteCartItem(item.id)));
    }
    setCartData([]);
  };

  const increaseQuantity = async (selectedProduct) => {
    const incQuantity = await updateCartItem(selectedProduct.id, {
      ...selectedProduct,
      quantity: selectedProduct.quantity + 1,
    });
    setCartData((prevCart) => {
      return prevCart.map((item) =>
        item.id === selectedProduct.id ? incQuantity : item,
      );
    });
  };

  const decreaseQuantity = async (selectedProduct) => {
    if (selectedProduct.quantity > 1) {
      const decQuantity = await updateCartItem(selectedProduct.id, {
        ...selectedProduct,
        quantity: selectedProduct.quantity - 1,
      });
      setCartData((prevCart) => {
        return prevCart
          .map((item) => (item.id === selectedProduct.id ? decQuantity : item))
          .filter((item) => item.quantity > 0);
      });
    } else {
      deleteCartItem(selectedProduct.id);
      setCartData((prevData) =>
        prevData.filter((item) => item.id !== selectedProduct.id),
      );
    }
  };

  const deleteProduct = (selectedProduct) => {
    deleteCartItem(selectedProduct.id);
    setCartData((prevData) =>
      prevData.filter((item) => item.id !== selectedProduct.id),
    );
  };

  useEffect(() => {
    const getData = async () => {
      try {
        if (!user) return;
        const data = await fetchCart(user.id);
        setCartData(data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [user]);

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
