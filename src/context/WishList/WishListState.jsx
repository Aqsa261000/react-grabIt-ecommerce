import React, { useContext, useEffect, useState } from "react";
import { WishListContext } from "./WishListContext";
import CartContext from "../Cart/CartContext";
import { CheckIcon } from "../../assets";
import { createWishListItem, deleteWishListItem, getWishlist, updateWishListItem } from "../../services/wishlistService";

const WishListState = (props) => {
  const { cartData, addToCart } = useContext(CartContext);
  const [wishListData, setWishListData] = useState([]);

  const addToWishList = async (item,quantity=1) => {
    console.log(item)
    // let status = "";
    const existingIteminCart = cartData.find((p) => p.productId === item.id);
    if (existingIteminCart) {
      return {status: "inCart"}
    } else {
      const existingIteminWishList = wishListData.find(
        (product) => product.productId === item.id,
      );
      if (existingIteminWishList) {
        // status = "updated";
        const updateWishList = await updateWishListItem(existingIteminWishList.id,{...existingIteminWishList,quantity:existingIteminWishList.quantity+quantity})
          setWishListData((prevData) => prevData.map((p) =>
            p.productId === item.id ? updateWishList : p,
          ))
          return;
        }
        // status = "added";
        // showToast("Item added to wishlist successfully",CheckIcon)
        const newItem = {...item,quantity,productId:item.id}
        const createNewItem= await createWishListItem(newItem)
        setWishListData((prevData)=>[...prevData,createNewItem])
        // return status
      }
      }
  

  const deleteWishListProduct = (item) => {
    const wishListItem = item.productId?item:wishListData.find((w)=>w.productId === item.id)
    deleteWishListItem(wishListItem.id)
    setWishListData((prevData) => prevData.filter((p) => p.id !== wishListItem.id));
  };

  const wishListAddToCart = (item) => {
    let status = "";
    const existingItem = cartData.find((p) => p.id === item.id);
    if (existingItem) {
      status = "inCart";
    } else {
      status = "inWishList";
      addToCart(item);
      deleteWishListProduct(item);
    }
    return status;
  };

  useEffect(()=>{
    const getWishListData = async ()=>{
    try{
    const data = await getWishlist()
    setWishListData(data)
    }
    catch(err){
console.log(err)
    }
  }
  getWishListData()
  },[])

  return (
    <WishListContext.Provider
      value={{
        addToWishList,
        wishListData,
        deleteWishListProduct,
        wishListAddToCart,
      }}
    >
      {props.children}
    </WishListContext.Provider>
  );
};

export default WishListState;
