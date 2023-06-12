import axios from "../../utils/axios";

export const login = async ({ email, password }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const response = await axios.post("/login", { email, password }, config);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.message);
    }
  };