import React, { useEffect, useState } from "react";
import "./salarySlip.css";
import EmployeeLayout from "../../components/EmployeeLayout";

/**
 * Displays an employee’s monthly salary slip.
 * - pulls salary + leaves from the backend
 * - deducts 10 % if approved leaves > 3
 */
const DisplaySalarySlips = ({ userId: incomingId }) => {
  const userId = incomingId ?? localStorage.getItem("employeeId");

  const [salary,        setBaseSalary]    = useState(0);
  const [approvedLeaves,setApprovedLeaves]= useState(0);
  const [deduction,     setDeduction]     = useState(0);
  const [totalSalary,   setTotalSalary]   = useState(0);

  /* ──────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!userId) {
      console.warn("No userId provided. Skipping API call.");
      return;
    }

    (async () => {
      try {
        /* salary */
        const empRes = await fetch(`http://localhost:8080/employees/${userId}`);
        if (!empRes.ok) throw new Error("Employee not found");
        const emp = await empRes.json();
        setBaseSalary(emp.salary);

        /* approved leaves */
        const leaveRes = await fetch(
          `http://localhost:8080/leaves/approved?userId=${userId}`
        );
        if (!leaveRes.ok) throw new Error("Leaves data not found");
        const leaves   = await leaveRes.json();
        const leaveCnt = Array.isArray(leaves) ? leaves.length : 0;
        setApprovedLeaves(leaveCnt);

        /* deductions + total */
        // const ded = leaveCnt > 3 ? emp.salary * 0.1 : 0;
        const ded = leaveCnt > 3 ? leaveCnt-3 : 0;
        const per  = ded * 0.05;
        const amtDed = per * emp.salary;
        emp.salary -= (per* emp.salary); 
        // for (let i = 0; i < ded; i++) {
        //   console.log("deducting");
        //   emp.salary -= emp.salary * 0.05;
        // }
        setDeduction(amtDed);
        setTotalSalary(emp.salary);
      } catch (err) {
        console.error("Error fetching salary slip:", err);
      }
    })();
  }, [userId]);

  /* ──────────────────────────────────────────────────────────── */
  return (
    <EmployeeLayout>
      <div className="salary-details">
        {/* ── receipt header ─────────────────────── */}
        <header className="receipt-header">
          <h1>RECEIPT No.</h1>
          <h2>020121</h2>
        </header>

        {/* ── body ───────────────────────────────── */}
        <section className="receipt-body">
          {/* Row 1 */}
          <div className="receipt-row">
            <div className="col">
              <span className="label">Leaves:</span>
              <span className="value">
                <input value={approvedLeaves} readOnly />
              </span>
            </div>

            {/* NOTE: ➜  add `col-right` */}
            <div className="col col-right">
              <span className="label">Salary:</span>
              <span className="value">${salary.toFixed(2)}</span>
            </div>
          </div>

          {/* Row 2 */}
          <div className="receipt-row">
            <div className="col">
              <span className="label">From:</span>
              <span className="value">Rio.co</span>
            </div>

            {/* NOTE: ➜  add `col-right` */}
            <div className="col col-right">
              <span className="label">Type:</span>
              <span className="value">Monthly Salary</span>
            </div>
          </div>

          {/* Row 3 (single-cell) */}
          <div className="receipt-row">
            <div className="col">
              <span className="label">Generated On:</span>
              <span className="value">
                <input
                  value={new Date().toISOString().split("T")[0]}
                  readOnly
                />
              </span>
            </div>
            <div className="col" />   {/* placeholder keeps the grid */}
          </div>

          {/* Row 4 */}
          <div className="receipt-row">
            <div className="col">
              <span className="label">Deductions:</span>
              <span className="value">${deduction.toFixed(2)}</span>
            </div>

            {/* NOTE: ➜  add `col-right` */}
            <div className="col col-right">
              <span className="label">Tax Rate:</span>
              <span className="value">5%</span>
            </div>
          </div>

          {/* Total */}
          <div className="receipt-row total-row">
            <h2 className="total">
              <strong>Total </strong>${totalSalary.toFixed(2)}
            </h2>
          </div>
        </section>
      </div>
    </EmployeeLayout>
  );
};

export default DisplaySalarySlips;
