import axios from "../../utils/axios";


// For register
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