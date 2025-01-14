import React, { useState } from "react";
import carouselImage1 from "../assets/blini-pancakes.jpg";
import carouselImage2 from "../assets/fish-soup.jpg";
import carouselImage3 from "../assets/salad.jpg";
import carouselImage4 from "../assets/salmon.jpg";

const Carousel = () => {
  const slides = [
    {
      id: 1,
      image: carouselImage1,
      caption: "Blini Pancakes",
    },
    {
      id: 2,
      image: carouselImage2,
      caption: "Fish Soup",
    },
    {
      id: 3,
      image: carouselImage3,
      caption: "Caeasar Salad",
    },
    {
      id: 4,
      image: carouselImage4,
      caption: "Salmon Prawn Risotto",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className='relative pb-16 w-full max-w-5xl mx-auto'>
      {/* Slides */}
      <div className='overflow-hidden rounded-lg'>
        <img
          src={slides[currentIndex].image}
          alt={slides[currentIndex].caption}
          className='w-full h-[640px] object-cover'
        />
        <div className='absolute bottom-[92px] rounded-b-lg w-full bg-black bg-opacity-50 text-white p-4'>
          {slides[currentIndex].caption}
        </div>
      </div>

      {/* Indicators */}
      <div className='flex justify-center space-x-2 mt-4'>
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex
                ? "bg-accent w-20"
                : "bg-gray-400 hover:bg-[#f8c471]"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
