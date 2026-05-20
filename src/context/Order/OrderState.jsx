import React, { useEffect, useState } from "react";
import OrderContext from "./OrderContext";

const OrderState = (props) => {
  const [orders, setOrders] = useState(() => {
    const lcOrders = localStorage.getItem("orders");
    try {
      return lcOrders ? JSON.parse(lcOrders) : [];
    } catch {
      return [];
    }
  });

  const createOrder = (newOrder) => {
    setOrders((prev) => [...prev, newOrder]);
  };

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);
  return (
    <OrderContext.Provider value={{ createOrder }}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
