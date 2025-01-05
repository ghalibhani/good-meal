import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  clearSearchMealsSlice,
  getSearchMealsSlice,
} from "../redux/searchMealSlice";
import { useSelector } from "react-redux";

function Navigation() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { meals } = useSelector((state) => state.searchMeals.meals);

  useEffect(() => {
    if (search === "") {
      dispatch(clearSearchMealsSlice());
      return;
    }

    const timeout = setTimeout(() => {
      dispatch(getSearchMealsSlice(search));
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, dispatch]);

  console.log("from search===============", meals);

  return (
    <div className='navbar px-10 shadow bg-base-100 fixed z-10'>
      <div className='flex-1'>
        <a href='/' className='btn btn-ghost text-3xl text-accent'>
          Good Meal
        </a>
      </div>
      <div className='flex-none gap-2'>
        <div className='form-control'>
          <input
            type='text'
            placeholder='Search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='input input-bordered'
          />
        </div>
      </div>
      {meals?.length > 0 && (
        <div className='absolute top-[70px] right-[45px] bg-white shadow-lg rounded-md z-20 max-h-96 overflow-y-scroll '>
          <ul className='p-2 mt-auto'>
            {meals.map((meal) => (
              <li
                key={meal.idMeal}
                className='flex items-center gap-4 p-2 border-b hover:bg-gray-100 transition'
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className='w-16 h-16 rounded'
                />
                <span className='text-lg font-semibold'>{meal.strMeal}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navigation;
