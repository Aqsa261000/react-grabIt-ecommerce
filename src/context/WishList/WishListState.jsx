import React, { useContext, useEffect, useState } from "react";
import { WishListContext } from "./WishListContext";
import CartContext from "../Cart/CartContext";
import { CheckIcon } from "../../assets";

const WishListState = (props) => {
  const { cartData, addToCart } = useContext(CartContext);
  const [wishListData, setWishListData] = useState(() => {
    const data = localStorage.getItem("wishlist");
    try {
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  const addToWishList = (item) => {
    let status = "";
    // setWishListData((prevData) => [...prevData, item]);
    setWishListData((prevData) => {
      const existingIteminCart = cartData.find((p) => p.id === item.id);
      if (existingIteminCart) {
        status = "inCart";
        return prevData;
      } else {
        const existingIteminWishList = prevData.find(
          (product) => product.id === item.id,
        );
        if (existingIteminWishList) {
          status = "updated";
          return prevData.map((p) =>
            p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p,
          );
        }
        status = "added";
        // showToast("Item added to wishlist successfully",CheckIcon)
        return [...prevData, { ...item, quantity: 1 }];
      }

      // add to wishlist by checking first that product is added in cart? is yes then DONT ADD IN WISHLIST GIVE MESSAGE "product already is in cart"
      // else add kar do
    });
    return status;
  };

  const deleteWishListProduct = (item) => {
    setWishListData((prevData) => prevData.filter((p) => p.id !== item.id));
  };

  const wishListAddToCart = (item) => {
    let status = "";
    const existingItem = cartData.find((p) => p.id === item.id);
    if (existingItem) {
      status = "inCart";
    } else {
      status = "moved";
      addToCart(item);
      deleteWishListProduct(item);
    }
    return status;
  };

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishListData));
  }, [wishListData]);

  useEffect(() => {
    const handleStorageChange = () => {
      const data = localStorage.getItem("wishlist");
      setWishListData(data ? JSON.parse(data) : []);
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <WishListContext.Provider
      value={{
        addToWishList,
        wishListData,
        deleteWishListProduct,
        wishListAddToCart,
      }}
    >
      {props.children}
    </WishListContext.Provider>
  );
};

export default WishListState;
