import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./Login2.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom"; // To navigate after successful login

const AdminLogin = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle login form submission
  const handleLogin = async (event) => {
    event.preventDefault();

    const response = await fetch(`http://localhost:8080/admins/login?name=${formData.username}&password=${formData.password}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  // Optional for query params, but included for consistency
      },
    });

    // Use text() instead of json() as the response is plain text
    const result = await response.text(); 

    if (response.ok) {
      alert(result);  // Show the plain text message from the backend
      navigate("/about-us");  // Redirect after successful login
    } else {
      alert(result || "Login failed");  // Display error message if the login failed
    }
};


  

  return (
    <div className="login-container">
      <button className="back-button" onClick={() => navigate('/')}>
        ⏮️Back
      </button>
      <div className="login-form-wrapper">
        <h1>Admin Login</h1>

        <form onSubmit={handleLogin}>
          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <FaUser className="icon" />
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <FaLock className="icon" />
          </div>

          <div className="remember-forget">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forget password?</a>
          </div>

          <div className="spacer"></div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
