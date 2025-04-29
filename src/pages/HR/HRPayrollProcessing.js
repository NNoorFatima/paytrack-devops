import React, { useEffect, useState } from "react";
import HRLayout from "../../components/HRLayout";
import "./HRPayrollProcessing.css"; // Page-specific styles

function PayrollProcessing() {
  return (
    <HRLayout>
      <div>
        <PayrollProcessingForm />
      </div>
    </HRLayout>
  );
}

const PayrollProcessingForm = () => {
  const [empList, setEmpList] = useState([]);
  const [userList, setUserList] = useState([]);

  const [selectedEmp, setSelectedEmp] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [baseSalary, setBaseSalary] = useState(null);
  const [leaveCount, setLeaveCount] = useState(null);
  const [netPay, setNetPay] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch employees and users once
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const empRes = await fetch("http://localhost:8080/employees");
        const empData = await empRes.json();
        setEmpList(empData);
        const userRes = await fetch("http://localhost:8080/users");
        const userData = await userRes.json();
        setUserList(userData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load employees or users");
      }
    };
    fetchEmployees();
  }, []);

  const handleCalculate = async (e) => {
    e.preventDefault();
    setError("");

    if (!selectedEmp || !month || !year) {
      setError("Please select employee, month and year");
      return;
    }

    setLoading(true);

    try {
      // 1) fetch employee details to get base salary and date_of_joining
      const empRes = await fetch(`http://localhost:8080/employees/${selectedEmp}`);
      if (!empRes.ok) throw new Error("Failed to fetch employee");
      const emp = await empRes.json();
      const salary = emp.salary;
      // const doj = new Date(emp.date_of_joining);
      setBaseSalary(salary);

      // 2) fetch user data to get dateOfJoining
      const userRes = await fetch(`http://localhost:8080/employees/${selectedEmp}/user`);
      if (!userRes.ok) throw new Error("Failed to fetch user data");
      const user = await userRes.json();
      const doj = new Date(user.date_of_join);

      // alert(doj.toLocaleDateString());
  

      // build selected date as first of month
      const selectedDate = new Date(year, month - 1, 1);
      const today = new Date();

      // validation: not before joining, not after today
      if (selectedDate < doj) {
        setError(`Selected period ${month}/${year} is before joining date ${doj.toLocaleDateString()}`);
        setLoading(false);
        return;
      }
      // end of selected month
      const endOfMonth = new Date(year, month, 0);
      if (endOfMonth > today) {
        setError(`Selected period ${month}/${year} is in the future`);
        setLoading(false);
        return;
      }

      // 2) fetch leave count
      const leaveRes = await fetch(
        `http://localhost:8080/leaves/byUserAndMonthYear/count?userId=${selectedEmp}&month=${month}&year=${year}`
      );
      const count = leaveRes.status === 204 ? 0 : await leaveRes.json();
      setLeaveCount(count);

      // 3) compute net pay
      const extraLeaves = Math.max(0, count - 3);
      const deductionPercent = extraLeaves * 5;
      const deductionAmount = (salary * deductionPercent) / 100;
      const pay = salary - deductionAmount;
      setNetPay(pay);
    } catch (err) {
      console.error(err);
      setError("Calculation failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payroll-form-container2">
      <div className="form-header">
        <h1>Payroll Processing</h1>
        {error && <p className="error-message">{error}</p>}
      </div>

      <form className="admin-form-body" onSubmit={handleCalculate}>
        <label>
          Employee:
          <select
            value={selectedEmp}
            onChange={(e) => setSelectedEmp(e.target.value)}
          >
            <option value="">Select Employee</option>
            {empList.map((emp) => {
              const user = userList.find((u) => u.userid === emp.userid);
              return (
                <option key={emp.userid} value={emp.userid}>
                  ID: {emp.userid} - {user?.name || "Unknown"}
                </option>
              );
            })}
          </select>
        </label>

        <label>
          Month:
          <input
            type="number"
            min="1"
            max="12"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </label>

        <label>
          Year:
          <input
            type="number"
            min="2000"
            max={new Date().getFullYear()}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </label>

        <button type="submit" disabled={loading} className="submit-btn2">
          {loading ? "Calculating..." : "Calculate Pay"}
        </button>
      </form>

      {baseSalary !== null && (
        <div className="results">
          <p>Base Salary: {baseSalary}</p>
          <p>Approved Leaves: {leaveCount}</p>
          <p>Net Pay: {netPay}</p>
        </div>
      )}
    </div>
  );
};

export default PayrollProcessing;
