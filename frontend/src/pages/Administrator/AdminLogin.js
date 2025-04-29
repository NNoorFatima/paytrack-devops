import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import "../../App.css";

// import "./LoginForm.css"; // Updated CSS for the frosted-glass effect


const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Handle input changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Username should only contain letters & numbers (no special characters)
    if (name === "username" && !/^[A-Za-z0-9]*$/.test(value)) {
      alert("Username can only contain letters and numbers.");
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // Handle login form submission
  const handleLogin = (event) => {
    event.preventDefault();

    // Validate Username (Only Letters & Numbers)
    if (!/^[A-Za-z0-9]+$/.test(formData.username)) {
      alert("Username should only contain letters and numbers.");
      return;
    }

    // Validate Password (Min 8 Characters, 1 Letter, 1 Number, 1 Symbol)
    if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(formData.password)) {
      alert("Password must be at least 8 characters long and contain a letter, a number, and a special character.");
      return;
    }

    alert("Login successful! Redirecting to About Us...");
    navigate("/about-us");
  };

  return (
    <div className="login-container"> {/* Background image wrapper */}
      <div className="wrapper"> {/* Frosted-glass effect */}
        <form onSubmit={handleLogin}>
          <h1>Login</h1>

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

          <div className="spacer"></div> {/* Adjust spacing */}
          <button type="submit">Login</button>
          
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;