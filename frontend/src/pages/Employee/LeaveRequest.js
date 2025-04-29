import React, { useState } from "react";
import Layout from "../../components/EmployeeLayout";
import background from "../../images/leavreq.jpeg"; // Background image if you want to use it
import "./LeaveRequest.css"; // Your custom CSS

function LeaveRequest() {
  return (
    <Layout> 
      {/* <div className="leave-request-container"> */}
      <div>
        <LeaveRequestForm />
      </div>
    </Layout>
  );
}

const LeaveRequestForm = () => {
  const [formData, setFormData] = useState({
    //leaveType: "Sick Leave",
    // fromDate: "",
    userId: localStorage.getItem("employeeId"),
    toDate: "",
    reason: "",
    status: "Pending"
  });

  const [formErrors, setFormErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    // if (!formData.fromDate) errors.fromDate = "From date is required.";
    const today = new Date().toISOString().split('T')[0]; // Get today's date in yyyy-MM-dd format

  if (!formData.toDate) errors.toDate = "To date is required.";
  else if (formData.toDate < today) errors.toDate = "The leave date cannot be in the past."; // Validate the date

    if (!formData.reason) errors.reason = "Reason for leave is required.";
    return errors;
  };

  const handleSubmit = (e) => {
    const userId = localStorage.getItem("employeeId");; // Assuming you have the logged-in user's ID
    e.preventDefault();
    const errors = validateForm();
  
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors); // Display errors
      setSubmissionMessage(""); // Clear previous message

    } else {
      setFormErrors({});
      try {
        const formDataWithUser = { 
          ...formData,
          leaveDate: formData.toDate, // Map to the correct field
          userId: userId,
        };
        
     
        fetch(`http://localhost:8080/leaves`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataWithUser), // Send formData without userId
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to submit leave request.");
            }
            return response.json();
          })
          .then((result) => {
            setSubmissionMessage("Your leave request has been submitted successfully!");
            console.log("Server response:", result);
            setFormData({
              userId:localStorage.getItem("employeeId"),
              toDate: "",
              reason: "",
              status: "Pending",
            });
          })
          .catch((error) => {
            console.error("Error submitting leave request:", error);
            setSubmissionMessage("Failed to submit leave request. Please try again.");
          });
      } catch (error) {
        console.error("Error submitting leave request:", error);
        setSubmissionMessage("Failed to submit leave request. Please try again.");
      }
    }
  };
  
  

  return (
    <div className="leave-request-form-container">
      <h2>Leave Application</h2>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label>Leave Type</label>
          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
          >
            <option value="Casual Leave">Casual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Annual Leave">Annual Leave</option>
          </select>
        </div> */}

        {/* <div>
          <label>From</label>
          <input
            type="date"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleChange}
          />
          {formErrors.fromDate && <p className="error">{formErrors.fromDate}</p>}
        </div> */}

        <div>
          <label>Date</label>
          <input
            type="date"
            name="toDate"
            value={formData.toDate}
            onChange={handleChange}
          />
          {formErrors.toDate && <p className="error">{formErrors.toDate}</p>}
        </div>

        <div>
          <label>Reason for Leave</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Enter your reason..."
          />
          {formErrors.reason && <p className="error">{formErrors.reason}</p>}
        </div>

        <div>
          <button type="submit">Apply</button>
        </div>
      </form>

      {submissionMessage && <div className="success-message">{submissionMessage}</div>}
    </div>
  );
};

export default LeaveRequest;
