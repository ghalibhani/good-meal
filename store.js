import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./src/redux/categoriesSlice";
import mealsByCatSlice from "./src/redux/mealsByCatSlice";
import detailMealSlice from "./src/redux/detailsMealSlice";
import searchMealsSlice from "./src/redux/searchMealSlice";

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    mealsByCat: mealsByCatSlice,
    detailMeals: detailMealSlice,
    searchMeals: searchMealsSlice,
  },
});

export default store;
