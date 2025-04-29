import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import "./LoginForm.css"; // Updated CSS for the frosted-glass effect


const ManagerLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Handle input changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Username should only contain letters & numbers (no special characters)
    // if (name === "username" && !/^[A-Za-z0-9]*$/.test(value)) {
    //   alert("Username can only contain letters and numbers.");
    //   return;
    // }

    setFormData({ ...formData, [name]: value });
  };

  // Handle login form submission
  const handleLogin = async (event) => {
    event.preventDefault();

    // // Validate Username (Only Letters & Numbers)
    // if (!/^[A-Za-z0-9]+$/.test(formData.username)) {
    //   alert("Username should only contain letters and numbers.");
    //   return;
    // }

    // Validate Password (Min 8 Characters, 1 Letter, 1 Number, 1 Symbol)
    // if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(formData.password)) {
    //   alert("Password must be at least 8 characters long and contain a letter, a number, and a special character.");
    //   return;
    // }

    // alert("Login successful! Redirecting to Manager Dashboard...");
    try {
      // Make an API call to check if the user exists and the password is correct
      const response = await fetch("http://localhost:8080/managers/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if the response is OK (user exists and password is correct)
      if (response.ok) {
        // Logic: parse the response and store the user ID for future API calls
        const data = await response.json();
        localStorage.setItem("managerId", data.managerId); 
        localStorage.setItem("departmentId", data.departmentId); 
        

        // alert("Login successful! Redirecting to Manager Dashboard...");
        navigate("/manager-dashboard");
      } else {
        // If not OK, display an alert with an error message
        alert("Incorrect username or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
    
  };

  return (
    <div className="login-container"> {/* Background image wrapper */}
    <button className="back-button" onClick={() => navigate('/')}>
        ⏮️Back
      </button>
      <div className="wrapper"> {/* Frosted-glass effect */}
        <form onSubmit={handleLogin}>
          <h1>Manager Login</h1>

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

export default ManagerLogin;
