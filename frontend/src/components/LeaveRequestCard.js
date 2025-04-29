// src/components/LeaveRequestCard.js
import React from "react";
import { Badge } from "./badge";

const LeaveRequestCard = ({ request, formatDate }) => {
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "🎊";
      case "pending":
        return "👻";
      case "rejected":
        return "🤡";
      default:
        return "ℹ️";
    }
  };

  return (
    <div className="leave-request-card" data-testid="leave-request-card">
      <h3 data-testid="leave-type">{request.type}</h3>
      <p data-testid="leave-date">Leave Date: {formatDate(request.leaveDate)}</p>
      {/* <p>Status: <strong>{request.status}</strong></p> */}
      <p data-testid="leave-status">
        Status: <Badge className={request.status.toLowerCase()} data-testid={`status-badge-${request.status.toLowerCase()}`}>
                  {getStatusIcon(request.status)} {request.status}
                </Badge>
      </p>

      <p data-testid="leave-reason">Reason: <i>{request.reason}</i></p>
      {request.status.toLowerCase() !== "pending" && (
        <>
          {request.comments && <p data-testid="leave-comments">Comments: {request.comments}</p>}
        </>
      )}
    </div>
  );
};

export default LeaveRequestCard;
