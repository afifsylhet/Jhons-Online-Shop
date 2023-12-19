import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "../api/orderApi";

const initialState = {
    order: {},
    isLoading: false,
    isAuthenticated: false,
    error: "",
    ownError: null,
  };

  // Async Thunks

// For create order

export const createUserOrder = createAsyncThunk(
    "slice/createUserOrder",
    async (order, { rejectWithValue }) => {
      try {
        const orderData = await createOrder(order);
        return orderData.order;
      } catch (error) {
        // If the request fails, return the error payload
        return rejectWithValue(error.response.data);
      }
    }
  );


  // Order Slice

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
      clearError: (state) => {
        state.error = "";
        state.ownError = null;
      },
    },
    extraReducers: (builder) => {
      builder
        // For create order
        .addCase(createUserOrder.pending, (state) => {
          state.isLoading = true;
          state.isAuthenticated = false;
        })
        .addCase(createUserOrder.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.order = action.payload;
          state.error = "";
          state.ownError = null;
        })
        .addCase(createUserOrder.rejected, (state, action) => {
          state.isLoading = false;
          state.isAuthenticated = false;
          state.order = null;
          state.error = action.error?.message;
          state.ownError = action?.payload?.message;
        });
    },
  });
  
  export default orderSlice.reducer;
  export const { clearError } = orderSlice.actions;