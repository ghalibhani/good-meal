import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const getSearchMealsSlice = createAsyncThunk(
  "searchMeals/getSearchMeals",
  async (search, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`search.php?s=${search}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearSearchMealsSlice = createAsyncThunk(
  "searchMeals/clearSearchMeals",
  async (_, { rejectWithValue }) => {
    try {
      return [];
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const searchMealsSlice = createSlice({
  name: "searchMeals",
  initialState: {
    meals: [],
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchMealsSlice.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getSearchMealsSlice.fulfilled, (state, action) => {
        state.meals = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getSearchMealsSlice.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(clearSearchMealsSlice.fulfilled, (state) => {
        state.meals = [];
      });
  },
});

export default searchMealsSlice.reducer;
