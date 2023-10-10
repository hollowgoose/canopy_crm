import React from "react";
import { NavLink } from "react-router-dom";
import canopyLogo from "../assets/canopy.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="branding">
        <img src={canopyLogo} alt="Canopy CRM Logo" />
      </div>

      <div className="vertical-split">
        <div className="navbar--links">
          <ul>
            <li>
              <NavLink
                to="/"
                className={(navData) =>
                  navData.isActive ? "active" : "inactive"
                }
              >
                <i className="fa-solid fa-chart-line"></i> Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                exact="true"
                to="/clients"
                className={(navData) =>
                  navData.isActive ? "active" : "inactive"
                }
              >
                <i className="fa-regular fa-circle-user"></i> Clients
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/appointments"
                className={(navData) =>
                  navData.isActive ? "active" : "inactive"
                }
              >
                <i className="fa-regular fa-calendar-check"></i> Appointments
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/reports"
                className={(navData) =>
                  navData.isActive ? "active" : "inactive"
                }
              >
                <i className="fa-regular fa-file"></i> Reports
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <div className="navbar--links">
            <ul>
              <li>
                <NavLink
                  to="/admin"
                  className={(navData) =>
                    navData.isActive ? "active" : "inactive"
                  }
                >
                  <i className="fa-solid fa-sliders"></i> Admin
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/settings"
                  className={(navData) =>
                    navData.isActive ? "active" : "inactive"
                  }
                >
                  <i className="fa-solid fa-gear"></i> Settings
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/logout"
                  className={(navData) =>
                    navData.isActive ? "active" : "inactive"
                  }
                >
                  <i className="fa-solid fa-right-from-bracket"></i> Logout
                </NavLink>
              </li>
            </ul>
          </div>
          <p className="small">&copy; Sight Support Worthing 2023</p>
        </div>
      </div>
    </nav>
  );
}
