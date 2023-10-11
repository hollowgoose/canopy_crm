import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Clients from "./components/pages/Clients";
import ClientDetails from "./components/pages/ClientDetails";
import "./App.css";
import Dashboard from "./components/pages/Dashboard";
import AddClient from "./components/pages/AddClient";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route element={<Clients />} path="/clients" />
          <Route element={<ClientDetails />} path="/clients/:clientId" />
          <Route element={<Dashboard />} path="/" />
          <Route element={<AddClient />} path="/clients/add" />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
