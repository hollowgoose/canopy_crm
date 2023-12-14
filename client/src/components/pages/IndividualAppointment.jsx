import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { getIndividualAppointment, getClientById } from "../../api/api";
import { mapAppointmentType, formatDate } from "../../utils/formatUtils";

export default function IndividualAppointment() {
    const { apptId } = useParams();

    const [appointment, setAppointment] = useState(null);
    const [client, setClient] = useState(null);

    useEffect(() => {
        const fetchAppointmentData = async () => {
            try {
                const apptData = await getIndividualAppointment(apptId);
                if (apptData) {
                    console.log("Fetched appointment data:", apptData);
                    setAppointment(apptData.data[0]);
                    // Now fetch the client using the clientId from the appointment
                    const clientData = await getClientById(
                        apptData.data[0].client_id
                    );
                    if (clientData) {
                        console.log("Fetched client:", clientData);
                        setClient(clientData);
                    }
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchAppointmentData();
    }, [apptId]); // Dependency on apptId so it refetches if that changes

    if (!appointment || !client) {
        return <div>Loading...</div>; // Or some other loading state
    }

    return (
        <>
            <Navbar />
            <div className="main-content">
                <div className="header-container">
                    <h1 className="page-header">
                        Viewing {mapAppointmentType(appointment.type)} for{" "}
                        <a
                            class="client_link"
                            href={`/clients/${client.client_id}`}
                        >
                            {client.first_name} {client.last_name}
                        </a>
                    </h1>
                    <div className="appt-buttons">
                        <a href={`/clients/${client.id}/edit`}>
                            <button className="other-button-style">
                                <i className="fa-regular fa-pen-to-square"></i>{" "}
                                Edit
                            </button>
                        </a>
                        <a href={`/appointments`}>
                            <button className="dark-button-style">
                                <i className="fa-regular fa-circle-xmark"></i>{" "}
                                Exit
                            </button>
                        </a>
                    </div>
                </div>

                <p>Type: {mapAppointmentType(appointment.type)}</p>
                <p>Date: {formatDate(appointment.date)}</p>
                <p>Time: {appointment.time}</p>
                {/* ... other appointment details ... */}
            </div>
        </>
    );
}

// import React, { useState, useEffect } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import Navbar from "../Navbar";
// import { getIndividualAppointment, getClientById } from "../../api/api";
// import { mapAppointmentType, formatDate } from "../../utils/formatUtils";

// export default function IndividualAppointment() {
//     const { apptId } = useParams();

//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const apptClient = searchParams.get("apptClient");

//     const [appointment, setAppointment] = useState([]);
//     const [client, setClient] = useState([]);

//     const fetchAppointment = async () => {
//         try {
//             const apptData = await getIndividualAppointment(apptId);
//             if (apptData) {
//                 console.log("Fetched appointment data:", apptData);
//                 setAppointment(apptData.data[0]);
//             }
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const fetchClient = async () => {
//         try {
//             console.log(apptClient);
//             const clientData = await getClientById(apptClient);
//             if (clientData) {
//                 console.log("Fetched client:", clientData);
//                 setClient(clientData);
//             }
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     useEffect(() => {
//         fetchAppointment();
//         console.log(appointment);
//     }, []);

//     useEffect(() => {
//         fetchClient();
//     }, []);

//     return (
//         <>
//             <Navbar />

//             <div className="main-content">
//                 <div className="header-container">
//                     <h1 className="page-header">
//                         Viewing {mapAppointmentType(appointment.type)} for{" "}
//                         {client.first_name} {client.last_name}
//                     </h1>
//                     <div className="appt-buttons">
//                         <a href={`/clients/`}>
//                             <button className="other-button-style">
//                                 <i className="fa-regular fa-pen-to-square"></i>{" "}
//                                 Edit
//                             </button>
//                         </a>
//                         <a href={`/clients/${apptClient}`}>
//                             <button className="dark-button-style">
//                                 <i className="fa-regular fa-circle-xmark"></i>{" "}
//                                 Exit
//                             </button>
//                         </a>
//                     </div>
//                 </div>

//                 <p>Type: {mapAppointmentType(appointment.type)}</p>
//                 <p>Date: {formatDate(appointment.date)}</p>
//                 <p>Time: {appointment.time}</p>
//             </div>
//         </>
//     );
// }
