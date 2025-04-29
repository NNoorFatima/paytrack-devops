import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import "./LoginForm.css"; // Updated CSS for the frosted-glass effect

const EmployeeLogin = () => {
  const navigate = useNavigate();

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

    try {
      const response = await fetch("http://localhost:8080/employees/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("employeeId", data.employeeId);
        localStorage.setItem("departmentId", data.departmentId);
        navigate("/profile");
      } else {
        alert("Incorrect username or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    // <div className="page-wrapper">
      
  
      <div className="login-container">
        {/* Back Button outside the login container */}
      <button className="back-button" onClick={() => navigate('/')}>
        ⏮️Back
      </button>
        <div className="wrapper">
          <form onSubmit={handleLogin}>
            <h1>Employee Login</h1>
  
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
    // </div>
  );
  
};

export default EmployeeLogin;
