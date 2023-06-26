import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateProfile, updatePassword, forgetPassword, resetPassword } from "../api/profileApi";

const initialState = {
  isLoading: false,
  isUpdated: false,
  message:false,
  success:false,
  error: "",
  ownError: null,
};

// Async Thunks
// For update user data
export const updateUserProfile = createAsyncThunk(
  "slice/updateUserProfile",
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


// For update user password
export const updateUserPassword = createAsyncThunk(
  "slice/updateUserPassword",
  async (updatedPassword, { rejectWithValue }) => {
    try {
      const data = await updatePassword(updatedPassword);
      return data;
    } catch (error) {
      // If the request fails, return the error payload
      return rejectWithValue(error.response.data);
    }
  }
);

// For forget user password
export const forgetUserPassword = createAsyncThunk(
  "slice/forgetUserPassword",
  async (forgetPasswordEmail, { rejectWithValue }) => {
    try {
      const data = await forgetPassword(forgetPasswordEmail);
      return data;
    } catch (error) {
      // If the request fails, return the error payload
      return rejectWithValue(error.response.data);
    }
  }
);

// For reset user password
export const resetUserPassword = createAsyncThunk(
  "slice/resetUserPassword",
  async ({ token, resetPasswordData }, { rejectWithValue }) => {
    try {
      const data = await resetPassword(token, resetPasswordData);
      return data;
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
      state.isUpdated= null;
      state.message= false;
    },
    updateProfileReset: (state) => {
      state.isLoading = false;
      state.isUpdated = false;
    },
    updatePasswordReset: (state) => {
      state.isLoading = false;
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // For update user profile
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
        state.error = action.error?.message;
        state.ownError = action?.payload?.message;
      })
      
      // For update user password
       .addCase(updateUserPassword.pending, (state) => {
        state.isLoading = true;
        state.isUpdated = false;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = action.payload;
        state.error = "";
        state.ownError = null;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = null;
        state.error = action.error?.message;
        state.ownError = action?.payload?.message;
      })

       // For Forget user password
       .addCase(forgetUserPassword.pending, (state) => {
        state.isLoading = true;
        state.message = false;
      })
      .addCase(forgetUserPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.error = "";
        state.ownError = null;
      })
      .addCase(forgetUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.message = null;
        state.error = action.error?.message;
        state.ownError = action?.payload?.message;
      })
     
       // For reset user password
       .addCase(resetUserPassword.pending, (state) => {
        state.isLoading = true;
        state.success = false;
      })
      .addCase(resetUserPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload;
        state.error = "";
        state.ownError = null;
      })
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.success = null;
        state.error = action.error?.message;
        state.ownError = action?.payload?.message;
      });
  },
});

export default profileSlice.reducer;
export const { clearError, updateProfileReset,updatePasswordReset } = profileSlice.actions;
