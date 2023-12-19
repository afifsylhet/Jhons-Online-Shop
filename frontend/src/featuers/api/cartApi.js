import axios from "../../utils/axios"

// Get single porduct for cart

  export const getProductForCart = async (id) => {

    const config = {
         withCredentials: true, // Include cookies in the request
    };

    const response = await axios.get(`/product/${id}`, config);
  
    return response.data;
  };