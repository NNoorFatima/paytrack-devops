// ManagerDashboard.js
import React, { useState , useEffect } from "react";
import ManagerLayout from "../../components/ManagerLayout"; // Import ManagerLayout
import "./HomePage.css"; // Keeping the existing styles
import "./EmployeeSection.css"; // custom styles here
// import "./HomeSection.css";
import "./LeaveRequestSection.css"; 
// import "./Reports.css";


import Home from "./Home.js"; 
import Reports from "./Reports.js";
import Profile from "./Profile.js";



const ManagerDashboard = () => {
  const [view, setView] = useState("home"); // Control the displayed content

  return (
    <ManagerLayout setView={setView}>
      <div className="dashboard-content">
        {view === "home" && <Home />}
        {view === "leave-requests" && <LeaveRequests />}
        {view === "employees" && <Employees />}
        {view === "reports" && <Reports />}
        {view === "profile" && <Profile />}
      </div>
    </ManagerLayout>
  );
};

// Home Section
// const Home = () => (
//   <div className="content-section Home-section">
//     <h1>Welcome to the Manager Dashboard</h1>
//     <p>Here you can manage staff, view reports, and handle leave requests.</p>
//   </div>
// );



// Employees Section 
const Employees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const departmentId = localStorage.getItem("departmentId");
  
    if (departmentId) {
      fetch(`http://localhost:8080/employees/users/department/${departmentId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Data fetched:", data);
          const formatted = data.map((emp) => ({
            id: emp.userid,
            name: emp.name,
            email: emp.email,
            dateOfJoin: emp.date_of_join,
            address: emp.address
          }));
          setEmployees(formatted);
        })
        .catch((err) => console.error("Error fetching employees:", err));
    }
  }, []);
  
  return (
    <div className="content-section employees-section">
      <h1>💼 Employees List</h1>
      <div className="table-wrapper">
        <table className="employees-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date of Joining</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.dateOfJoin}</td>
                <td>{emp.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


// Leave requests Section
const LeaveRequests = () => {
  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const departmentId = localStorage.getItem("departmentId");
    const status = "Pending";

    if (departmentId) {
      fetch(
        `http://localhost:8080/leaves/byDeptAndStatus?deptId=${departmentId}&status=${status}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Leave Requests fetched:", data);
          const formatted = data.map((item, index) => ({
            id: index + 1,
            name: item[0],           // user's name
            leaveDetails: item[1],   // leave object
          }));
          setReports(formatted);
        })
        .catch((err) => console.error("Error fetching reports:", err));
    }
  }, []);

  const openModal = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedReport(null);
    setShowModal(false);
  };

  const handleModalAction = async (newStatus) => {
    const { leaveDetails } = selectedReport;
    try {
      const response = await fetch(
        `http://localhost:8080/leaves/${leaveDetails.id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!response.ok) throw new Error("Failed to update status");
      const updatedLeave = await response.json();

      setReports((prev) =>
        prev.map((r) =>
          r.leaveDetails.id === updatedLeave.id
            ? { ...r, leaveDetails: { ...r.leaveDetails, status: updatedLeave.status } }
            : r
        )
      );
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Error updating leave status. Please try again.");
    }
  };

  return (
    <div className="content-section LeaveRequest-section">
      <h1>📝 Pending Leave Requests</h1>
      <div className="table-wrapper">
        <table className="LeaveRequest-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>User ID</th>
              <th>Leave Date</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>
                  <span
                    className="name-cell"
                    onClick={() => openModal(report)}
                  >
                    {report.name}
                  </span>
                </td>
                <td>{report.leaveDetails.userId}</td>
                <td>{report.leaveDetails.leaveDate}</td>
                <td>{report.leaveDetails.reason}</td>
                <td>{report.leaveDetails.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedReport && (
        <div className="modal-overlay">
          <div className="modal">
            <p>
              Do you want to <strong>Accept</strong> or{' '}
              <strong>Reject</strong> the leave request for :
              
               <em>
                 {selectedReport.name}
              </em>?
            </p>
            <div className="modal-buttons">
              <button onClick={() => handleModalAction("Approved")}>Accept</button>
              <button onClick={() => handleModalAction("Rejected")}>Reject</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default ManagerDashboard;
