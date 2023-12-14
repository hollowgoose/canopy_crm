import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment-timezone";
import EventComponent from "./EventComponent";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
    typeMappings,
    formatDate,
    formatTime,
    formatTimeOnly,
    appointmentTypeColors,
} from "../utils/formatUtils";
import { getClientById } from "../api/api";

const londonTimezone = "Europe/London";

export default function ApptCalendar() {
    // Set the default time zone for Moment.js
    moment.tz.setDefault(londonTimezone);

    const [appointments, setAppointments] = useState([]);
    const [formattedAppointments, setFormattedAppointments] = useState([]);

    const eventStyleGetter = (event, start, end, isSelected) => {
        var style = {
            backgroundColor: event.style.backgroundColor,
            borderRadius: "10px",
            opacity: 0.8,
            color: "white",
            border: "0px",
            display: "block",
        };
        return {
            style: style,
        };
    };

    useEffect(() => {
        fetch("http://localhost:3000/api/appointments")
            .then((response) => response.json())
            .then((data) => {
                setAppointments(data.result);
            });
    }, []);

    useEffect(() => {
        const formatAppointmentsForCalendar = () => {
            const formattedEvents = appointments.map((appointment) => {
                console.log(appointment);

                // Remove the unwanted time part
                const dateWithoutTime = appointment.date.split("T")[0];

                // Combine date and time to create start and end DateTime strings
                const startDateTime = `${dateWithoutTime}T${appointment.start_time}Z`;

                const endDateTime = `${dateWithoutTime}T${appointment.end_time}Z`;

                // Create JavaScript Date objects for start and end
                const start = new Date(startDateTime);

                const end = new Date(endDateTime);

                const title =
                    typeMappings[appointment.type] || appointment.type;

                const s_time = formatTime(appointment.start_time);
                const e_time = formatTime(appointment.end_time);

                const timeRange = `${s_time} - ${e_time}`;

                const client = getClientById(appointment.client_id);
                console.log(client);

                const clientName = client.first_name;

                return {
                    title,
                    time: `${s_time}`,
                    clientName: `${clientName}`,
                    start: start,
                    end: end,

                    style: {
                        backgroundColor:
                            appointmentTypeColors[appointment.type] ||
                            "#0275d8",
                    },
                };
            });

            setFormattedAppointments(formattedEvents);
        };

        formatAppointmentsForCalendar();
    }, [appointments]);

    const localizer = momentLocalizer(moment);

    const initialDate = moment().set({
        hour: 9,
        minute: 0,
        second: 0,
        millisecond: 0,
    });

    return (
        <div className="calendar-container">
            <Calendar
                localizer={localizer}
                events={formattedAppointments}
                startAccessor="start"
                endAccessor="end"
                // defaultView="week"
                // min={
                //     new Date(
                //         moment()
                //             .set({
                //                 hour: 9,
                //                 minute: 0,
                //                 second: 0,
                //                 millisecond: 0,
                //             })
                //             .toDate()
                //     )
                // }
                components={{
                    event: EventComponent,
                }}
                onSelectEvent={(event) => {
                    alert(event.title);
                }}
                eventPropGetter={eventStyleGetter}
            />
        </div>
    );
}
