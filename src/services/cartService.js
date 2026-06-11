import api from "../api/axiosClient";

export const fetchCart = async (userId) => {
  const res = await api.get(`/cart?userId=${userId}`);
  return res.data;
};

export const createCartItem = async (product) => {
  const res = await api.post("/cart", product);
  return res.data;
};

export const updateCartItem = async (id, product) => {
  const res = await api.patch(`/cart/${id}`, product);
  return res.data;
};

export const deleteCartItem = async (id) => {
  const res = await api.delete(`/cart/${id}`);
  return res.data;
};
