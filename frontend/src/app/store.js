import { configureStore } from '@reduxjs/toolkit';
import productReducer from "../featuers/slice/productSlice"
import userReducer from '../featuers/slice/userSlice';

const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
    }
 });


 export default store;
