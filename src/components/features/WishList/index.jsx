import React, { useContext } from "react";
import { WishListContext } from "../../../context/WishList/WishListContext";
import CartContext from "../../../context/Cart/CartContext";
import ToastContext from "../../../context/Toast/ToastContext";
import { CheckIcon, CrossIcon } from "../../../assets";
import { useNavigate } from "react-router-dom";
import { getProductStatus } from "../../../utils";

const WishListDefault = () => {
  const { cartData } = useContext(CartContext);
  const { wishListData, deleteWishListProduct, wishListAddToCart } =
    useContext(WishListContext);
  const { showToast, toasts } = useContext(ToastContext);
  const navigate = useNavigate();

  const addToCartHandler = (e, product) => {
    e.stopPropagation();
    const status = getProductStatus(product, cartData, wishListData);

    if (status === "inCart") {
      showToast("Item already exists in cart", CheckIcon);
      return;
    }
    
    wishListAddToCart(product);
    showToast("Item moved to cart successfully", CheckIcon);
    
  };
  return (
    <div className="px-4 lg:px-32 py-7 max-w-full h-full">
      {wishListData.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-lg">
            You have no items in your wish list.
            <br />
            Click{" "}
            <span
              onClick={() => navigate("/products")}
              className="underline cursor-pointer"
            >
              here
            </span>{" "}
            to continue shopping.
          </div>
        </div>
      )}
      {wishListData.length > 0 && (
        <h1 className="font-bold text-2xl pb-5">Wishlist</h1>
      )}
      {wishListData.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-[auto] grid-rows-3 sm:grid-cols-[auto_2fr_1fr_auto] sm:grid-rows-none w-full sm:gap-4 justify-center items-center border-b-2 last:border-b-0 py-5 width:max-content"
        >
          <div className="text-center">
            <button
              className="font-bold text-lg cursor-pointer"
              onClick={() => deleteWishListProduct(item)}
            >
              <CrossIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="grid sm:grid-cols-[auto_1fr] grid-cols-[auto_200px] gap-5">
            <div className="flex items-center justify-center">
              <img
                src={item.image}
                alt="product-image"
                className="w-20 h-20 object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold line-clamp-2">
                {item.title}
              </h1>
              <p className=" text-lg">
                <span className="font-semibold">Quantity:</span>{" "}
                {item?.quantity}
              </p>
            </div>
          </div>
          <h1 className="text-lg text-center">
            Rs. {item?.price * item?.quantity}
          </h1>
          <div className="flex items-center justify-center">
            <button
              type="button"
              className="mt-3 bg-black text-white px-3 py-2 rounded-lg min-h-8 cursor-pointer hover:bg-gray-700 disabled:cursor-not-allowed text-lg"
              onClick={(e) => addToCartHandler(e, item)}
              disabled={toasts.length > 0 ? true : false}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishListDefault;
