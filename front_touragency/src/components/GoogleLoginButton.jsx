import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../google.png"

const GoogleLoginButton = () => {

  const handleGoogleLogin = async () => {
    window.location.href = "http://localhost:8080/api/auth/google";
  };

  return <button onClick={handleGoogleLogin}><img src={logo} width="25px"/></button>;
};

export default GoogleLoginButton;
