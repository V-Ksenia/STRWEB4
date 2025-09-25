import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import GoogleLoginButton from "../../components/GoogleLoginButton.jsx";
import "./LoginPage.css";


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const userData = await response.json();
      console.log(userData);
      setUser(userData);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="loginContainer">
      <h1 style={{
        fontSize: "40px",
        color: "rgb(255, 255, 255)"
      }}>Login</h1>
      <form onSubmit={handleSubmit} className="loginForm">
        <p>
          Username
        </p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        <br />
        <p>
          Password
        </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div style={{
          display: "flex",
          gap: "20px"
        }}>
          <button type="submit">Sign in</button>
          <GoogleLoginButton />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
