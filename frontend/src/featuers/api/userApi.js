import axios from "../../utils/axios";


// For Login
export const login = async ({ email, password }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Include cookies in the request
  };

  const response = await axios.post("/login", { email, password }, config);
  return response.data;
};

// For register
export const registration = async (registerData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true, // Include cookies in the request
  };

  const response = await axios.post("/register", registerData, config);
  return response.data;
};

// For Loading user Details

export const loadUser = async () => {

  const config = {
    withCredentials: true, // Include cookies in the request
  };

  const response = await axios.get("/me", config);
  return response.data;
};

// For logout 

export const logout = async () => {
  
  const config = {
    withCredentials: true, // Include cookies in the request
  };

  const response = await axios.get("/logout", config);
  return response.data;
};