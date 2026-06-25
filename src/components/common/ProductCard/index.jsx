import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProductStatus } from "../../../utils";
import CartContext from "../../../context/Cart/CartContext";
import ToastContext from "../../../context/Toast/ToastContext";
import { WishListContext } from "../../../context/WishList/WishListContext";
import { CheckIcon, HeartIcon, HeartOutlinedIcon } from "../../../assets";
import { useAuthAction } from "../../../hooks";

const ProductCard = ({ product, status }) => {
  const { addToCart, cartData } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);
  const { wishListData, addToWishList, deleteWishListProduct } =
    useContext(WishListContext);
  const requireAuth = useAuthAction()
  const navigate = useNavigate();

  const addToCartHandler = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    requireAuth(()=>{
    const status = getProductStatus(product, cartData, wishListData);
    if (status === "inCart") {
      addToCart(product);
      showToast("Item updated in cart successfully", CheckIcon);
      return;
    }
    if (status === "inWishList") {
      addToCart(product);
      deleteWishListProduct(product);
      showToast("Item moved to cart successfully", CheckIcon);
      return;
    }
    addToCart(product);
    showToast("Item added to cart successfully", CheckIcon);
  })
  };

  const addToWishListHandler = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    requireAuth(()=>{
    const status = getProductStatus(product, cartData, wishListData);
    if (status === "inCart") {
      showToast("Item already exists in cart", CheckIcon);
      return;
    }
    if (status === "inWishList") {
      addToWishList(product);
      showToast("Item updated in wishlist", CheckIcon);
      return;
    }
    addToWishList(product);
    showToast("Item added to wishlist successfully", CheckIcon);
  })
  };
  return (
    <div
      className="relative bg-white rounded-xl p-4 shadow cursor-pointer z-10 grid"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <img
        src={product.image}
        alt="product-image"
        className="h-48 sm:h-60 md:h-72 mx-auto object-contain"
      />
      <div className="grid grid-cols-[3fr_1fr] gap-2 items-start">
        <h1 className="font-semibold mt-2 line-clamp-2 text-[15px]">
          {product.title}
        </h1>
        <p className="font-bold mt-2 bg-gray-300 flex items-center justify-center rounded-lg min-h-7 px-2">
          Rs. {product.price}
        </p>
      </div>
      <button
        type="button"
        className="mt-3 bg-black text-white px-3 py-1 rounded-lg w-full min-h-8 cursor-pointer hover:bg-gray-700"
        onClick={(e) => addToCartHandler(e, product)}
      >
        Add to Cart
      </button>
      <button
        className="rounded-full p-2 border-2 absolute z-20 top-2 right-2 cursor-pointer"
        type="button"
        onClick={(e) => addToWishListHandler(e, product)}
      >
        {status === "inWishList" ? (
          <HeartIcon className="w-6 h-6 text-red-500" />
        ) : (
          <HeartOutlinedIcon className="w-6 h-6 " />
        )}
      </button>
    </div>
  );
};

export default ProductCard;
