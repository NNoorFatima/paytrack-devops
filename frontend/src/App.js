import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ManagerSidebar from "./components/ManagerSidebar";
import AppRoutes from "./routes/Routes";
import "./App.css";


function App() {
  return (
    <Router>
      <div className="App" data-testid="app">
        <ManagerSidebar />
        <div className="content">
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;