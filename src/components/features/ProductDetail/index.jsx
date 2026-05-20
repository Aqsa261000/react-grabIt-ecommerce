import React, { useContext, useState } from 'react'
import ProductContext from "../../../context/Product/ProductContext";
import { useParams } from 'react-router-dom'
import { getProductStatus } from '../../../utils';
import CartContext from '../../../context/Cart/CartContext';
import ToastContext from '../../../context/Toast/ToastContext';
import { WishListContext } from '../../../context/WishList/WishListContext';
import { CheckIcon, HeartIcon, HeartOutlinedIcon } from '../../../assets';
import { Spinner } from '../../common';

const ProductDetailDefault = () => {
  const [quantity,setQuantity]=useState(1)
  const {products}=useContext(ProductContext)
  const {id} = useParams()
  
  const { addToCart, cartData,increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);
  const { wishListData, addToWishList, deleteWishListProduct } =
  useContext(WishListContext);
  
    const matchedProduct = products.find((item)=>item.id===Number(id))
    if(!matchedProduct){ return (<div className='flex items-center justify-center h-full'><Spinner/></div>)}

                const status = getProductStatus(matchedProduct, cartData, wishListData);


  const addToCartHandler = (e, product) => {
          e.stopPropagation();
          const status = getProductStatus(product, cartData, wishListData);
          if (status === "inCart") {
            addToCart(product,quantity);
            showToast("Item updated in cart successfully", CheckIcon);
            return;
          }
          if (status === "inWishList") {
            addToCart(product,quantity);
            deleteWishListProduct(product);
            showToast("Item moved to cart successfully", CheckIcon);
            return;
          }
          addToCart(product,quantity);
          showToast("Item added to cart successfully", CheckIcon);
        };

        const addToWishListHandler = (e, product) => {
                e.stopPropagation();
                const status = getProductStatus(product, cartData, wishListData);
                if (status === "inCart") {
                  showToast("Item already exists in cart", CheckIcon);
                  return;
                }
                if (status === "inWishList") {
                  addToWishList(product);
                  showToast("Item updated in wishlist", CheckIcon);
                  return;
                }
                addToWishList(product);
                showToast("Item added to wishlist successfully", CheckIcon);
              };

  return (
    <div className='grid grid-rows-[1fr_min-content] grid-cols-2 pr-5 md:pr-0 md:grid-cols-[15%_1fr_40%] w-screen h-full gap-5 bg-gray-100'>
      {/* gallery */}
      <div className='flex flex-col items-center md:items-end justify-center py-5 gap-5 '>
        <img src={matchedProduct.image} alt="product-image" className='max-h-40' />
        <img src={matchedProduct.image} alt="product-image" className='max-h-40' />
        <img src={matchedProduct.image} alt="product-image" className='max-h-40' />
      </div>
      {/* image */}
      <div className='flex items-center justify-center '>
        <img src={matchedProduct.image} alt="product-image" className='max-h-140' />
      </div>
      {/* produt details */}
      <div className='flex flex-col gap-2 p-5 col-span-2 md:col-span-1'>
        <h1 className='font-bold text-3xl line-clamp-2 w-auto'>{matchedProduct.title}</h1>
        <p className=' text-[15px] line-clamp-3 w-auto'>{matchedProduct.description}</p>
        <div className="flex gap-4 items-center">
                      <form className="flex items-center gap-5">
                        <button
                          className="cursor-pointer bg-[#ffae00]  px-2 rounded"
                          onClick={(e) => {
                            e.preventDefault();
                            setQuantity((prev)=>prev+1)
                          }}
                        >
                          +
                        </button>
                        <div>{quantity}</div>
                        <button
                          className="cursor-pointer bg-[#ffae00] px-2 rounded"
                          onClick={(e) => {
                            e.preventDefault();
                            // setQuantity(quantity-1)
                            setQuantity((prev)=>(prev>1?prev-1:1))
                          }}
                        >
                          -
                        </button>
                      </form>
                      <p>Rs. {matchedProduct?.price * quantity}</p>
                    </div>
        <p className=' text-lg w-max p-5 rounded-md text-center bg-gray-300'><span className='font-semibold'>Price: </span>Rs. {matchedProduct.price}</p>

        <div className='grid grid-cols-2 gap-5 flex-1 md:items-end'>
        <button
                    type="button"
                    className="mt-3 bg-black text-white rounded-md w-full min-h-15 text-lg cursor-pointer hover:bg-gray-700"
                    onClick={(e) => addToCartHandler(e, matchedProduct)}
                  >
                    Add to Cart
                  </button>
                  <button
                                      className="mt-3 border-2 text-black rounded-md w-full min-h-15 text-lg cursor-pointer px-2 hover:bg-gray-300 gap-2 flex items-center justify-center line-clamp-1"
                                      onClick={(e) => addToWishListHandler(e, matchedProduct)}
                                    >
                                      {status === "inWishList" ? (
                                        <HeartIcon className="max-w-6 max-h-6 text-red-500" />
                                      ) : (
                                        <HeartOutlinedIcon className="max-w-6 max-h-6 " />
                                      )}
                                      Add to Wishlist
                                    </button>
                  </div>
        </div> 
    </div>
  )
}

export default ProductDetailDefault
