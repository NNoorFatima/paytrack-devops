import { Link } from "react-router-dom";
import React from "react";
import Sidebar from "./EmployeeSidebar"; // Import the Sidebar for Employee
import "./EmployeeSidebar.css"; // Import your custom CSS styles for Employee
import backgroundImg from "../images/leavreq.jpeg"; // Import background image

// The layout component that wraps the entire employee dashboard
const EmployeeLayout = ({ children }) => {
  return (
    <div className="dashboard-container" data-testid="employee-dashboard-container">
      {/* Background Image */}
      <div className="dashboard-background" data-testid="employee-dashboard-background" style={{ backgroundImage: `url(${backgroundImg})` }}></div>

      {/* Frosted Glass Effect Wrapper */}
      <div className="frosted-glass">
        {/* Top Navigation */}
        <header className="top-nav">
          <div className="nav-left">
            
          </div>
          <div className="nav-right">
            {/* <a href="#" className="nav-link">Profile</a> */}
            <Link to="/profile" className="nav-link" data-testid="employee-profile-link">Profile</Link>
            <Link to="/employee-login" className="nav-link logout-btn" data-testid="employee-logout-link">Logout</Link>
          </div>
        </header>

        {/* Sidebar and Main Content */}
        <div className="dashboard-content">
          <Sidebar /> 
          <main className="main-content" data-testid="employee-main-content">
            {children} {/* Dynamic content */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLayout;
