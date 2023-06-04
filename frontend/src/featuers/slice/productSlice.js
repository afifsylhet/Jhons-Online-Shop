import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../api/productAPI";

const initialState = {
  products: [],
  productCount: 0,
  isLoading: false,
  isError: false,
  error: "",
  editing: {},
};

// Async Thunks

export const fetchProducts = createAsyncThunk(
  "slice/fetchProducts",
  async () => {
    const products = await getProducts();
    return products;
  }
);

// Create Slice

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.products = action.payload;
        state.productCount= action.payload.productCount;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error?.message;
        state.products = [];
      });
  },
});


export default productSlice.reducer
