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

### 📍 Backend Setup (Spring Boot)

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
### 📍 Frontend Setup (ReactJS)

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
```bash
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

## 🔐 Login API Endpoints

| Role     | Endpoint          | Method | Body Parameters                  |
|----------|-------------------|--------|----------------------------------|
| HR       | `/hrs/login`      | POST   | `email`, `password`              |
| Employee | `/employees/login`| POST   | `email`, `password`              |
| Admin    | `/admins/login`   | POST   | `email`, `password`              |
| Manager  | `/managers/login` | POST   | `email`, `password`              |


## Helm Chart Setup
- **Helm**: Helm is used to deploy the application into Kubernetes, which ensures that all components are properly configured and easily manageable.
- **Ingress**: An Ingress resource has been defined to manage the routing of traffic to various services.
- **Persistent Storage**: The MySQL database uses persistent storage, ensuring that data is not lost even if the pod is restarted.



### 📈 Helm Charts
The Helm charts for deploying the PayTrack application are located under `charts/paytrack` and consist of several YAML files for configuring Kubernetes resources. These resources include Deployments, Services, ConfigMaps, and Persistent Volumes.

### 📂 Database Initialization
- **ConfigMap**: Initialization SQL scripts are stored in a ConfigMap and applied to MySQL during the startup of the database. These SQL files create and populate the necessary database tables such as `paytrackdb_users.sql`, `paytrackdb_admin.sql`, etc.
  

### Services
- **MySQL Service**: Exposes MySQL to the backend so that it can store and retrieve data.
- **Backend Service**: Exposes the backend API that the frontend can communicate with to retrieve and submit data.
- **Frontend Service**: Serves the static files for the PayTrack web application.



### 1. **Install Helm and Kubernetes Dependencies**
Before deploying the PayTrack project, make sure you have **Helm** and **Kubernetes** properly set up.

1. **Install Helm**:
   ```bash
   curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash
   ```
Make sure you have access to Kubernetes cluster that `kubectl` is configured correctly.

2. **Deploy PayTrack With Helm**:
```
helm install PayTrack ./charts/paytrack --namespace paytrack-helm
```
This will deploy the Helm charts into the paytrack-helm namespace.

3. **Check Deployment Status**:
```
kubectl get pods -n paytrack-helm
```

4. **Check Logs for Debugging**:
```
kubectl logs backend-deployment-<pod-id> -n paytrack-helm
kubectl logs mysql-<pod-id> -n paytrack-helm
kubectl logs paytrack-frontend-<pod-id> -n paytrack-helm
```
4. **Access the Application via Ingress**:
To test the accessibility of the application through Ingress, first ensure that your Ingress Controller is installed. After that, use the following command to get the URL of the deployed application:
```
kubectl get ingress -n paytrack-helm
```

**In Case you want to apply any changes to Helm Charts**
```bash
helm upgrade paytrack-release-name ./charts/paytrack --namespace paytrack-helm
```

### 📈 ArgoCD:
**ArgoCD** is a declarative, GitOps continuous delivery tool for Kubernetes. It allows you to manage and deploy applications to your Kubernetes cluster in a GitOps way, meaning the desired state of your infrastructure and applications is stored in a Git repository. ArgoCD will automatically sync the state of your Kubernetes resources with the configurations in the Git repository.

## Key Components of ArgoCD

1. **ArgoCD Server**: The main controller that syncs the state of your Kubernetes resources with the Git repository.
2. **ArgoCD CLI**: The command-line tool for interacting with ArgoCD.
3. **Git Repository**: A Git repository (e.g., GitHub) where the Kubernetes configuration files (Helm charts, manifests, etc.) are stored.
4. **Kubernetes Cluster**: The Kubernetes cluster where the PayTrack application will be deployed.

## Prerequisites

1. **Kubernetes Cluster**: Ensure your Kubernetes cluster is set up and accessible.
2. **Helm Charts**: The PayTrack Helm charts should be ready and stored in a Git repository.
3. **ArgoCD Installed**: ArgoCD should be installed on the Kubernetes cluster.

```bash
# Install ArgoCD
helm install argo-cd argo/argo-cd --namespace argocd --create-namespace
```

### ArgoCD Configuration

1. **Access ArgoCD UI**
Once ArgoCD is installed, access the ArgoCD UI by port-forwarding the ArgoCD server
```bash
kubectl port-forward svc/argocd-server -n argocd 8083:443
```
You can access the argoCD UI at `http://localhost:8083`
default login username: ```admin```

2. **Create an ArgoCD Application**
Already done in `argo-application.yaml` just apply it on your cluster.
```
kubectl apply -f paytrack-argocd-application.yaml -n argocd
```

3. **Syncing**
Application will be automatically synced through workflow file `deploy.yaml`.


## Workflow:

### 🏗️ CI/CD Setup with Self-Hosted Runner

In this project, we have utilized **GitHub Actions** for CI/CD pipeline integration. A **self-hosted runner** is used to handle the build, test, and deploy processes efficiently. The runner ensures faster execution and better control over the pipeline execution environment.

- **Self-hosted Runner**: The runner is configured to handle jobs like building Docker images, running Helm commands, and pushing the latest code to Kubernetes via ArgoCD. This eliminates the need for GitHub's default runners and reduces the overhead for each deployment.

The self-hosted runner is managed through GitHub Actions and is configured with the following:
1. **Building Docker Images** for the backend and frontend.
2. **Deploying the application** to Kubernetes using Helm.
3. **Syncing with ArgoCD** to automate application deployment updates.

#### How to Set Up the Self-Hosted Runner

1. **Register the Runner**: In your GitHub repository, navigate to **Settings > Actions > Runners**. Follow the instructions to register the runner with your repository.
2. **Install the Runner**: On the server where you want to host the runner, run the following commands to install the GitHub Actions runner:
    ```bash
    # Download the latest runner
    curl -o actions-runner-linux-x64-2.283.0.tar.gz https://github.com/actions/runner/releases/download/v2.283.0/actions-runner-linux-x64-2.283.0.tar.gz
    tar xzf ./actions-runner-linux-x64-2.283.0.tar.gz
    ```

3. **Start the Runner**: Start the runner to listen for jobs and execute them:
    ```bash
    ./config.sh --url https://github.com/YOUR_USERNAME/YOUR_REPOSITORY --token YOUR_TOKEN
    ./run.cmd
    ```

4. **Test the Runner**: Ensure that the runner is working by triggering a test workflow that runs jobs on the self-hosted runner.

## 🚀 Thank you for exploring PayTrack!


