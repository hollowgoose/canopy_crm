import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";

export default function AddIndidividualAppointment() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const clientId = searchParams.get("clientId");

  return (
    <>
      <Navbar />
      <div className="main-content">
        <h1>Add Individual Appointment</h1>
        <p>{clientId}</p>
      </div>
    </>
  );
}
