import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/EmployeeSidebar";

const EmployeeDashboard = () =>
{
    return(
        <div className = "dashboard-container">
            <Sidebar/>
            <div className="content-container">
                <Outlet/>

            </div>
        </div>
    );

};
export default EmployeeDashboard;
