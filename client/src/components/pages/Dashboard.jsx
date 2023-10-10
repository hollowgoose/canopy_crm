import React from "react";
import Navbar from "../Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <div className="header-container">
          <h1 className="page-header">Dashboard</h1>
          <a href="/clients/add">
            <button className="dark-button-style">Some Dash Button</button>
          </a>
        </div>
      </div>
    </>
  );
}
