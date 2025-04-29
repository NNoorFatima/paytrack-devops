import React, { useEffect, useState } from "react";
import HRCard from "./CardAdmin";
import "./CardAdmin.css"; // Link to the CSS
import AdminLayout from "../../components/AdminLayout";

const ViewHR = () => {
  const [hrData, setHrData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // First fetch HR data from the backend API
    fetch("http://localhost:8080/hrs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch HR data");
        }
        return response.json();
      })
      .then((data) => {
        // Once HR data is fetched, we now fetch user data
        const userIds = data.map((hr) => hr.userid).join(",");

        // Fetch user data based on HR `userid` values
        fetch(`http://localhost:8080/users?userids=${userIds}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch user data");
            }
            return response.json();
          })
          .then((userData) => {
            console.log("User Data:", userData);
            // Merge HR data and user data based on `userid`
            const mergedData = data.map((hr) => {
              const user = userData.find((user) => user.userid === hr.userid);
              return {
                ...hr,
                name: user ? user.name : "",
                email: user ? user.email : "",
                dateofjoin: user ? user.date_of_join : "",
              };
            });
            setHrData(mergedData); // Set the merged data to the state
            setLoading(false); // Set loading to false once data is fetched
          })
          .catch((error) => {
            setError(error.message); // Set error message if user data fetch fails
            setLoading(false); // Set loading to false in case of error
          });
      })
      .catch((error) => {
        setError(error.message); // Set error message if HR data fetch fails
        setLoading(false); // Set loading to false even in case of error
      });
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <AdminLayout>
      <div className="view-hr-container">
        <h1 className="view-hr-title">HR Personnel Directory</h1>
        <div className="hr-grid">
          {hrData.map((hr) => (
            <HRCard key={hr.userid} hr={hr} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ViewHR;
