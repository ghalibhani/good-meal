import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchDetailsMeal = createAsyncThunk(
  "detailsMeal/fetchDetailsMeal",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`lookup.php?i=${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const detailsMealSlice = createSlice({
  name: "detailsMeal",
  initialState: {
    details: {},
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailsMeal.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchDetailsMeal.fulfilled, (state, action) => {
        state.details = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchDetailsMeal.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default detailsMealSlice.reducer;
