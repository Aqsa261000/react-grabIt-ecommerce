import React, { useContext, useEffect, useState } from "react";
import OrderContext from "./OrderContext";
import CartContext from "../Cart/CartContext";
import { createOrderItem, getAllOrders } from "../../services/orderService";
import AuthContext from "../Auth/AuthContext";

const OrderState = (props) => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);

  const createOrder = async (newOrder) => {
    try {
      if (
        newOrder &&
        newOrder?.items?.length > 0 &&
        newOrder?.totalAmount &&
        newOrder?.customer
      ) {
        const orderPayload = {
          ...newOrder,
          customer: user?.id,
        };
        const data = await createOrderItem(orderPayload);
        setOrders((prevOrders) => [...prevOrders, data]);
        return data;
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        if (!user) return;
        const data = await getAllOrders(user.id);
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };

    getOrders();
  }, [user]);
  return (
    <OrderContext.Provider value={{ createOrder, orders }}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
