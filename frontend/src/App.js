import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import WebFont from "webfontloader";

import Header from "./component/layout/Header.js";
import Footer from "./component/layout/Footer.js";
import Home from "./component/layout/Home.js";
import ProductDetails from "./component/layout/ProductDetails.js";
import Products from "./component/Products.js";
import Search from "./component/Search.js";

function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Chilanka", "Droid Sans"],
      },
    });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
      <Route extact path="/" Component={Home}/>
      <Route extact path="/home" Component={Home}/>
      <Route extact path="/product/:id" Component={ProductDetails}/>
      <Route extact path="/products" Component={Products}/>
      <Route  path="/products/:keyword" Component={Products}/>
      <Route extact path="/search" Component={Search}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
