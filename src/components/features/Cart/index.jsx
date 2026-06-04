import React, { useContext, useEffect, useMemo } from "react";
import CartContext from "../../../context/Cart/CartContext";
import { useNavigate } from "react-router-dom";
import PopupContext from "../../../context/Popup/PopupContext";

const CartDefault = () => {
  
  const {
    cartData,
    increaseQuantity,
    decreaseQuantity,
    deleteProduct,
    clearCart,
    totalItems,
  } = useContext(CartContext);
  const { showPopup } = useContext(PopupContext);
  const navigate = useNavigate();

  const totalCartPrice = useMemo(() => {
    return cartData.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }, [cartData]);

  const shipping = totalCartPrice > 0 ? 50 : 0;

  const grandTotal = useMemo(() => {
    return totalCartPrice + shipping;
  }, [totalCartPrice, shipping]);

  return (
    <div className="lg:px-32 py-7 overflow-x-hidden max-w-full flex flex-col justify-between h-full">
      <table className="w-full table-auto">
        <thead className="hidden md:table-header-group">
          <tr className="bg-black text-white text-lg">
            <th className="p-[15px] text-left">Product Details</th>
            <th className="p-[15px] text-left">Quantity</th>
            <th className="p-[15px] text-left hidden md:table-cell">Price</th>
            <th className="p-[15px] text-left">SubTotal</th>
            <th className="p-[15px] text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartData.length === 0 && (
            <tr>
              <td className="text-center text-lg h-[60vh]" colSpan="5">
                You have no items in your shopping cart.
                <br />
                Click{" "}
                <span
                  onClick={() => navigate("/products")}
                  className="underline cursor-pointer"
                >
                  here
                </span>{" "}
                to continue shopping.
              </td>
            </tr>
          )}
          {cartData.map((item) => (
            <tr
              className="text-lg border-b-2 last:border-b-0 max-w-full"
              key={item.id}
            >
              {/* MOBILE SINGLE TD */}
              <td className="table-cell md:hidden py-4">
                <div className="flex gap-2 px-4 w-full overflow-hidden">
                  {/* left side */}

                  <img
                    src={item.image}
                    alt="product-image"
                    className="w-20 h-20 object-contain "
                  />

                  {/* right side */}
                  <div className="min-w-0 flex-1 flex flex-col gap-4 px-2">
                    <div className="flex items-center">
                      <div className="">
                        <h1 className="line-clamp-2 font-semibold">
                          {item?.title}
                        </h1>
                        <p>Rs. {item?.price}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <form className="flex items-center gap-5">
                        <button
                          className="cursor-pointer bg-[#ffae00]  px-2 rounded"
                          onClick={(e) => {
                            e.preventDefault();
                            increaseQuantity(item);
                            console.log(item,"item")
                          }}
                        >
                          +
                        </button>
                        <div>{item.quantity}</div>
                        <button
                          className="cursor-pointer bg-[#ffae00] px-2 rounded"
                          onClick={(e) => {
                            e.preventDefault();
                            decreaseQuantity(item);
                          }}
                        >
                          -
                        </button>
                      </form>
                      <p>Rs. {item?.price * item?.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <button
                      className="text-red-500 font-semibold px-4 py-2 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteProduct(item);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </td>

              {/* DESKTOP TDS */}
              <td className="hidden md:table-cell p-[15px]">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt="product-image"
                    className="w-20 h-20 object-contain"
                  />
                  <span className="line-clamp-2">{item?.title}</span>
                </div>
              </td>
              <td className="hidden md:table-cell p-[15px]">
                <div className="flex items-center gap-5">
                  <button
                    className="cursor-pointer bg-[#ffae00] py-2 px-4 rounded"
                    onClick={(e) => {
                      e.preventDefault();
                      increaseQuantity(item);
                    }}
                  >
                    +
                  </button>
                  <div>{item.quantity}</div>
                  <button
                    className="cursor-pointer bg-[#ffae00] py-2 px-4 rounded"
                    onClick={(e) => {
                      e.preventDefault();
                      decreaseQuantity(item);
                    }}
                  >
                    -
                  </button>
                </div>
              </td>
              <td className="hidden md:table-cell p-[15px]">
                Rs. {item?.price}
              </td>
              <td className="hidden md:table-cell p-[15px]">
                Rs. {item?.price * item?.quantity}
              </td>
              <td className="hidden md:table-cell p-[15px]">
                <button
                  className="text-red-500 font-semibold px-4 py-2 cursor-pointer"
                  onClick={() => {
                    deleteProduct(item);
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {cartData.length > 0 && (
        <div className="px-4 py-5 bg-gray-300 flex justify-between flex-col rounded-lg h-[200px]">
          <div>
            <div className="flex gap-2 text-lg justify-between items-center">
              <h1 className="font-medium">Total Items:</h1>
              <p>{totalItems}</p>
            </div>
            <div className="flex gap-2 text-lg justify-between items-center">
              <h1 className="font-medium">Subtotal:</h1>
              <p>Rs. {totalCartPrice.toFixed(2)}</p>
            </div>
            <div className="flex gap-2 text-lg justify-between items-center">
              <h1 className="font-medium">Shipping:</h1>
              <p>Rs. 50</p>
            </div>
          </div>
          <div className="text-lg">
            <div className="flex gap-2 justify-between items-center">
              <h1 className="font-bold">Grand Total:</h1>
              <p>Rs. {grandTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between pb-5 pt-2">
              <button
                type="button"
                className="bg-red-500 hover:bg-red-600 px-2 py-2 text-white rounded-xl font-semibold cursor-pointer"
                onClick={() =>
                  showPopup(
                    "Are you sure you want to delete all items from cart?",
                    ()=>clearCart(),
                  )
                }
              >
                Clear Cart
              </button>
              <button
                type="button"
                className="bg-[#ffae00] hover:bg-[#e7a005] px-2 py-2 text-white rounded-xl font-semibold cursor-pointer"
                onClick={()=>navigate('/checkout')}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDefault;
