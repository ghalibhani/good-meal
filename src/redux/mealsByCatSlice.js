import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchMealsByCategory = createAsyncThunk(
  "mealsByCat/fetchMealsByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`filter.php?c=${category}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const mealsByCatSlice = createSlice({
  name: "mealsByCat",
  initialState: {
    meals: [],
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMealsByCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchMealsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.meals = action.payload;
      })
      .addCase(fetchMealsByCategory.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default mealsByCatSlice.reducer;
