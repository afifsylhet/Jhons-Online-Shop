import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";

import Header from "./component/layout/home/Header";
import Footer from "./component/layout/home/Footer";
import Home from "./component/layout/home/Home";
import ProductDetails from "./component/layout/home/ProductDetails";
import Products from "./component/Products";
import Search from "./component/Search";
import LoginSignUp from "./component/layout/User/LoginSignUp";
import UserOptions from "./component/layout/User/UserOptions";
import { loadUserDetails } from "./featuers/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import MyProfile from "./component/layout/User/MyProfile";
import UpdateProfile from "./component/layout/User/UpdateProfile";
import UpdatePassword from "./component/layout/User/UpdatePassword";
import ForgetPassword from "./component/layout/User/ForgetPassword";
import ResetPassword from "./component/layout/User/ResetPassword";
import Cart from "./component/layout/cart/Cart";
import Shipping from "./component/layout/cart/Shipping";
import ConfirmOrder from "./component/layout/cart/ConfirmOrder";
import axios from "./utils/axios";

// Payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./component/layout/cart/Payment.js";
import OrderSuccess from "./component/layout/cart/OrderSuccess";
import MyOrders from "./component/layout/order/MyOrders";

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Chilanka", "Droid Sans"],
      },
    });
    dispatch(loadUserDetails()); // Dispatch the action to load user details

    async function getStripApiKey() {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include cookies in the request
      };
      const { data } = await axios.get("/stripeapi", config);

      setStripeApiKey(data.stripeApiKey);
    }

    getStripApiKey();
  }, [dispatch]);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route path="/password/forget" element={<ForgetPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route path="/cart" element={<Cart />} />

        <Route
          path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />

        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              </Elements>
            }
          />
        )}

        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
