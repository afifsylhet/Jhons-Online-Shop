import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (isLoading) {
    navigate("/login");
  } else if (!isAuthenticated) {
    navigate("/login");
  } else {
    return children;
  }
};


export default ProtectedRoute;
