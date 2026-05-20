import React, { useContext, useMemo, useState } from "react";
import { CustomInput } from "../../common";
import { useNavigate } from "react-router-dom";
import CartContext from "../../../context/Cart/CartContext";
import OrderContext from "../../../context/Order/OrderContext";

const CheckoutDefault = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
    phoneNumber: "",
    emailAddress: "",
    paymentMethod: "",
  });
  const [errors,setErrors]=useState({})
  const { cartData, clearCart } = useContext(CartContext);
  const { createOrder } = useContext(OrderContext);
  const navigate = useNavigate();
  const shipping = 50;

  const onChangeHandler = (e) => {
    const {name,value}=e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors)=>({...prevErrors,[name]:""}))
  };

  const totalCartPrice = useMemo(() => {
    return cartData.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }, [cartData]);

  const grandTotal = useMemo(() => {
    return totalCartPrice + shipping;
  }, [totalCartPrice, shipping]);

  const validateForm = () => {
  const newErrors = {};

  if (!formData.fullName.trim()) {
    newErrors.fullName = "Full name is required";
  }

  if (!formData.country.trim()) {
    newErrors.country = "Country is required";
  }

  if (!formData.city.trim()) {
    newErrors.city = "City is required";
  }

  if (!formData.address.trim()) {
    newErrors.address = "Address is required";
  }

  if (!formData.postalCode.trim()) {
    newErrors.postalCode = "Postal code is required";
  }

  if (!formData.phoneNumber.trim()) {
    newErrors.phoneNumber = "Phone number is required";
  }

  if (!formData.emailAddress.trim()) {
    newErrors.emailAddress = "Email is required";
  }

  if (!formData.paymentMethod.trim()) {
    newErrors.paymentMethod = "Please select the payment method";
  }

  return newErrors;
};
  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (cartData.length === 0) {
  navigate("/cart");
  return;
}

const validationErrors = validateForm()
if(Object.keys(validationErrors).length > 0){
  setErrors(validationErrors)
  return;
}

setErrors({})
    const order = {
      id: Date.now(),
      customer: formData,
      items: cartData,
      paymentMethod: formData.paymentMethod,
      totalAmount: grandTotal,
      createdAt: new Date().toISOString(),
    };

    createOrder(order);
    clearCart();
    navigate("/order-confirm");
  };

  return (
    <div className="px-4 lg:px-32 py-7 max-w-full h-full grid md:grid-cols-[1fr_300px] md:grid-rows-0 gap-5">
      <form>
        <h1 className="font-bold text-2xl pb-5">Checkout</h1>
        <div className="grid grid-cols-2 gap-5 text-[15px]">
          <CustomInput
            labelName={"Full Name*"}
            placeholder={"Full Name"}
            type="text"
            value={formData.fullName}
            onChange={onChangeHandler}
            name="fullName"
            id="fullName"
            htmlFor="fullName"
            error={errors.fullName}
          />
          <CustomInput
            labelName={"Country*"}
            placeholder={"Country"}
            type="text"
            value={formData.country}
            onChange={onChangeHandler}
            name="country"
            id="country"
            htmlFor="country"
            error={errors.country}
          />
          <CustomInput
            labelName={"City*"}
            placeholder={"City"}
            type="text"
            value={formData.city}
            onChange={onChangeHandler}
            name="city"
            id="city"
            htmlFor="city"
            error={errors.city}
          />
          <CustomInput
            labelName={"Address*"}
            placeholder={"Address"}
            type="text"
            value={formData.address}
            onChange={onChangeHandler}
            name="address"
            id="address"
            htmlFor="address"
            error={errors.address}
          />
          <CustomInput
            labelName={"Postal Code*"}
            placeholder={"Postal Code"}
            type="number"
            value={formData.postalCode}
            onChange={onChangeHandler}
            name="postalCode"
            id="postalCode"
            htmlFor="postalCode"
            error={errors.postalCode}
          />
          <CustomInput
            labelName={"Phone Number*"}
            placeholder={"Phone Number"}
            type="number"
            value={formData.phoneNumber}
            onChange={onChangeHandler}
            name="phoneNumber"
            id="phoneNumber"
            htmlFor="phoneNumber"
            error={errors.phoneNumber}
          />
          <CustomInput
            labelName={"Email Address*"}
            placeholder={"Email Address"}
            type="text"
            value={formData.emailAddress}
            onChange={onChangeHandler}
            name="emailAddress"
            id="emailAddress"
            htmlFor="emailAddress"
            error={errors.emailAddress}
          />

          <div className="flex flex-col gap-3">
            <label className="font-semibold" htmlFor="paymentMethod">
              Payment Method*
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                placeholder="Cash on Delivery"
                id="paymentMethod"
                className="outline-none accent-[#ffae00]"
                value={"cash_on_delivery"}
                checked={formData.paymentMethod === "cash_on_delivery"}
                onChange={onChangeHandler}
                name="paymentMethod"
              />
              <p className="font-medium  px-5 py-4">
                Cash on Delivery
              </p>
            </div>
            {errors.paymentMethod && (<p className="text-red-500 text-sm">{errors.paymentMethod}</p>)}
          </div>
        </div>
        <button
          className="mt-3 bg-black text-white px-5 py-2 rounded-lg min-h-8 cursor-pointer hover:bg-gray-700 disabled:cursor-not-allowed text-lg"
          onClick={handleCreateOrder}
        >
          Place Order
        </button>
      </form>
      <div className="border-gray-300 border-2 w-full p-5">
        <h1 className="font-bold text-2xl pb-5">Order Summary</h1>
        <div className="max-h-[540px] overflow-y-auto overflow-x-hidden text-[12px]">
          {cartData.map((item) => (
            <div className="grid grid-cols-3 py-5 justify-end items-center" key={item.id}>
              <img
                src={item.image}
                alt="cart-item-image"
                className="w-15 h-15 object-contain margin-auto"
              />
              <div>
                <h1>
                  {item.title}{" "}
                  <span className="font-bold">x {item.quantity}</span>
                </h1>
              </div>
              <p className="text-right">
                {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="text-lg">
          <div className="flex justify-between">
            <h1 className="font-bold">
              Subtotal
              <span className="font-medium text-gray-400">
                {" "}
                ({cartData.length} items)
              </span>
            </h1>
            <p>{totalCartPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between border-b-2 border-gray-200 pb-2">
            <h1 className="font-bold">Shipping: </h1>
            <p>Rs. {shipping}</p>
          </div>
          <div className="flex justify-between pt-2">
            <h1 className="font-bold">Grand Total:</h1>
            <p>Rs. {grandTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDefault;
