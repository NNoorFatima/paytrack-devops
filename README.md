# 🧾 PayTrack – Leave and Payroll Management System (Kubernetes & Docker Ready)

---

### 👥 Developed by:
- Noor Fatima  [NoorFatima123](https://github.com/NoorFatima123)
- Sara Akbar  [Sara789](https://github.com/SaraAkbar16)

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
- **Containerization:** Docker
- **Orchestration & Routing:** Kubernetes + NGINX Ingress
- **Version Control:** GitHub

---

## 🛠️ Project Setup Instructions

### 📍 Backend (Spring Boot)

1. **Install Java 17+**
2. **Install MySQL** and create a database named `paytrack`.
3. **Update `application.properties`:**
spring.datasource.url=jdbc:mysql://localhost:3306/paytrack
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

4. **Run Backend:**
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
### 📍 Frontend (ReactJS)

1. Install Node.js and npm  
2. Create a `.env` file in the frontend directory:
    ```bash
    REACT_APP_API_URL=http://localhost:8080
    ```
3. Start frontend:
    ```bash
    cd frontend
    npm install
    npm start
    ```

3. Create a .env file with:
```bash
REACT_APP_API_URL=http://localhost:8080
```

## 🐳 Docker Setup

All Dockerfiles are located in the `/docker/` folder:


```
/docker/
 |-- Dockerfile.frontend
 |-- Dockerfile.backend
```
## ☸️ Kubernetes Deployment
#### Create namespace
```
kubectl create namespace paytrack
```
#### Apply all YAMLS
```
kubectl apply -f k8/
```
#### Reset MySQL and Load SQL
```
kubectl delete pvc -n paytrack --all
kubectl delete deployment mysql-deployment -n paytrack
kubectl apply -f k8/mysql-deployment.yaml
```
#### Ingress Access
Add to your /etc/hosts file 
```
127.0.0.1 paytrack.local
```
This will allow you to access the application at:
```
http://paytrack.local
```
##### Ingress Highlights
1. Uses Prefix-based path routing
2. CORS enabled via annotations
3. Backend routes: **/employees**, **/hrs**, **/admins**, **/managers**, etc.
4. Frontend catch-all: **/**  

#### MySQL Init via ConfigMap
SQL files go in **mysql-init/**. Create or update ConfigMap:
```
kubectl create configmap mysql-initdb-config --from-file=./mysql-init/ -n paytrack --dry-run=client -o yaml > k8/mysql-initdb-config.yaml

kubectl apply -f k8/mysql-initdb-config.yaml
```

#### Login API Endpoints
## 🔐 Login API Endpoints

| Role     | Endpoint          | Method | Body Parameters                  |
|----------|-------------------|--------|----------------------------------|
| HR       | `/hrs/login`      | POST   | `email`, `password`              |
| Employee | `/employees/login`| POST   | `email`, `password`              |
| Admin    | `/admins/login`   | POST   | `email`, `password`              |
| Manager  | `/managers/login` | POST   | `email`, `password`              |


## 🚀 Thank you for exploring PayTrack!


