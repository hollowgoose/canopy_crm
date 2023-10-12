import React from "react";
import Navbar from "../Navbar";

export default function Appointments() {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <div className="header-container">
          <h1 className="page-header">Appointments</h1>
          <div className="header-buttons">
            <a href="/appointments/add">
              <button className="other-button-style">
                <i class="fa-regular fa-calendar-plus"></i> Add Appointment
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
