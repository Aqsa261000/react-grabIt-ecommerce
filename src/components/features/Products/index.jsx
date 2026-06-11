import React, { useContext, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { ProductCard, Spinner, Toast } from "../../common";
import CartContext from "../../../context/Cart/CartContext";
import {
  CartIcon,
  CheckIcon,
  HeartIcon,
  HeartOutlinedIcon,
} from "../../../assets";
import ToastContext from "../../../context/Toast/ToastContext";
import { WishListContext } from "../../../context/WishList/WishListContext";
import { getProductStatus } from "../../../utils";
import SearchContext from "../../../context/Search/SearchContext";
import ProductContext from "../../../context/Product/ProductContext";

const ProductsDefault = () => {
  const { products, error, loading } = useContext(ProductContext);
  const { cartData } = useContext(CartContext);
  const { search } = useContext(SearchContext);
  const { wishListData } = useContext(WishListContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "all";

  // const filteredProducts =
  //   search.trim() === ""
  //     ? products
  //     : products.filter((item) =>
  //         item.title.toLowerCase().includes(search.toLowerCase()),
  //       );

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      category === "all" ||
      (category === "clothing"
        ? product.category.includes("clothing")
        : product.category === category);

    return matchesSearch && matchesCategory;
  });

  if (loading)
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  if (error)
    return (
      <p className="flex items-center justify-center h-full text-lg">{error}</p>
    );
  return (
    <div className="w-full h-full">
      <div className="text-center py-10 flex flex-col sm:flex-row items-center justify-center gap-2">
        <h1 className="text-lg font-bold text-[#ffae00]">Categories:</h1>
        {["all", "clothing", "jewelery", "electronics"].map(
          (cat, index, arr) => (
            <span className="flex gap-2" key={cat}>
              <button
                onClick={() => {
                  setSearchParams(cat === "all" ? {} : { category: cat });
                }}
                className={`capitalize ${category === cat ? `font-bold text-xl` : `font-medium text-lg`}`}
              >
                {cat}
              </button>

              {index < arr.length - 1 && (
                <span className="text-xl hidden sm:block">|</span>
              )}
            </span>
          ),
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-6">
        {filteredProducts.map((product) => {
          const status = getProductStatus(product, cartData, wishListData);
          return (
            // product card design
            <ProductCard product={product} status={status} key={product.id} />
          );
        })}
      </div>
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="flex items-center justify-center h-full text-lg">
          No products found
        </div>
      )}
    </div>
  );
};

export default ProductsDefault;
