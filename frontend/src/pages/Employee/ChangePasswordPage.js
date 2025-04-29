import React, { useState } from "react";
import Layout from "../../components/EmployeeLayout";
import "./changePassword.css";
import { useLocation } from "react-router-dom";

const ChangePasswordPage = () => {
  const location = useLocation();
  const userId = location.state?.userId;

  //  Call all hooks at the top (before any early return)
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  //  Don't return before hooks — instead render a message inside JSX
  if (!userId) {
    return (
      <Layout>
        <div className="content-section1">
          <h2>User ID not provided</h2>
        </div>
      </Layout>
    );
  }

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/users/${userId}/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      setMessage("Password updated successfully!");
    } catch (error) {
      setMessage("Error updating password: " + error.message);
    }
  };

  return (
    <Layout>
      <div className="content-section1">
        <h2>Change Password</h2>
        <div className="form-group">
          <label>Current Password</label>
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button onClick={handleChangePassword}>Submit</button>
        <p>{message}</p>
      </div>
    </Layout>
  );
};

export default ChangePasswordPage;
