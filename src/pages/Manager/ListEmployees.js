// // ListEmployees.js
// import React, { useState, useEffect } from "react";
// import ManagerLayout from "../../components/ManagerLayout";
// import { useNavigate } from "react-router-dom";
// import "./ListEmployees.css";

// const ListEmployees = () => {
//   const [employees, setEmployees] = useState([]);
//   const navigate = useNavigate();
//   const [view, setView] = useState("home");

//   useEffect(() => {
//     // Simulate an API call: Replace this with your actual API call.
//     const sampleData = [
//       { id: 1, name: "Alice Johnson", position: "Developer" },
//       { id: 2, name: "Bob Smith", position: "Designer" },
//       { id: 3, name: "Charlie Brown", position: "Project Manager" },
//     ];
//     setEmployees(sampleData);
//   }, []);

//   return (
//     <ManagerLayout setView={setView}>
      

//       <div className="list-employees-container">
//         <header className="list-header">
//           <h1>Employees List</h1>
//           {/* Optionally add a back button */}
//           <button className="back-btn" onClick={() => navigate(-1)}>
//             ← Back
//           </button>
//         </header>
//         <table className="employees-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Position</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.map((emp) => (
//               <tr key={emp.id}>
//                 <td>{emp.id}</td>
//                 <td>{emp.name}</td>
//                 <td>{emp.position}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </ManagerLayout>
//   );
// };

  
// export default ListEmployees;
