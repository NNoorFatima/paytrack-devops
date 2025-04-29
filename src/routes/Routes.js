// src/routes/Routes.js
import React from "react";
import { Route, Routes } from "react-router-dom";
// import EmployeeDashboard from "../pages/Employee/EmployeeDashboard";
import EmployeeProfile from "../pages/Employee/EmployeeProfile"; 
import DisplaySalarySlip from "../pages/Employee/DisplaySalarySlip";
import MakeLeaveRequest from "../pages/Employee/LeaveRequest";
import LeaveApproval from "../pages/Employee/LeaveApproval";
// import EmpLogin from "../pages/Employee/EmployeeLogin";
import ChangePasswordPage from '../pages/Employee/ChangePasswordPage';
import EmployeeLogin from "../pages/Employee/EmployeeLogin";


// import AdminDashboard from "../pages/Administrator/AboutUS"; // ✅ Set as the default landing page
import AddHr from "../pages/Administrator/AddHr";
import AddManager from "../pages/Administrator/AddManager";
import RemoveHr from "../pages/Administrator/RemoveHR";
import RemoveManager from "../pages/Administrator/RemoveManager";
import AdminLogin from "../pages/Administrator/AdminLogin";

import AdmLogin from "../pages/Administrator/Login";
import AboutUs from "../pages/Administrator/AboutUS";
import ViewHR from "../pages/Administrator/ViewHR";
import ViewManager from "../pages/Administrator/ViewManager";

import HRLogin from "../pages/HR/HRLogin";
import HREmpRemoval from "../pages/HR/HREmpRemoval";
import LeaveReorting from "../pages/HR/LeaveReporting";
import PayrollProcessing from "../pages/HR/HRPayrollProcessing"; 
import AddEmp from "../pages/HR/HRAddEmp"; 


import Dashboard from "../pages/Manager/HomePage";
import ManagerLogin from "../pages/Manager/ManagerLogin";
// import ListEmployees from "../pages/Manager/ListEmployees"; // not in use crrently 

import Interface from "../pages/InterfaceSelector/Interface";



const AppRoutes = () => {
  //const userId = localStorage.getItem("userId"); // Fetch user ID
  // const userId=1;
  return (
    <Routes>
      {/* Employees */}
      {/* <Route path="/" element={<EmployeeDashboard />} /> */}
      <Route path="/profile" element={<EmployeeProfile />} />
      <Route path="/payslip" element={<DisplaySalarySlip />} />
      <Route path="/leave-request" element={<MakeLeaveRequest />} />
      <Route path="/leave-approval" element={<LeaveApproval />} />
      <Route path="/employee-login" element={<EmployeeLogin />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />


      {/* <Route path="/" element={<EmployeeLogin />} /> */}

      {/* Admin */}
      {/* <Route path="/" element={<AdminDashboard />} /> ✅ Default page is now Admin.js */}
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/add-hr" element={<AddHr />} />
      <Route path="/add-manager" element={<AddManager />} />
      <Route path="/remove-hr" element={<RemoveHr />} />
      <Route path="/remove-manager" element={<RemoveManager />} />
      <Route path="/login-admin" element={<AdmLogin />} />
      <Route path="/admin-view-hr" element={<ViewHR />} />
      <Route path="/admin-view-manager" element={<ViewManager />} />

      {/* HR */}
      {/* <Route path="/" element={<HREmpRemoval />} /> */}
      <Route path="/emp-removal" element={<HREmpRemoval />} />
      <Route path="/leave-reports" element={<LeaveReorting />} />
      <Route path="/login-hr" element={<HRLogin />} />
      <Route path="/payroll-processing" element={<PayrollProcessing />} />
      <Route path="/add-emp" element={< AddEmp/>} /> 


      {/* Manager */}
      <Route path="/manager-dashboard" element={<Dashboard />} />     
      {/* <Route path="/list-employees" element={<ListEmployees />} /> */}
      {/* <Route path="/" element={<ManagerLogin />} /> */}
      <Route path="/manager-login" element={<ManagerLogin />} />
      
      
      {/* root paths  */}
      {/* <Route path="/" element={<AdminDashboard />} /> */}
      <Route path="/" element={<Interface />} />

    </Routes>
  );
};

export default AppRoutes;
