import React, { useState } from "react";
import {
  CarouselImage1,
  CarouselImage2,
  CarouselImage3,
  Logo,
} from "../../../assets";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newSlide = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newSlide);
  };
  const nextSlide = () => {
    const isLastIndex = currentIndex === slides.length - 1;
    const newSlide = isLastIndex ? 0 : currentIndex + 1;
    setCurrentIndex(newSlide);
  };
  return (
    <div className="px-2">
      {/* carousel slider */}
      <div className="max-w-[1400px] h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] relative min-w-full ">
        <div
          className={`w-full h-full rounded-2xl ${slides[currentIndex].imageStyle} bg-center transition-all`}
          style={{ backgroundImage: `url(${slides[currentIndex].img})` }}
        ></div>
        <div className="absolute top-[50%] text-white translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 cursor-pointer">
          <BsChevronCompactLeft size={30} onClick={prevSlide} />
        </div>
        <div className="absolute top-[50%] text-white translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 cursor-pointer">
          <BsChevronCompactRight size={30} onClick={nextSlide} />
        </div>
        <h1 className="text-lg text-center font-bold py-2">
          {slides[currentIndex].text}
        </h1>
        <div className="flex top-4 justify-center">
          {slides.map((item, i) => (
            <div key={i} className="text-2xl cursor-pointer transition-all">
              <RxDotFilled
                size={30}
                onClick={() => setCurrentIndex(i)}
                className={`${currentIndex === i && "text-[#ffae00]"}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
