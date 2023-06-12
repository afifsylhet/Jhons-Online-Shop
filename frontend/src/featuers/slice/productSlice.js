import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductDetails, getProducts } from "../api/productAPI";

const initialState = {
  products: [],
  productCount: 0,
  resultPerPage:0,
  isLoading: false,
  isError: false,
  error: "",
  editing: {},
};

// Async Thunks
// Get Product

export const fetchProducts = createAsyncThunk(
  "slice/fetchProducts",
  async ({keyword, currentPage, price, catagory, ratings}) => {
    const products = await getProducts(keyword, currentPage, price, catagory, ratings);
    return products;
  }
);

// Get Product Details

export const fetchProductDetails = createAsyncThunk(
  "slice/fetchProductDetails",
  async(id)=>{
    const product = await getProductDetails(id);
    return product;
  }
)

// Create Slice

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder
    // Get Product
      .addCase(fetchProducts.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.products = action.payload;
        state.productCount= action.payload.productCount;
        state.resultPerPage = action.payload.resultPerPage;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error?.message;
        state.products = [];
      })

// Get a Single Product Details

      .addCase(fetchProductDetails.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error?.message;
        state.transactions = {};
      })
  },
});


export default productSlice.reducer
