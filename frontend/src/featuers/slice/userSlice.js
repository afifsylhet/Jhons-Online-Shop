import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../api/userApi";

const initialState = {
  user: {},
  isLoading: false,
  isAuthenticated: false,
  error: "",
  ownError: null,
};

// Async Thunks

export const userLogin = createAsyncThunk(
    "slice/userLogin",
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const loginData = await login({ email, password });
        return loginData;
      } catch (error) {
        // If the request fails, return the error payload
        return rejectWithValue(error.response.data);
      }
    }
  );


// User Slice

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = "";
      state.ownError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = ""
        state.ownError= null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.error?.message;
        state.ownError = action?.payload?.message;
      });
  },
});


export default userSlice.reducer;
export const {clearError } = userSlice.actions;

