import React from "react";
import Navbar from "../Navbar";

export default function Reports() {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <div className="header-container">
          <h1 className="page-header">Reports</h1>
          <a href="/clients/add">
            <button className="dark-button-style">Some Useful Button</button>
          </a>
        </div>
      </div>
    </>
  );
}
