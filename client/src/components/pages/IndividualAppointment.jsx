import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import {
  getIndividualAppointment,
  getClientById,
  getIndividualUser,
} from "../../api/api";
import {
  mapAppointmentType,
  formatDate,
  formatTime,
} from "../../utils/formatUtils";

export default function IndividualAppointment() {
  const { apptId } = useParams();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const apptClient = searchParams.get("apptClient");

  const [appointment, setAppointment] = useState([]);
  const [client, setClient] = useState([]);
  const [user, setUser] = useState([]);

  const fetchAppointment = async () => {
    try {
      const apptData = await getIndividualAppointment(apptId);
      if (apptData) {
        console.log("Fetched appointment data:", apptData);
        setAppointment(apptData.data[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchClient = async () => {
    try {
      console.log(apptClient);
      const clientData = await getClientById(apptClient);
      if (clientData) {
        console.log("Fetched client:", clientData);
        setClient(clientData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUser = async () => {
    try {
      const id = appointment.user_id;
      const userData = await getIndividualUser(id);
      if (userData) {
        console.log("Fetched user:", userData);
        setUser(userData[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, []);

  useEffect(() => {
    if (appointment && appointment.user_id) {
      fetchUser();
    }
  }, [appointment]);

  useEffect(() => {
    fetchClient();
  }, []);

  return (
    <>
      <Navbar />

      <div className="main-content">
        <div className="header-container">
          <h1 className="page-header">
            Showing {mapAppointmentType(appointment.type)} for{" "}
            {client.first_name} {client.last_name}
          </h1>
          <div className="header-buttons">
            <a href="/clients/edit">
              <button className="other-button-style">
                <i className="fa-regular fa-pen-to-square"></i> Edit Client
              </button>
            </a>
            <a href={`/clients/`}>
              <button className="other-button-style">
                <i className="fa-regular fa-circle-xmark"></i> Exit
              </button>
            </a>
          </div>
        </div>

        <table className="appointment-details-table">
          <tbody>
            <tr>
              <td className="bold">Type</td>
              <td>{mapAppointmentType(appointment.type)}</td>
            </tr>
            <tr>
              <td className="bold">Date</td>
              <td>{formatDate(appointment.date)}</td>
            </tr>
            <tr>
              <td className="bold">Start Time</td>
              <td>{formatTime(appointment.start_time)}</td>
            </tr>
            <tr>
              <td className="bold">End Time</td>
              <td>{formatTime(appointment.end_time)}</td>
            </tr>
            <tr>
              <td className="bold">Counsellor</td>
              <td>
                {user.first_name} {user.last_name}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
