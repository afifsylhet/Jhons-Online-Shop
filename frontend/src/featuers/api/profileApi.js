import axios from "../../utils/axios";


// For Update User Profile
export const updateProfile = async (updateData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true, // Include cookies in the request
    };
  
    const response = await axios.put("/me/update", updateData, config);
    return response.data;
  };

// For Update User Password
export const updatePassword = async (updatedPassword) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true, // Include cookies in the request
    };
  
    const response = await axios.put("/passowrd/update", updatedPassword, config);
    return response.data;
  };

// Forget Password
export const forgetPassword = async (forgetPasswordEmail) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Include cookies in the request
  };

  const response = await axios.post("/password/forget", forgetPasswordEmail, config);
  return response.data;
};



// For Reset User Password
export const resetPassword = async (token, resetPasswordData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Include cookies in the request
  };
  
  const response = await axios.put(`/password/reset/${token}`, resetPasswordData, config);
  return response.data;
};
