// Profile.jsx
import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [employee, setEmployee] = useState(null);
  const userId = localStorage.getItem("managerId");

  useEffect(() => {
    if (!userId) return;

    // Fetch employee details first
    fetch(`http://localhost:8080/managers/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch employee data");
        return res.json();
      })
      .then((empData) => setEmployee(empData))
      .catch((err) => console.error(err));

    // Then fetch user profile
    fetch(`http://localhost:8080/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user data");
        return res.json();
      })
      .then((userData) => setUser(userData))
      .catch((err) => console.error(err));
  }, [userId]);

  if (!user || !employee) {
    return <div className="content-section Profile-section">Loading profile...</div>;
  }

  return (

    <div>
      <h1 className="profile-title">🧑 Manager Profile</h1>
      
    <div className="content-section Profile-section">

      {/* <p className="profile-subtitle">
        Here you can manage staff, view reports, and handle leave requests.
      </p> */} 


      <div className="profile-details">
        <div className="profile-item">
          <strong>Name:</strong> {user.name}
        </div>
        <div className="profile-item">
          <strong>Email:</strong> {user.email}
        </div>
        <div className="profile-item">
          <strong>Salary:</strong> {employee.salary}</div>
        <div className="profile-item">
          <strong>Department:</strong> {employee.deptid}</div>
      </div>
    </div>
    </div>
  );
};

export default Profile;
