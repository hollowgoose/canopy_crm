import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import { getIndividualAppointment, getClientById } from "../../api/api";
import { mapAppointmentType } from "../../utils/formatUtils";

export default function IndividualAppointment() {
  const { apptId } = useParams();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const apptClient = searchParams.get("apptClient");

  const [appointment, setAppointment] = useState([]);
  const [client, setClient] = useState([]);

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

  useEffect(() => {
    fetchAppointment();
  }, []);

  useEffect(() => {
    fetchClient();
  }, []);

  return (
    <>
      <Navbar />

      <div className="main-content">
        <div className="header-container">
          <h1 className="page-header">
            Viewing {mapAppointmentType(appointment.type)} for{" "}
            {client.first_name} {client.last_name}
          </h1>
          <a href={`/clients/`}>
            <button className="other-button-style">
              <i className="fa-regular fa-circle-xmark"></i> Exit
            </button>
          </a>
        </div>

        <p>Type: {appointment.type}</p>
        <p>Type: {appointment.type}</p>
      </div>
    </>
  );
}
