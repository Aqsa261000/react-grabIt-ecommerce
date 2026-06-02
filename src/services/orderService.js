import api from "../api/axiosClient";

export const getOrders = async()=>{
    const res = await api.get("/orders")
    return res.data;
};

export const saveOrder = async()=>{
    const res = await api.post(`/orders`)
    return res.data;
};