import api from "../api/axiosClient";

export const getWishlist = async()=>{
    const res = await api.get("/wishlist")
    return res.data;
};

export const saveProductToWishlist = async()=>{
    const res = await api.post(`/wishlist`)
    return res.data;
};