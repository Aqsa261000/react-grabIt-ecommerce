import api from "../api/axiosClient";

export const getAllOrders = async (userId) => {
  const res = await api.get(`/orders?userId=${userId}`);
  return res.data;
};

export const createOrderItem = async (order) => {
  const res = await api.post(`/orders`, order);
  return res.data;
};
