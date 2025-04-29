import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import './Admin.css'; // Sidebar styling

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <aside className="sidebar" data-testid="admin-sidebar">
      <h2 className="nav-left">Admin Panel</h2>
      <ul>
        {/* Clicking the button will navigate to the respective page */}
        
        <li><button onClick={() => navigate("/about-us")}>🏠 About Us</button></li>
        <li><button onClick={() => navigate("/remove-hr")}>🤐Remove HR</button></li>
        
        <li><button onClick={() => navigate("/add-hr")}>🕵️Add HR</button></li>
        <li><button onClick={() => navigate("/add-manager")}>💼 Add Manager</button></li>
        <li><button onClick={() => navigate("/remove-manager")}>🐥 Remove Manager</button></li>
        <li><button onClick={() => navigate("/admin-view-hr")}>🧑‍💼 View HR</button></li>
        <li><button onClick={() => navigate("/admin-view-manager")}>👩‍💻 View Manager</button></li>
        {/* Uncomment for Logout functionality if needed */}
        {/* <li style={{ marginTop: "auto" }}>
          <button className="logout-btn" onClick={() => navigate("/LoginAdmin")}>Logout</button>
        </li> */}
      </ul>
    </aside>
  );
};

export default Sidebar;
