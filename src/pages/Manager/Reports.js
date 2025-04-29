
import React, { useState , useEffect }  from "react";
import "./Reports.css"


const Reports = () => {
  const [departmentUsers, setDepartmentUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [leaves, setLeaves] = useState([]);
  const [noData, setNoData] = useState(false);

  const months = [
    { value: 1, name: "January" },
    { value: 2, name: "February" },
    { value: 3, name: "March" },
    { value: 4, name: "April" },
    { value: 5, name: "May" },
    { value: 6, name: "June" },
    { value: 7, name: "July" },
    { value: 8, name: "August" },
    { value: 9, name: "September" },
    { value: 10, name: "October" },
    { value: 11, name: "November" },
    { value: 12, name: "December" },
  ];

  useEffect(() => {
    const departmentId = localStorage.getItem("departmentId");
    if (departmentId) {
      fetch(`http://localhost:8080/employees/users/department/${departmentId}`)
        .then((res) => res.json())
        .then((data) => setDepartmentUsers(data))
        .catch((err) => console.error("Failed to fetch users:", err));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLeaves([]);
    setNoData(false);

    if (userId && month && year) {
      const response = await fetch(
        `http://localhost:8080/leaves/byUserAndMonthYear?userId=${userId}&month=${month}&year=${year}`
      );
      if (response.status === 204) {
        setNoData(true);
      } else {
        const data = await response.json();
        setLeaves(data);
      }
    }
  };

  return (
    <div className="content-section Reports-section" >
        <h1>📊 Leave Reports</h1>
    
    <div className="report-container">
      
      <p>View the leave pattern of an employee</p>
      <form className="report-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>User ID</label>
          <select value={userId} onChange={(e) => setUserId(e.target.value)} required>
            <option value="">-- Select User ID --</option>
            {departmentUsers.map((user) => (
              <option key={user.userid} value={user.userid}>
                {user.userid} - {user.name}
              </option>
            ) )}
          </select>
        </div>

        <div className="form-group">
          <label>Month</label>
          <select value={month} onChange={(e) => setMonth(e.target.value)} required>
            <option value="">-- Select Month --</option>
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Year</label>
          <select value={year} onChange={(e) => setYear(e.target.value)} required>
            <option value="">-- Select Year --</option>
            {[2023, 2024, 2025].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <button className="report-button" type="submit">Generate Report</button>
      </form>

      {noData && <p className="no-data">❌ No leave records found for the selected user and date.</p>}

      {leaves.length > 0 && (
        <div className="table-scroll-container">
        <table className="report-table">
          <thead>
            <tr>
              <th>Leave ID</th>
              <th>Date</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.id}</td>
                <td>{leave.leaveDate}</td>
                <td>{leave.reason}</td>
                <td>{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      )}
    </div>
    
    </div>
  );
};


export default Reports  ;