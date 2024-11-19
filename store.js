import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./src/redux/categoriesSlice";

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
  },
});

export default store;
