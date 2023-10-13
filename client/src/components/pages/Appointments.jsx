import React, { useState } from "react";
import Navbar from "../Navbar";

import ApptCalendar from "../ApptCalendar";

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
                <i className="fa-regular fa-calendar-plus"></i> Add Appointment
              </button>
            </a>
          </div>
        </div>
        <ApptCalendar />
      </div>
    </>
  );
}
