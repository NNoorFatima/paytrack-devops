import React from "react";
import Layout from "../../components/EmployeeLayout"; // Ensure the layout is consistent
import "./employeeProfile.css"; // Ensure styles are consistent with Manager layout
import { useState } from "react";
import { useEffect } from "react";
import { Badge } from "../../components/badge";
import { useNavigate } from "react-router-dom";

const EmployeeProfilePage = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("employeeId"); // Replace with the logged-in user's ID (e.g., from authentication)
  const [departmentName, setDepartmentName] = useState([]);
  // useEffect(() => {
  //   // Fetch Employee Data
  //   fetch(`http://localhost:8080/employees/${userId}`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         return response.text().then((text) => {
  //           console.error("Error fetching employee data", text);
  //           throw new Error("Failed to fetch employee data");
  //         });
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Received employee data:", data);
  //       setEmployee(data);

  //       // Fetch User Data after employee data is successfully fetched
  //       return fetch(`http://localhost:8080/users/${userId}`);
  //     })
  //     .then((response) => {
  //       if (!response.ok) {
  //         return response.text().then((text) => {
  //           console.error("Error fetching user data", text);
  //           throw new Error("Failed to fetch user data");
  //         });
  //       }
  //       return response.json();
  //     })
  //     .then((userData) => {
  //       console.log("Received user data:", userData);
  //       setUser(userData); // Set user data in state
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data", error);
  //     });
  // }, [userId]);
  useEffect(() => {
    // Fetch Employee Data
    fetch(`http://localhost:8080/employees/${userId}`)
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            console.error("Error fetching employee data", text);
            throw new Error("Failed to fetch employee data");
          });
        }
        return response.json();
      })
      .then((employeeData) => {
        console.log("Received employee data:", employeeData);
        setEmployee(employeeData);
  
        // Fetch User Data after employee data is successfully fetched
        return fetch(`http://localhost:8080/users/${userId}`).then((response) => {
          if (!response.ok) {
            return response.text().then((text) => {
              console.error("Error fetching user data", text);
              throw new Error("Failed to fetch user data");
            });
          }
          return response.json();
        }).then((userData) => {
          console.log("Received user data:", userData);
          setUser(userData);
  
          // Fetch Departments after user data is fetched
          return fetch(`http://localhost:8080/department`);
        }).then((response) => {
          if (!response.ok) {
            return response.text().then((text) => {
              console.error("Error fetching departments", text);
              throw new Error("Failed to fetch departments");
            });
          }
          return response.json();
        }).then((departmentsData) => {
          console.log("Received departments data:", departmentsData);
          // Find the department name based on employee's deptId
          const department = departmentsData.find(
            (dept) => dept.id === employeeData.deptid
          );
          if (department) {
            setDepartmentName(department.name); // You should have a state for department name
          } else {
            console.warn("Department not found for deptId:", employeeData.deptid);
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, [userId]);
  

  if (!employee || !user) {
    return <div>Loading...</div>;
  }
  
  return (
    <Layout>
      <div className="thisOne">
      <div className="content-section1">
        <h1 >Employee Profile</h1>
        <div >
          <strong>Name:</strong> {user.name}
        </div>
        <div >
          <strong>Email:</strong> {user.email}
        </div>
        <div >
          <strong>Salary:</strong> {employee.salary}
        </div>
        <div >
          <strong>Department Name:</strong> {departmentName ||"N/A"}
        </div>
        <div >
          <strong>Address:</strong> {user.address}
        </div>
        
        
        <button
          className="change-password-btn"
          onClick={() => navigate("/change-password", { state: { userId } })}
        >
          Change Password
        </button>
      </div>
      </div>
    </Layout>
  );
}

export default EmployeeProfilePage;
