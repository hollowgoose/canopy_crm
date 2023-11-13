import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment-timezone";
import EventComponent from "./EventComponent";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { typeMappings, formatDate } from "../utils/formatUtils";

const londonTimezone = "Europe/London";

export default function ApptCalendar() {
  // Set the default time zone for Moment.js
  moment.tz.setDefault(londonTimezone);

  const [appointments, setAppointments] = useState([]);
  const [formattedAppointments, setFormattedAppointments] = useState([]);

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
        console.log("INIT DATE", appointment.date);
        // Remove the unwanted time part
        const dateWithoutTime = appointment.date.split("T")[0];
        console.log(dateWithoutTime);

        // Combine date and time to create start and end DateTime strings
        const startDateTime = `${dateWithoutTime}T${appointment.start_time}`;
        console.log(startDateTime);
        const endDateTime = `${dateWithoutTime}T${appointment.end_time}`;
        console.log(endDateTime);

        // Create JavaScript Date objects for start and end
        const start = new Date(startDateTime);
        console.log(start);
        const end = new Date(endDateTime);
        console.log(end);

        const title = typeMappings[appointment.type] || appointment.type;

        const testDate = new Date("2023-11-13");
        console.log("TEST", testDate);

        return {
          title,
          start: start,
          end: end,
          location: "Sight Support Centre",
          description: "A meeting!",
        };
      });

      console.log("Formatted Appointments:", formattedEvents);
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
        components={{
          event: EventComponent,
        }}
      />
    </div>
  );
}
