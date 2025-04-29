// src/pages/LeaveApproval.js
import React, { useState, useEffect } from "react";
import EmployeeLayout from "../../components/EmployeeLayout";
import LeaveRequestCard from "../../components/LeaveRequestCard";
import { Tabs, TabsList, TabsTrigger } from "../../components/tabs";
import "./LeaveApproval.css";

const LeaveApproval = ({ userId = 1 }) => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");  // Default to 'all' tab
  userId=localStorage.getItem("employeeId");
  // Function to fetch leave requests based on status
  const fetchLeaveRequests = async (status) => {
    try {
      setLoading(true);  // Set loading state before fetching data
      const response = await fetch(
        `http://localhost:8080/leaves/allStatus?userId=${userId}&status=${status}`
      );
      if (!response.ok) {
        throw new Error("Error fetching leave requests");
      }
      const data = await response.json();
      setLeaveRequests(data);  // Set leave requests in state
      console.log("salary Data:", data);
      setLoading(false);  // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching leave requests:", error);
      setLoading(false);
    }
  };

  // Fetch leave requests based on activeTab value
  useEffect(() => {
    fetchLeaveRequests(activeTab);  // Fetch leave requests when the tab changes
  }, [activeTab]);  // This will trigger whenever activeTab changes

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <EmployeeLayout>
      <div className="leave-approval-container">
        {/* Tab Buttons */}
        <Tabs>
          <TabsList className="tab-buttons">
            <TabsTrigger
              className={activeTab === "approved" ? "active-tab" : ""}
              onClick={() => setActiveTab("approved")}
            >
              Approved
            </TabsTrigger>
            <TabsTrigger
              className={activeTab === "pending" ? "active-tab" : ""}
              onClick={() => setActiveTab("pending")}
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              className={activeTab === "rejected" ? "active-tab" : ""}
              onClick={() => setActiveTab("rejected")}
            >
              Rejected
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Loading state */}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="leave-requests-container">
            {leaveRequests.length === 0 ? (
              <div>No leave requests found.</div>
            ) : (
              leaveRequests.map((request) => (
                <LeaveRequestCard
                  key={request.id}
                  request={request}
                  formatDate={formatDate}
                />
              ))
            )}
          </div>
        )}
      </div>
    </EmployeeLayout>
  );
};

export default LeaveApproval;
