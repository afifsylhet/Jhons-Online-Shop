
import axios from "../../utils/axios";

// For create Order
export const createOrder = async (order) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Include cookies in the request
    };
  
    const response = await axios.post("/order/new", order, config);
    return response.data;
  };