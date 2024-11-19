import React from "react";
import heroImage from "../assets/hero-burger.jpg";
import CardHero from "../components/CardHero";
import cardImage1 from "../assets/cardImage1.jpg";
import cardImage2 from "../assets/cardImage2.jpg";
import Carousell from "../components/Carousel";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../redux/categoriesSlice";
import { useSelector } from "react-redux";

export default function HomePage() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // console.log("----------- data homepage", categories);

  return (
    <>
      <section className='flex justify-between items-center px-48 h-screen'>
        {/* Hero Text */}
        <div>
          <div>
            <h1 className='text-8xl mb-16 font-bold text-[#9c640c]'>
              Craving Some <br />
              Good Meal
            </h1>
            <h2 className='text-5xl mb-16 font-bold text-amber-900'>
              Find Your Favorite Meal
            </h2>
            <h3 className='text-2xl mb-2 text-[#9c640c]'>
              You've come to the right place for some tasty recipes
            </h3>
            <p className='text-2xl mb-6 text-gray-600'>
              Just see what we've for you
            </p>
          </div>
          <div className='flex jus gap-6'>
            <button className='btn btn-accent'>Get Started</button>
            <button className='btn btn-ghost'>Explore Recipes</button>
          </div>
        </div>
        {/* Hero Image */}
        <div>
          <img
            className='object-cover rounded-3xl h-[600px] w-[600px] shadow-2xl'
            src={heroImage}
            alt='Hero Image'
          />
          <CardHero
            image={cardImage1}
            customStyle={"absolute  top-[550px] right-[630px] "}
            title='Beef Burger'
          />
          <CardHero
            image={cardImage2}
            customStyle={"absolute  top-[80px] right-[100px] "}
            title='Garden Burger'
          />
        </div>
      </section>
      <section>
        <div>
          <h2 className='mb-6 mt-20 text-3xl text-center font-bold text-[#9c640c]'>
            Recipes people like the most
          </h2>
          <h1 className='text-5xl pb-10 text-center font-bold text-amber-900'>
            Our clients favourite recipes
          </h1>
          <Carousell />
        </div>
      </section>
      <section>
        <div>
          <h2 className='mb-6 mt-20 text-3xl text-center font-bold text-[#9c640c]'>
            Pick a category
          </h2>
          <h1 className='text-5xl pb-10 text-center font-bold text-amber-900'>
            Choose what suits you
          </h1>
          <div>
            <button className='btn btn-accent'>Breakfast</button>
            <button className='btn btn-ghost'>Lunch</button>
            <button className='btn btn-ghost'>Dinner</button>
            <button className='btn btn-ghost'>Dessert</button>
          </div>
        </div>
      </section>
    </>
  );
}
