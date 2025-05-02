import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import axios from "axios";
import "./remove.css"; 

const API_BASE = process.env.REACT_APP_API_URL;
function RemoveManager() {
  return (
    <AdminLayout>
      <div>
        <RemoveManagerForm />
      </div>
    </AdminLayout>
  );
}

const RemoveManagerForm = () => {
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userList, setUserList] = useState([]);
  // Fetch manager list
  useEffect(() => {
    axios
      .get(`${API_BASE}/managers/`)
      .then((response) => {
        setManagers(response.data);
      // Fetch users after employees are fetched
      return fetch(`${API_BASE}/users/`);
    })
    .then((res) => res.json())
    .then((userData) => {
      setUserList(userData);
    })
      .catch((error) => {
        console.error("Error fetching managers:", error);
      });
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!selectedManager) {
      setMessage("Please select a Manager ID to delete.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Step 1: Delete from manager table
      await axios.delete(`${API_BASE}/managers/${selectedManager}`);

      // Step 2: Delete from user table
      await axios.delete(`${API_BASE}/users/${selectedManager}`);

      setMessage("Manager and associated User successfully removed.");
      // Refresh list after delete
      setManagers(managers.filter((m) => m.userid !== parseInt(selectedManager)));
      setSelectedManager("");
    } catch (error) {
      console.error("Error deleting manager/user:", error);
      setMessage("Error occurred during deletion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-container1">
      <div className="form-header">
        <h1>Remove Manager Personnel</h1>
        <h2>Select Manager to Remove</h2>
      </div>

      <form className="admin-form-body" onSubmit={handleDelete}>
      <select
  value={selectedManager}
  onChange={(e) => setSelectedManager(e.target.value)}
  required
>
  <option value="">Select Manager ID</option>
  {/* {managers.map((m) => (
    <option key={m.userid} value={m.userid}>
      {m.userid}
    </option>
  ))} */}
  {managers.map((m) => {
            const matchedUser = userList.find((user) => user.userid === m.userid);
            console.log("matchedUser:", matchedUser);
            return (
              <option key={m.userid} value={m.userid}>
                {"ID: " + m.userid} --- {"Name: " + (matchedUser?.name || "No name")} --- {"Salary: " + (matchedUser?.email || "No Email")}
              </option>

            );
    })}
</select>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Removing..." : "Remove Manager"}
        </button>
        {message && <p className="status-message">{message}</p>}
      </form>
    </div>
  );
};

export default RemoveManager;
