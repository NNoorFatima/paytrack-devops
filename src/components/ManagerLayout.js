// ManagerLayout.js
import React from "react";
import { useNavigate } from "react-router-dom";
import ManagerSidebar from "./ManagerSidebar"; // Import the Sidebar
import "./Manager.css"; // Import your CSS styles
import backgroundImg from "../images/leavreq.jpeg"; // Import background image

// The layout component that wraps the entire dashboard
const ManagerLayout = ({ children, setView }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container" data-testid="manager-layout">
      {/* Background Image */}
      <div
        className="dashboard-background"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      ></div>

      {/* Frosted Glass Effect Wrapper */}
      <div className="frosted-glass">
        {/* Top Navigation */}
        <header className="top-nav">
          <div className="nav-left">
            {/* Title or logo */}
          </div>
          <div className="nav-right">
            {/* <a href="#" className="nav-link">
              Profile
            </a> */}
            <a
              href="#"
              className="nav-link logout-btn"
              data-testid="manager-logout-btn"
              onClick={(e) => {
                e.preventDefault();
                navigate("/manager-login");
              }}
            >
              Logout
            </a>
          </div>
        </header>

        {/* Sidebar and Main Content */}
        <div className="dashboard-content">
          {/* Pass the setView prop to ManagerSidebar */}
          <ManagerSidebar setView={setView} />
          <main className="main-content" data-testid="manager-content">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default ManagerLayout;
