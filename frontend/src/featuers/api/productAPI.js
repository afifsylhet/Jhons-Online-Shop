import axios from "../../utils/axios"


export const getProducts = async (keyword ="", currentPage=1, price =[0, 6000], catagory="", ratings=0) => {

  let link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`

  if (catagory) {
     link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&catagory=${catagory}&ratings[gte]=${ratings}`
  }


    const response = await axios.get(link);
  
    return response.data;
  };

  export const getProductDetails = async (id) => {
    const response = await axios.get(`/product/${id}`);
  
    return response.data;
  };
