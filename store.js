import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./src/redux/categoriesSlice";
import mealsByCatSlice from "./src/redux/mealsByCatSlice";
import detailMealSlice from "./src/redux/detailsMealSlice";

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    mealsByCat: mealsByCatSlice,
    detailMeals: detailMealSlice,
  },
});

export default store;
