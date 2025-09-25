import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import NavigationBar from "./components/NavigationBar.jsx";
import ToursPage from "./pages/Tour/TourPage.jsx";
import TourDetailPage from "./pages/Tour/TourDetailPage.jsx";
import OrderPage from "./pages/Order/OrderPage.jsx";
import OrdersPage from "./pages/Order/OrdersPage.jsx";
import OrderDetailPage from "./pages/Order/OrderDetailPage.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import UserOrdersPage from "./pages/User/UserOrdersPage.jsx";
import Footer from "./components/Footer.jsx";
import ReviewsPage from "./pages/Review/ReviewsPage.jsx";
import ReviewDetailPage from "./pages/Review/ReviewDetailPage.jsx";
import RegisterPage from "./pages/Auth/RegisterPage.jsx";
import UsersPage from "./pages/User/UsersPage.jsx";
import UserDetailPage from "./pages/User/UserDetailPage.jsx";
import GoogleHandler from "./pages/Auth/GoogleLoginPage.jsx";

function App() {
  return (
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/googleHandle" element={<GoogleHandler />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<ToursPage />} />
          <Route path="/tour/:id" element={<TourDetailPage />} />
          <Route path="/tour/:id/order" element={<OrderPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderDetailPage />} />
          <Route path="/user/:id/orders" element={<UserOrdersPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/reviews/:id" element={<ReviewDetailPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
        </Routes>
        <Footer />
      </Router>
  );
}

export default App;
