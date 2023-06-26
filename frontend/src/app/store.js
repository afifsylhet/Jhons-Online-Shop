import { configureStore } from '@reduxjs/toolkit';
import productReducer from "../featuers/slice/productSlice"
import userReducer from '../featuers/slice/userSlice';
import profileReducer from '../featuers/slice/profileSlice'
import cartReducer from '../featuers/slice/cartSlice';


const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        profile: profileReducer,
        cart: cartReducer,
    }
 });


 export default store;
