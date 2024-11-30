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
import { fetchMealsByCategory } from "../redux/mealsByCatSlice";
import { useState } from "react";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories.categories);
  const { meals, isLoading } = useSelector((state) => ({
    meals: state.mealsByCat.meals.meals,
    isLoading: state.mealsByCat.isLoading,
  }));
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedButton(category);
  };

  const handleClickDetails = (id) => {
    navigate(`/details/${id}`);
  };

  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchMealsByCategory(selectedCategory));
    }
  }, [selectedCategory, dispatch]);

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
            <button className='btn btn-accent'>Find Meals</button>
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
            customStyle={"absolute w-48 top-[550px] right-[630px] "}
            customSyleImg={"w-48 h-48 "}
            title='Beef Burger'
          />
          <CardHero
            image={cardImage2}
            customStyle={"absolute w-48 top-[80px] right-[100px] "}
            customSyleImg={"w-48 h-48 "}
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
      <section className="mb-20">
        <div>
          <h2 className='mb-6 mt-20 text-3xl text-center font-bold text-[#9c640c]'>
            Pick a category
          </h2>
          <h1 className='text-5xl pb-10 text-center font-bold text-amber-900'>
            Choose what suits you
          </h1>
          <div className='flex flex-wrap items-center justify-center mb-7 gap-3 w-[1100px] mx-auto'>
            {categories?.map((category) => (
              <button
                key={category.idCategory}
                className={`btn ${
                  selectedButton === category.strCategory
                    ? "btn-accent"
                    : "btn-outline btn-accent"
                }  w-28 `}
                onClick={() => handleCategoryClick(category.strCategory)}
              >
                {category.strCategory}
              </button>
            ))}
          </div>
          <div className='flex flex-wrap justify-center gap-6 px-20'>
            {isLoading ? (
              <Loading />
            ) : (
              meals?.map((meal) => (
                <CardHero
                  key={meal.idMeal}
                  customStyle={"w-[300px] hover:scale-110 transition-all "}
                  customSyleImg={"w-[300px] h-[230px] "}
                  click={() => handleClickDetails(meal.idMeal)}
                  image={meal.strMealThumb}
                  title={meal.strMeal}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
