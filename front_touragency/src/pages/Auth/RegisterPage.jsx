import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";


function validatePhoneNumber(phoneNumber) {
  const phoneRegex = /^(8|\+375)(\s|\()?(\d{2})(\s|\))?(\d{3})(\s|\-)?(\d{2})(\s|\-)?(\d{2})$/;
  if (phoneRegex.test(phoneNumber)) {
    return { isValid: true, message: "Valid phone number." };
  } else {
    return { isValid: false, message: "Invalid phone number." };
  }
}

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(email)) {
    return { isValid: true, message: "Valid email address." };
  } else {
    return { isValid: false, message: "Invalid email address." };
  }
}

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState(null);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImg(reader.result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setEmailError("");
    setPhoneError("");

 
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.message);
      return;
    }

   
    const phoneValidation = validatePhoneNumber(phone);
    if (!phoneValidation.isValid) {
      setPhoneError(phoneValidation.message);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, firstname, lastname, email, phone, address, password, img }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="loginContainer">
      <h1 style={{
        fontSize: "40px",
        color: "rgb(255, 255, 255)"
      }}>Register</h1>
      <form onSubmit={handleSubmit} className="registerForm">
          <b>
            Username </b>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          <b>
            First Name: </b>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          <b>
            Last Name: </b>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          <b>
            Email:     </b>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />    
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          <b>
            Phone:</b>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />         
          {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}
          <b>
            Address:</b>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          <b>
            Password:</b>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          <b>
            Profile Image (Optional):</b>
            <input type="file" onChange={handleFileChange} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
