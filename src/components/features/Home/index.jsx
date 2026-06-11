import React, { useContext, useState } from "react";
import { Carousel, ProductCard } from "../../common";
import {
  BestPrice,
  BestQuality,
  CarouselImage1,
  CarouselImage2,
  CarouselImage3,
  ClothingCategory,
  DeliveryOnTime,
  ElectronicsCategory,
  HomePoster,
  HomePoster2,
  JewelleryCategory,
  Logo,
} from "../../../assets";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import ProductContext from "../../../context/Product/ProductContext";
import { getProductStatus } from "../../../utils";
import CartContext from "../../../context/Cart/CartContext";
import { WishListContext } from "../../../context/WishList/WishListContext";

const slides = [
  { img: CarouselImage1, imageStyle: "bg-cover" },
  { img: CarouselImage2, imageStyle: "bg-cover" },
  { img: CarouselImage3, imageStyle: "bg-cover" },
];

const images = [
  {
    img: ClothingCategory,
    text: "Clothing",
    imageStyle: "bg-contain bg-no-repeat",
  },
  {
    img: JewelleryCategory,
    text: "Jewellery",
    imageStyle: "bg-contain bg-no-repeat",
  },
  {
    img: ElectronicsCategory,
    text: "Electronics",
    imageStyle: "bg-contain bg-no-repeat",
  },
];

const offers = [
  {
    img: DeliveryOnTime,
    text: "Delivery on Time",
    imageStyle: "bg-contain bg-no-repeat",
  },
  {
    img: BestQuality,
    text: "Best Quality Offered",
    imageStyle: "bg-contain bg-no-repeat",
  },
  {
    img: BestPrice,
    text: "Best and Affordable Prices",
    imageStyle: "bg-contain bg-no-repeat",
  },
];

const HomeDefault = () => {
  const { products } = useContext(ProductContext);
  const { cartData } = useContext(CartContext);
  const { wishListData } = useContext(WishListContext);
  const navigate = useNavigate();

  const featuredProducts = products.filter((item) => item).slice(0, 3);

  return (
    <div className="w-full h-full">
      <Carousel slides={slides} />
      <div className="flex flex-col gap-10 py-7 px-2">
        <h1 className="text-2xl font-bold pt-15 text-center">CATEGORIES</h1>
        <div className="hidden sm:grid grid-cols-3 gap-5">
          <div
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => navigate("/products?category=clothing")}
          >
            <img
              src={ClothingCategory}
              alt="clothing-category"
              className="h-70 w-70 object-cover rounded-xl"
            />
            <h1 className="font-semibold text-lg">Clothing</h1>
          </div>
          <div
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => navigate("/products?category=jewelery")}
          >
            <img
              src={JewelleryCategory}
              alt="jewelery category"
              className="h-70 w-70 object-cover rounded-xl"
            />
            <h1 className="font-semibold text-lg">Jewellery</h1>
          </div>
          <div
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => navigate("/products?category=electronics")}
          >
            <img
              src={ElectronicsCategory}
              alt="electronics category"
              className="h-70 w-70 object-cover rounded-xl"
            />
            <h1 className="font-semibold text-lg">Electronics</h1>
          </div>
        </div>
        <div className="sm:hidden ">
          <Carousel slides={images} />
        </div>
      </div>
      <div className=" pt-12 grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 w-full px-2 rounded-xl">
        <div className="relative h-150 md:order-1 order-2">
          <img
            src={HomePoster}
            alt="home-poster"
            className="h-full w-full object-cover"
          />
          <div className="absolute text-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex gap-2 flex-col">
            <h1 className="font-bold text-5xl">
              WE MADE YOUR EVERYDAY SHOPPING BETTER!
            </h1>
            <p className="text-[15px]">
              In our journey to improve everyday shopping, Grab It presents
              EVERYDAY quality - Comfortable & Affordable fashion 24/7
            </p>
            <button
              className="bg-white text-lg py-2 px-4 text-left text-black font-semibold rounded-xl w-max hover:bg-gray-300"
              onClick={() => navigate("/products")}
            >
              Shop Now
            </button>
          </div>
        </div>
        <div className=" md:h-150 md:order-2 order-1">
          <img
            src={HomePoster2}
            alt="home-poster-2"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="px-2">
        <h1 className="font-bold text-2xl py-7 text-center">
          FEATURED PRODUCTS
        </h1>
        <div className="sm:grid grid-cols-3 gap-5">
          {featuredProducts.map((product) => {
            const status = getProductStatus(product, cartData, wishListData);
            return <ProductCard product={product} status={status} />;
          })}
        </div>
      </div>
      <div className="hidden md:flex flex-col items-center py-15 gap-10">
        <h1 className="font-bold text-2xl">WHAT WE OFFER</h1>
        <div className="flex items-center justify-center gap-10">
          <div className="grid grid-rows-[1fr_60px] items-center justify-center shadow-xl px-5 rounded-xl shadow-[#ffae00] ">
            <img
              src={DeliveryOnTime}
              alt="delivery"
              className="w-full h-50 object-contain"
            />
            <h1 className="text-lg font-semibold text-center">
              Delivery on Time
            </h1>
          </div>
          <div className="grid grid-rows-[1fr_60px] items-center justify-center shadow-xl px-5 rounded-xl shadow-[#ffae00] ">
            <img
              src={BestQuality}
              alt="quality"
              className="w-full h-50 object-contain"
            />
            <h1 className="text-lg font-semibold text-center">
              Best Quality Offered
            </h1>
          </div>
          <div className="grid grid-rows-[1fr_60px] items-center justify-center shadow-xl px-5 rounded-xl shadow-[#ffae00] ">
            <img
              src={BestPrice}
              alt="price"
              className="w-full h-50 object-contain"
            />
            <h1 className="text-lg font-semibold text-center">
              Delivery on Time
            </h1>
          </div>
        </div>
      </div>
      <div className="md:hidden pb-24 pt-7">
        <Carousel slides={offers} />
      </div>
    </div>
  );
};

export default HomeDefault;
