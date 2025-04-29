import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import './HRSidebar.css'; // Sidebar styling

const HRSidebar = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <aside className="sidebar" data-testid="hr-sidebar">
      <h2 className="nav-left">HR Panel</h2>
      <ul>
        {/* Clicking the button will navigate to the respective page */}
        <li><button data-testid="payroll-btn" onClick={() => navigate("/payroll-processing")}>🏠 Payroll Processing</button></li>
        <li><button data-testid="emp-removal-btn" onClick={() => navigate("/emp-removal")}>📝Employee Removal</button></li>
        <li><button data-testid="leave-reports-btn" onClick={() => navigate("/leave-reports")}>💼 Leave Reports</button></li>
        <li><button data-testid="add-emp-btn" onClick={() => navigate("/add-emp")}>🧑 Add Employee</button></li>
        

        {/* Uncomment for Logout functionality if needed */}
        {/* <li style={{ marginTop: "auto" }}>
          <button className="logout-btn" onClick={() => navigate("/eLoginForm")}>Logout</button>
        </li> */}
      </ul>
    </aside>
  );
};

export default HRSidebar;
