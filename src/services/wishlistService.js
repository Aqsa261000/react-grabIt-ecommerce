import api from "../api/axiosClient";

export const getWishlist = async()=>{
    const res = await api.get("/wishlist")
    return res.data;
};

export const createWishListItem = async(product)=>{
    const res = await api.post(`/wishlist`,product)
    return res.data;
};


export const updateWishListItem = async(id,product)=>{
    const res = await api.patch(`/wishlist/${id}`,product)
    return res.data;
};


export const deleteWishListItem = async(id)=>{
    const res = await api.delete(`/wishlist/${id}`)
    return res.data;
};