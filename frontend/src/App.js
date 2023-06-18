import React, { useEffect } from "react";
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

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Chilanka", "Droid Sans"],
      },
    });
    dispatch(loadUserDetails());
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
          element={<ProtectedRoute><MyProfile/></ProtectedRoute>}
        />
        <Route
          path="/me/update"
          element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
