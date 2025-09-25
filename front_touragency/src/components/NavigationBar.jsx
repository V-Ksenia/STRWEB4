import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";
import CompanyLogo from "./CompanyLogo.jsx";
import "./NavigationBar.css";

const NavigationBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <CompanyLogo />
      {user ? (
        <>
          <span style={{
            position: "absolute",
            right: "30px",
            fontWeight: "bold"
          }}>
            Welcome, <a href={`/users/${user.details._id}`}>{user.details.username}</a>
            <img
              src={`${user.details.img || "http://localhost:8080/contact.png"}`}
              width="30px"
            />
          </span>
        </>
      ) : (
        <>
        <ul>
          <li>
          <a href="/login">Login</a>
          </li>
          <li>
          <a href="/register">Register</a>
          </li>
          </ul>
        </>
      )}
      <ul>
        {user && 
        <>
            <a href="/" onClick={logout}>Logout</a>
          <li>
          <a href={`/user/${user.details._id}/orders`}>My orders</a>
          </li>
        </>
        }
        <li>
          <a href="/">Tours</a>
        </li>
        <li>
          <a href="/reviews">Reviews</a>
        </li>
      </ul>
        {user && user.isAdmin && (
          <>
            <ul>
              <li><a href="/orders">All orders</a></li>
              <li><a href="/users">All users</a></li>
            </ul>
          </>
        )}
      
    </nav>
  );
};

export default NavigationBar;
