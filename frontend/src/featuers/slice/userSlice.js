import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadUser, login, logout, registration } from "../api/userApi";

const initialState = {
  user: {},
  isLoading: false,
  isAuthenticated: false,
  rgisterSuccess: false,
  error: "",
  ownError: null,
};

// Async Thunks

// For user login

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

// For user Registration
export const userRegistration = createAsyncThunk(
  "slice/userRegistration",
  async (registerData, { rejectWithValue }) => {
    try {
      const registrationData = await registration(registerData);
      return registrationData;
    } catch (error) {
      // If the request fails, return the error payload
      return rejectWithValue(error.response.data);
    }
  }
);

// For Loading User Details

export const loadUserDetails = createAsyncThunk(
  "slice/loadUserDetails",
  async (_, { rejectWithValue }) => {
    // Removed unused parameter
    try {
      const userData = await loadUser(); // Assuming loadUser is imported correctly
      return userData;
    } catch (error) {
      return rejectWithValue(error.response.data); // Returning error message instead of error.response.data
    }
  }
);

// For User Logout

export const userLogout = createAsyncThunk(
  "slice/userLogout",
  async (_, { rejectWithValue }) => {
    // Removed unused parameter
    try {
      const userData = await logout(); // Assuming loadUser is imported correctly
      return userData;
    } catch (error) {
      return rejectWithValue(error.response.data); // Returning error message instead of error.response.data
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
      // For user Login
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = "";
        state.ownError = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.error?.message;
        state.ownError = action?.payload?.message;
      })

      // For User Registration

      .addCase(userRegistration.pending, (state) => {
        state.isLoading = true;
        state.rgisterSuccess = false;
      })
      .addCase(userRegistration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rgisterSuccess = true;
        state.user = action.payload;
        state.error = "";
        state.ownError = null;
      })
      .addCase(userRegistration.rejected, (state, action) => {
        state.isLoading = false;
        state.rgisterSuccess = false;
        state.user = null;
        state.error = action.error?.message;
        state.ownError = action?.payload?.message;
      })

      //For loading user details
      .addCase(loadUserDetails.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(loadUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = "";
        state.ownError = null;
      })
      .addCase(loadUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.error?.message || "Failed to load user details";
        state.ownError = action.payload?.message || null;
      })

      //For user Logout
      .addCase(userLogout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = "";
        state.ownError = null;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.error?.message;
        state.ownError = action.payload?.message;
      });
  },
});

export default userSlice.reducer;
export const { clearError } = userSlice.actions;
