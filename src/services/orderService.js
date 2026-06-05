import api from "../api/axiosClient";

export const getOrders = async()=>{
    const res = await api.get("/orders")
    return res.data;
};

export const createOrder = async(order)=>{
    const res = await api.post(`/orders`,order)
    return res.data;
};