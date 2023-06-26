import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductForCart } from "../api/cartApi";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  error: "",
  ownError: null,
};

// Async Thunks

//  Add to Cart
export const getProductDetailsForCart = createAsyncThunk(
  "slice/getProductDetailsForCart",
  async ({ quantity, id }, { rejectWithValue }) => {
    try {
      const productData = await getProductForCart(id); // Assuming loadUser is imported correctly
      return {
        product: productData.product._id,
        name: productData.product.name,
        price: productData.product.price,
        image: productData.product.images[0].url,
        stock: productData.product.stock,
        quantity,
      };
    } catch (error) {
      return rejectWithValue(error.response.data); // Returning error message instead of error.response.data
    }
  }
);

// Remove from cart
export const removeFromCart = createAsyncThunk(
  "slice/removeFromCart",
  async (id, { rejectWithValue }) => {
    try {
      const productData = id; 
      return productData;
    } catch (error) {
      return rejectWithValue(error.response.data); // Returning error message instead of error.response.data
    }
  }
);

// Save Shipping Details
export const saveShippingDetails = createAsyncThunk(
  "slice/saveShippingDetails",
  async (data, { rejectWithValue }) => {
    try {
      const info = data; 
      return info;
    } catch (error) {
      return rejectWithValue(error.response.data); // Returning error message instead of error.response.data
    }
  }
);

// Cart Slice

const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder
      //For add to cart
      .addCase(getProductDetailsForCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductDetailsForCart.fulfilled, (state, action) => {
        const item = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        const isItemExist = state.cartItems.find(
          (i) => i.product === item.product
        );

        if (isItemExist) {
          state.cartItems = state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          );
        } else {
          state.cartItems.push(item);
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      .addCase(getProductDetailsForCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.error?.message;
        state.ownError = action?.payload?.message;
      })

      //Remove form cart
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const currentData = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
    

        if (currentData) {
          state.cartItems = state.cartItems.filter((i) =>
            i.product !== currentData
          );
        } 
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.error?.message;
      })

      //For Saving Shipping Details
      .addCase(saveShippingDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveShippingDetails.fulfilled, (state, action) => {
        const item = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.shippingInfo = action.payload;
        localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
      })
      .addCase(saveShippingDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.error?.message;
      })
  },
});

export default cartSlice.reducer;
