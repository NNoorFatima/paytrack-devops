// src/pages/hr/HRAddEmp.jsx
import React, { useState } from "react";
import HRLayout from "../../components/HRLayout";
import "./HRAddEmp.css"; // Page-specific styles

// at top of HRAddEmp.jsx
import axios from "axios";


function AddEmp() {
  return (
    <HRLayout>
      <div className="add-emp-page">
        <h2>Add New Employee</h2>
        <AddEmployeeForm />
      </div>
    </HRLayout>
  );
}

const AddEmployeeForm = () => {
  const [form, setForm] = useState({
    name: "",
    password: "",
    gender: "Male",
    email: "",
    phone_no: "",
    address: "",
    date_of_join: "",
    salary: "",
    deptid: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      // 1) Create the user
      const userResponse = await fetch("/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          password: form.password,
          gender: form.gender,
          email: form.email,
          phone_no: form.phone_no,
          address: form.address,
          date_of_join: form.date_of_join,
        }),
      });
  
      if (!userResponse.ok) throw new Error("Failed to create user");
      const { userid } = await userResponse.json();

      // 2) Create the employee record
      const empResponse = await fetch("/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userid,
          salary: parseFloat(form.salary),
          deptid: parseInt(form.deptid, 10),
        }),
      });
      if (!empResponse.ok) throw new Error("Failed to create employee");

      setMessage(`Employee successfully created with ID ${userid}`);
      setForm({
        name: "",
        password: "",
        gender: "Male",
        email: "",
        phone_no: "",
        address: "",
        date_of_join: "",
        salary: "",
        deptid: "",
      });
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="add-emp-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Gender</label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input
          name="phone_no"
          value={form.phone_no}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Address</label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Date of Joining</label>
        <input
          name="date_of_join"
          type="date"
          value={form.date_of_join}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Salary</label>
        <input
          name="salary"
          type="number"
          step="0.01"
          value={form.salary}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Department ID</label>
        <input
          name="deptid"
          type="number"
          value={form.deptid}
          onChange={handleChange}
          required
        />
      </div>
      <button className="submit-button" type="submit" disabled={loading}>
        {loading ? "Saving…" : "Add Employee"}
      </button>
      {message && <div className="form-message">{message}</div>}
    </form>
  );
};

export default AddEmp;
