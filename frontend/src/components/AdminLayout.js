import React from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar"; // Correct import
import "./Admin.css";
import backgroundImg from "../images/leavreq.jpeg";

const AdminLayout = ({ children }) => {
  return (
    <div className="dashboard-container" data-testid="dashboard-container">
      <div className="dashboard-background" data-testid="dashboard-background" style={{ backgroundImage: `url(${backgroundImg})` }}></div>
      <div className="frosted-glass">
        <header className="top-nav">
          <div className="nav-left"></div>
          <div className="nav-right">
            {/* <a href="#" className="nav-link">Profile</a> */}
            <Link to="/about-us" className="nav-link">About Us</Link>
            <Link to="/login-admin" className="nav-link logout-btn">Logout</Link>
          </div>
        </header>
        <div className="dashboard-content">
          <AdminSidebar /> {/* fixed */}
          <main className="main-content">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
