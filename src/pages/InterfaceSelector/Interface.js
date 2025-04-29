import React from "react";
import { useNavigate } from "react-router-dom";
import "./InterfaceSelector.css"; // Import custom styles

const Interface = () => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    switch (role) {
      case "Administrator":
        navigate("/login-admin");
        break;
      case "HR":
        navigate("/login-hr"); //fixed
        break;
      case "Manager":
        navigate("/manager-login");
        break;
      case "Employee":
        navigate("/employee-login");
        break;
      default:
        break;
    }
  };

  const roles = ["Administrator", "HR", "Manager", "Employee"];

  return (
    <div className="interface-bg interface-container">
      <div className="interface-box">
        <h1 className="interface-title">Select Your Role</h1>

        <div className="role-button-group">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => handleSelect(role)}
              className="role-button"
            >
              {role}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Interface;