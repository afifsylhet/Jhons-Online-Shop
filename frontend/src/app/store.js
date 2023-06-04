import { configureStore } from '@reduxjs/toolkit';
import productReducer from "../featuers/slice/productSlice"

const store = configureStore({
    reducer: {
        product: productReducer,
    }
 });


 export default store;
