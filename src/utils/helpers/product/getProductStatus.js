export const getProductStatus = (product, cartData, wishListData) => {
  if (cartData.find((p) => p.productId === product.id)) return "inCart";
  if (wishListData.find((p) => p.productId === product.id)) return "inWishList";
  return "new";
};
