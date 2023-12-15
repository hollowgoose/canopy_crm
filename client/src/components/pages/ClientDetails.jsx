import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getStatusClass } from "../../utils/statusUtils";
import Navbar from "../Navbar";
import {
    formatDate,
    formatTime,
    mapAppointmentType,
} from "../../utils/formatUtils";

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

    useEffect(() => {
        fetch(`http://localhost:3000/api/appointments/${clientId}`)
            .then((response) => {
                if (response.status === 404) {
                    // No appointments found for this client
                    return [];
                }
                return response.json();
            })
            .then((data) => {
                if (Array.isArray(data.data)) {
                    setAppointments(data.data);
                } else {
                    // Handle unexpected data format, e.g., by setting appointments to an empty array
                    setAppointments([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching appointments:", error);
                // Handle the error, e.g., display a message or set appointments to an empty array
                setAppointments([]);
            });
    }, [clientId]);

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
                        <Link to={`/clients/edit/${clientId}`}>
                            <button className="other-button-style">
                                <i className="fa-regular fa-pen-to-square"></i>{" "}
                                Edit Client
                            </button>
                        </Link>

                        <Link to="/clients/">
                            <button className="dark-button-style">
                                <i className="fa-regular fa-circle-xmark"></i>{" "}
                                Exit
                            </button>
                        </Link>
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
                                <span className="bold">
                                    Emergency Contact Name:{" "}
                                </span>
                                {clientDetails.ec_name}
                            </p>
                            <p>
                                <span className="bold">
                                    Emergency Contact Telephone:{" "}
                                </span>
                                {clientDetails.ec_number}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="extra-detail-wrapper">
                    <div className="appointments-wrapper">
                        <h2 className="small-heading">Appointments</h2>

                        <div className="scrollable-box">
                            <table className="appt-table">
                                <thead>
                                    <tr>
                                        <th className="flex-1">Type</th>
                                        <th className="flex-1">Start</th>
                                        <th className="flex-1">End</th>
                                        <th className="flex-1">Date</th>
                                        <th className="flex-0.5">
                                            <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                        </th>
                                    </tr>
                                </thead>
                                {appointments.length === 0 ? (
                                    <tbody>
                                        <tr>
                                            <td colSpan="4">No Appointments</td>
                                        </tr>
                                    </tbody>
                                ) : (
                                    <tbody>
                                        {appointments.map(
                                            (appointment, index) => (
                                                <tr key={appointment.appt_id}>
                                                    <td>
                                                        {mapAppointmentType(
                                                            appointment.type
                                                        )}
                                                    </td>
                                                    <td>
                                                        {formatTime(
                                                            appointment.start_time
                                                        )}
                                                    </td>
                                                    <td>
                                                        {formatTime(
                                                            appointment.end_time
                                                        )}
                                                    </td>
                                                    <td>
                                                        {formatDate(
                                                            appointment.date
                                                        )}
                                                    </td>
                                                    <td>
                                                        <Link
                                                            to={`/appointments/${appointment.appt_id}`}
                                                        >
                                                            <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                )}
                            </table>
                        </div>

                        <div className="box-controls">
                            <Link
                                to={`/appointments/create?clientId=${clientId}`}
                            >
                                <button className="other-button-style">
                                    Create Appointment
                                </button>
                            </Link>
                            <button className="other-button-style">
                                View All
                            </button>
                        </div>
                    </div>

                    <div className="comms-wrapper">
                        <div className="notes-title-container">
                            <h2 className="small-heading">Communications</h2>
                        </div>

                        <div className="scrollable-box"></div>

                        <div className="box-controls">
                            <button className="other-button-style">
                                Create Note
                            </button>
                            <button className="other-button-style">
                                View All
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
