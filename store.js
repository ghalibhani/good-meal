import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./src/redux/categoriesSlice";
import mealsByCatSlice from "./src/redux/mealsByCatSlice";

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    mealsByCat: mealsByCatSlice,
  },
});

export default store;
