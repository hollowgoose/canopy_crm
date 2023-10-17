import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Clients from "./components/pages/Clients";
import ClientDetails from "./components/pages/ClientDetails";
import "./App.css";
import Dashboard from "./components/pages/Dashboard";
import AddClient from "./components/pages/AddClient";
import Appointments from "./components/pages/Appointments";
import Reports from "./components/pages/Reports";
import AddAppointment from "./components/pages/AddAppointment";
import AddIndidividualAppointment from "./components/pages/AddIndividualAppointment";
import IndividualAppointment from "./components/pages/IndividualAppointment";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route element={<Clients />} path="/clients" />
          <Route element={<AddClient />} path="/clients/add" />
          <Route element={<ClientDetails />} path="/clients/:clientId" />
          <Route element={<Dashboard />} path="/" />
          <Route element={<Appointments />} path="/appointments" />
          <Route element={<AddAppointment />} path="/appointments/add" />
          <Route
            element={<IndividualAppointment />}
            path="/appointments/:apptId"
          />
          <Route
            element={<AddIndidividualAppointment />}
            path="/appointments/create"
          />
          <Route element={<Reports />} path="/reports" />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
