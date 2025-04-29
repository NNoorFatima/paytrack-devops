import React from "react";
import LeaveRequestCard from "./LeaveRequestCard";
import "./LeaveRequestCard.css";

const LeaveRequestsTab = ({ value, requests, formatDate, emptyMessage }) => {
  return (
    <div className="leave-request-card-container">
      {requests.length === 0 ? (
        <div className="empty-card">{emptyMessage}</div>
      ) : (
        requests.map((request) => (
          <LeaveRequestCard
            key={request.id}
            request={request}
            formatDate={formatDate}
          />
        ))
      )}
    </div>
  );
};

export default LeaveRequestsTab;
