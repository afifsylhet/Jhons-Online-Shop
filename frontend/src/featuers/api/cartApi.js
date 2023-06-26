import axios from "../../utils/axios"

// Get single porduct for cart

  export const getProductForCart = async (id) => {
    const response = await axios.get(`/product/${id}`);
  
    return response.data;
  };