// ManagerSidebar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Manager.css";

const ManagerSidebar = ({ setView }) => {
  const navigate = useNavigate();

  return (
    <aside className="sidebar" data-testid="manager-sidebar">
      <h2 className="nav-left">Manager Panel</h2>    
      <ul>
        <li>
          <button data-testid="home-btn" onClick={() => setView("home")}>🏠 Home</button>
        </li>
        <li>
          <button data-testid="leave-requests-btn" onClick={() => setView("leave-requests")}>📝 Leave Requests</button>
        </li>
        <li>
        <button data-testid="employees-btn" onClick={() => setView ("employees")}>💼 Employees</button>
        </li>
        <li>
          <button data-testid="reports-btn" onClick={() => setView("reports")}>📊 Reports</button>
        </li>
        <li>
          <button data-testid="profile-btn" onClick={() => setView("profile")}>🧑 Profile</button>
        </li>

        
        {/* 
        <li style={{ marginTop: "auto" }}>
          <button className="logout-btn" onClick={() => navigate("/LoginForm")}>Logout</button>
        </li> */}
       
      </ul>
    </aside>
  );
};

export default ManagerSidebar;
