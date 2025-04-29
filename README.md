# PayTrack - Leave and Payroll Management System

---

### Developed by:
- Noor Fatima  [NoorFatima123](https://github.com/NoorFatima123)
- Sara Akbar  [Sara789](https://github.com/SaraAkbar16)
- Abdul Munim [Munim456](https://github.com/Munimbaig024)

---

## 🧹 Project Overview

PayTrack is a Leave and Payroll Management System designed to automate salary processing, leave tracking, and employee management.  
It ensures:
- Accurate salary calculation based on leave records and deductions
- Streamlined leave approval workflows
- Timely payslip generation
- Structured role management (Admin, HR, Manager, Employee)

By reducing manual workload and providing real-time data access, PayTrack improves organizational efficiency and decision-making.

---

## ✅ Functional Requirements

- Employees can submit leave requests specifying leave type, start date, end date, and reason.
- Managers can approve/reject leave requests after viewing leave balances.
- Employees can view the approval status of their pending leave requests.
- HR can onboard and remove employees and configure salary structures.
- System processes payroll monthly, considering leaves and deductions.
- Payslips are generated and available within 2 seconds of request.
- Secure authentication for all users.

---

## ⚙️ Non-Functional Requirements

- System responds to leave requests within 1 second.
- Real-time updates on dashboards for leave status.
- Maintainable system supporting feature updates.
- High performance even when scaling employees and departments.
- Secure login system with session management.

---

## 🌟 Project Vision

To develop a robust, user-friendly, efficient Leave and Payroll Management System that streamlines employee operations while ensuring accuracy, timeliness, and reduced administrative workload.

---

## 📋 Major User Stories

| User | Actions |
|:--|:--|
| Employee | Apply for leave, view leave status, access salary slips, update profile |
| Manager | Approve/reject leave, view leave balance and reports |
| HR | Manage employees, configure salary, generate reports |
| Admin | Add/remove HR and managers, oversee system operations |

---

## 🏗️ Architecture & Technology Stack

- **Frontend:** ReactJS (with Axios, React Router DOM)
- **Backend:** Spring Boot (Java 17+), MySQL
- **Version Control:** GitHub

---

## 🛠️ Project Setup Instructions

### 📍 Backend (Spring Boot)

1. **Install Java 17+**  
   Download and set up Java Development Kit (JDK) 17 or above.

2. **Install MySQL**  
   - Create a database named `paytrack`.
   - Update `application.properties`:
     ```
     spring.datasource.url=jdbc:mysql://localhost:3306/paytrack
     spring.datasource.username=YOUR_USERNAME
     spring.datasource.password=YOUR_PASSWORD
     ```

3. **Backend Setup Steps:**
   ```bash
   cd backend-directory
   mvn clean install
   mvn spring-boot:run
   ```
4. **Important Backend Dependencies:**
   - Spring Web
   - Spring Data JPA
   - MySQL Driver
   - Spring Security (optional)

5. **Backend Structure:**
   ```
   /src/main/java/com/paytrack/
      ├── controllers/
      ├── services/
      ├── repositories/
      ├── models/
      └── PayTrackApplication.java
   ```

---

### 📍 Frontend (ReactJS)

1. **Install Node.js and npm**  
   Download Node.js from [nodejs.org](https://nodejs.org/).

2. **Frontend Setup Steps:**
   ```bash
   npx create-react-app paytrack-frontend
   cd paytrack-frontend
   npm install axios react-router-dom
   npm start
   ```

3. **Frontend Structure:**
   ```
   /src/
      ├── components/
      ├── pages/
      ├── services/
      ├── layouts/
      ├── App.js
      └── index.js
   ```

4. **API Integration:**  
   Use Axios to connect frontend to backend REST APIs.

---

## 🧪 Testing Overview

### 🖥️ Backend Testing:
- **Frameworks Used:** JUnit, JaCoCo
- **Coverage Achieved:**
  - Statement Coverage: 77%
  - Branch Coverage: 78%
  - Major Services and Controllers well-tested.

### 🖥️ Frontend Testing:
- **Frameworks Used:** Jest (for component testing)
- **Manual Testing:** Form submissions, API response checks.

---

## 🗂️ Project Structure

| Module | Main Functions |
|:--|:--|
| Employee Module | Leave application, salary view, profile management |
| Manager Module | Approve/reject leave requests, view leave reports |
| HR Module | Add/remove employees, generate payroll, manage policies |
| Admin Module | Add/remove HR and Managers, system-wide controls |

---

## 📦 Final Deliverables

- Complete working project: backend + frontend
- Blackbox and Whitebox Test Cases
- Sprint Trello Board Screenshots
- Burndown Chart
- Full Project Documentation (PDF)
- GitHub Repository

---

## 🔥 Sample Test Cases (Blackbox Testing)

| Test Case ID | Description | Input | Expected Result | Type | Status |
|:--|:--|:--|:--|:--|:--|
| TC01 | Login with valid credentials | Noor/n122 | Redirect to Profile | Equivalence Partitioning | Pass |
| TC02 | Login with empty username | "", 123456 | Error | Equivalence Partitioning | Fail |
| TC05 | Add employee with wrong email | noor.com | Error alert | Equivalence Partitioning | Fail |
| TC07 | Generate payslip for valid employee | EmployeeID:123 | Payslip generated | Equivalence Partitioning | Pass |
| TC08 | Generate payslip for invalid employee | EmployeeID:999 | Error: Not Found | Equivalence Partitioning | Fail |

*(More detailed test cases are available in the project report.)*


## 📚 Lessons Learned

- Strong Git branching and version control enhances project coordination.
- Dividing tasks based on strengths boosts overall quality.
- Regular sprints and daily goals helped stay on track.
- Early and thorough testing prevents major bugs later.
- Clear documentation makes final delivery smoother.

---

## 📬 Contact
For any issues, questions, or collaboration requests, please reach out to the project contributors.

---

# 🚀 Thank you for exploring PayTrack!
```


