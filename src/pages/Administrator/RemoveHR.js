import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import "./remove.css"; // Page-specific styles

function RemoveHR() {
  return (
    <AdminLayout>
      <div>
        <RemoveHRForm />
      </div>
    </AdminLayout>
  );
}

const RemoveHRForm = () => {
  const [hrList, setHrList] = useState([]);
  const [selectedHR, setSelectedHR] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userList, setUserList] = useState([]);

  // Fetch HR data from backend
  const fetchHRs = () => {
    fetch("http://localhost:8080/hrs")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched HRs:", data);
        setHrList(data);
        console.log("HR List:", hrList);
        return fetch("http://localhost:8080/users");
      })
      .then((res) => res.json())
      .then((userData) => {
        setUserList(userData);
        console.log("Fetched Users:", userData);
      })
      .catch((error) => {
        console.error("Error fetching HRs:", error);
        setError("Failed to load HRs");
      });
  };

  useEffect(() => {
    fetchHRs();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedHR) {
      setLoading(true);
      fetch(`http://localhost:8080/hrs/${selectedHR}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            alert("HR and related User removed successfully");
            fetchHRs(); // refresh list after deletion
            setSelectedHR("");
          } else {
            alert("Failed to remove HR");
          }
        })
        .catch((err) => {
          console.error(err);
          alert("An error occurred while removing HR");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="admin-form-container1">
      <div className="form-header">
        <h1>Remove HR Personnel</h1>
        <h2>Select HR to Remove</h2>
        {error && <p className="error-message">{error}</p>}
      </div>

      <form className="admin-form-body" onSubmit={handleSubmit}>
        <select
          value={selectedHR}
          onChange={(e) => setSelectedHR(e.target.value)}
        >
          <option value="">Select HR</option>
          {/* {hrList.map((hr) => (
            <option key={hr.userid} value={hr.userid}>
              {hr.userid} -- {hr.email}{hr.user && hr.user.name ? `- ${hr.user.name}` : ""}
            </option>
          ))} */}
          {hrList.map((hr) => {
            const matchedUser = userList.find((user) => user.userid === hr.userid);
            console.log("matchedUser:", matchedUser);
            return (
              <option key={hr.userid} value={hr.userid}>
                {"ID: " + hr.userid} --- {"Name: " + (matchedUser?.name || "No name")} --- {"Salary: " + (matchedUser?.email || "No Email")}
              </option>

            );
          })}
        </select>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Removing..." : "Remove HR"}
        </button>
      </form>
    </div>
  );
};

export default RemoveHR;
