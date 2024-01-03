import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Navbar from "./Components/NavBar/Navbar";
import Product from "./Pages/Product/Product";
import FinalCart from "./Pages/FinalCart/FinalCart";
import Add from "./Pages/Add/Add";
import Display from "./Pages/Display/Display";
import Admin from "./Pages/AdminPage/Admin";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/SignUp/Signup";
import YourMainComponent from "./Pages/Payment/Payment";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const token = localStorage.getItem("token");
  
  const useAuth = () => {
    return token ? true : false;
  };

  const ProtectedRoutes = () => {
    const isAuth = useAuth();
    if (isAuth === true && window.location.pathname === "/login") {
      return <Navigate to="/" />;
    } else if (isAuth === false) {
      return <Navigate to="/login" />;
    } else {
      return <Outlet />;
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        <Route path="/navbar" element={<Navbar />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/cart" element={<FinalCart />} />
            <Route path="/add" element={<Add />} />
            <Route path="/display" element={<Display />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
