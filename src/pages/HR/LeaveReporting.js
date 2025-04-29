import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";
import HRLayout from "../../components/HRLayout";


import "./LeaveReporting.css";
import axios from "axios";

const LeaveReporting = () => {
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/hrs/leave-counts")
      .then((response) => {
        setReportData(response.data); // Update the reportData state
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch data"); // Set error message if request fails
      });
  }, []);


  // Get the max leave count (check if data exists)
const maxLeaves = reportData.length > 0 ? Math.max(...reportData.map(d => d.totalLeaves || 0)) : 0;

return (
    <HRLayout>
    <div className="leave-reporting-container">
    <h1 className="leave-reporting-heading">HR Leave Reporting</h1>

      {/* Display error message if request fails */}
    {error && <p className="error-message">{error}</p>}

      {/* <table className="leave-reporting-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Total Leaves</th>
          </tr>
        </thead>
        <tbody>
          {reportData.length > 0 ? (
            reportData.map((item, index) => (
              <tr key={index}>
                <td>{item.employeeName}</td>
                <td>{item.totalLeaves}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No data available</td>
            </tr>
          )}
        </tbody>
      </table> */}

      <div className="chart-container">
        <h2>Total Leaves per Employee</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={reportData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="employeeName" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalLeaves" name="Total Leaves">
              {reportData.map((entry, index) => (
                // <Cell key={cell-${index}} fill={entry.totalLeaves === maxLeaves ? "#FF5733" : "#8884d8"} />
                <Cell key={`cell-${index}`} fill={entry.totalLeaves === maxLeaves ? "#FF5733" : "#8884d8"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    </HRLayout>
  );
};

export default LeaveReporting;