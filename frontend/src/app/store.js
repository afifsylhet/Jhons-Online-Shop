import { configureStore } from '@reduxjs/toolkit';
import productReducer from "../featuers/slice/productSlice"
import userReducer from '../featuers/slice/userSlice';
import profileReducer from '../featuers/slice/profileSlice'


const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        profile: profileReducer,
    }
 });


 export default store;
