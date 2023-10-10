import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getStatusClass } from "../../utils/statusUtils";
import Navbar from "../Navbar";

export default function ClientDetails() {
  const { clientId } = useParams();
  const [clientDetails, setClientDetails] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [notes, setNoteDetails] = useState([]);

  useEffect(() => {
    // Fetch client details using the client ID from the URL
    fetch(`http://localhost:3000/api/clients/${clientId}`)
      .then((response) => response.json())
      .then((data) => {
        setClientDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching client details:", error);
      });
  }, [clientId]);

  //   useEffect(() => {
  //     fetch(`http://localhost:3000/api/notes/${clientId}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setNoteDetails(data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching notes:", error);
  //       });
  //   }, [clientId]);

  //   useEffect(() => {
  //     fetch(`http://localhost:3000/api/appointments/${clientId}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setAppointments(data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching appointments: ", error);
  //       });
  //   }, []);

  if (!clientDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="main-content">
        <div className="header-container">
          <div className="client-header">
            <h1 className="page-header">
              {clientDetails.first_name} {clientDetails.last_name}
            </h1>
            <div className="status-container">
              <p className={getStatusClass(clientDetails.status)}>
                {clientDetails.status}
              </p>
            </div>
          </div>

          <div className="header-buttons">
            <a href="/clients/edit">
              <button className="other-button-style">
                <i className="fa-regular fa-pen-to-square"></i> Edit Client
              </button>
            </a>
            <a href="/clients">
              <button className="dark-button-style">
                <i className="fa-regular fa-circle-xmark"></i> Exit
              </button>
            </a>
          </div>
        </div>
        <div className="client-details-wrapper">
          <div className="client-address">
            <h2 className="small-heading">Personal Details</h2>
            <div className="spacer">
              <p>
                <span className="bold">Address 1: </span>
                {clientDetails.address_1}
              </p>
              <p>
                <span className="bold">Address 2: </span>
                {clientDetails.address_2}
              </p>
              <p>
                <span className="bold">Town: </span>
                {clientDetails.town}
              </p>
              <p>
                <span className="bold">County: </span>
                {clientDetails.county}
              </p>
              <p>
                <span className="bold">Postcode: </span>
                {clientDetails.postcode}
              </p>
            </div>
          </div>
          <div className="client-contact">
            <h2 className="small-heading">Contact Details</h2>
            <div className="spacer">
              <p>
                <span className="bold">Home Telephone: </span>
                {clientDetails.home_tel}
              </p>
              <p>
                <span className="bold">Mobile Telephone: </span>
                {clientDetails.mobile_tel}
              </p>
              <p>
                <span className="bold">Email: </span>
                {clientDetails.email}
              </p>
              <p>
                <span className="bold">Emergency Contact Name: </span>
                {clientDetails.ec_name}
              </p>
              <p>
                <span className="bold">Emergency Contact Telephone: </span>
                {clientDetails.ec_number}
              </p>
            </div>
          </div>
        </div>

        <div className="extra-detail-wrapper">
          <div className="appointments-wrapper">
            <h2 className="small-heading">Appointments</h2>

            {appointments.map((appointment) => {
              // Split the time string by ":" to get hours and minutes
              const timeParts = appointment.time.split(":");
              const hours = parseInt(timeParts[0], 10); // Parse the hours as an integer
              const minutes = timeParts[1].toString().padStart(2, "0");

              // Create a Date object from the date string
              const appointmentDate = new Date(appointment.date);

              // Get the day, month, and year
              const day = appointmentDate.getDate().toString().padStart(2, "0");
              const month = (appointmentDate.getMonth() + 1)
                .toString()
                .padStart(2, "0"); // Month is zero-based, so add 1
              const year = appointmentDate.getFullYear();

              // Determine if it's AM or PM
              const ampm = hours >= 12 ? "PM" : "AM";

              // Convert hours to 12-hour format
              const formattedHours = hours % 12 || 12;

              // Format the date as 'DD-MM-YYYY'
              const formattedDate = `${day}/${month}/${year}`;

              // Format the time as 'HH:MM AM/PM'
              const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

              return (
                <div key={appointment.id} className="appointment-item">
                  <div className="appointment-details">
                    <h3>{appointment.title}</h3>
                    <p>{formattedDate}</p>
                    <p>{formattedTime}</p>
                  </div>
                  <div className="appointment-button">
                    <Link to={"#"}>
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </Link>
                  </div>
                </div>
              );
            })}

            <div className="box-controls">
              <button className="other-button-style">Create Appointment</button>
              <button className="other-button-style">View All</button>
            </div>
          </div>

          <div className="notes-wrapper">
            <div className="notes-title-container">
              <h2 className="small-heading">Notes</h2>
            </div>

            {notes.map((note) => {
              // Split the time string by ":" to get hours and minutes
              const timeParts = note.time.split(":");
              const hours = parseInt(timeParts[0], 10); // Parse the hours as an integer
              const minutes = timeParts[1].toString().padStart(2, "0");

              // Create a Date object from the date string
              const noteDate = new Date(note.date);

              // Get the day, month, and year
              const day = noteDate.getDate().toString().padStart(2, "0");
              const month = (noteDate.getMonth() + 1)
                .toString()
                .padStart(2, "0"); // Month is zero-based, so add 1
              const year = noteDate.getFullYear();

              // Determine if it's AM or PM
              const ampm = hours >= 12 ? "PM" : "AM";

              // Convert hours to 12-hour format
              const formattedHours = hours % 12 || 12;

              // Format the date as 'DD-MM-YYYY'
              const formattedDate = `${day}/${month}/${year}`;

              // Format the time as 'HH:MM AM/PM'
              const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

              return (
                <div className="note-group">
                  <div key={note.id} className="note-container">
                    <div className="note-header">
                      <div>
                        <p>{formattedDate}</p>
                        <p>{formattedTime}</p>
                      </div>
                      <p>Submitted by: {note.user_id}</p>
                    </div>
                    <div className="note-content">
                      <p>{note.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="box-controls">
              <button className="other-button-style">Create Note</button>
              <button className="other-button-style">View All</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
