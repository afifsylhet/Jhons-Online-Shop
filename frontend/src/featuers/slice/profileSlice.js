import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateProfile } from "../api/profileApi";

const initialState = {
  user: {},
  isLoading: false,
  isUpdated: false,
  error: "",
  ownError: null,
};

// Async Thunks
// For update user data
export const updateUserProfile = createAsyncThunk(
  "slice/updateUser",
  async (updateData, { rejectWithValue }) => {
    try {
      const updatedData = await updateProfile(updateData);
      return updatedData;
    } catch (error) {
      // If the request fails, return the error payload
      return rejectWithValue(error.response.data);
    }
  }
);

// Profile Slice

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = "";
      state.ownError = null;
    },
    updateProfileReset: (state) => {
      state.isLoading = false;
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // For update user data
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.isUpdated = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = action.payload;
        state.error = "";
        state.ownError = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = null;
        state.error = "";
        state.error = action.error?.message;
        state.ownError = action?.payload?.message;
      });
  },
});

export default profileSlice.reducer;
export const { clearError, updateProfileReset } = profileSlice.actions;
