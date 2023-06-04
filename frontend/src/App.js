import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import WebFont from "webfontloader";

import Header from "./component/layout/Header.js";
import Footer from "./component/layout/Footer.js";
import Home from "./component/layout/Home.js";

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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
