export const getProductStatus = (product, cartData, wishListData) => {
  if (cartData.find((p) => p.id === product.id)) return "inCart";
  if (wishListData.find((p) => p.id === product.id)) return "inWishList";
  return "new";
};
