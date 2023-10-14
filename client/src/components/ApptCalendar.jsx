import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import EventComponent from "./EventComponent";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { typeMappings } from "../utils/formatUtils";

export default function ApptCalendar() {
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
    // Function to format the appointments for the calendar
    const formatAppointmentsForCalendar = () => {
      const formattedEvents = appointments.map((appointment) => {
        const dateParts = appointment.date.split("-"); // Assuming date is in "YYYY-MM-DD" format
        const timeParts = appointment.start_time.split(":"); // Assuming time is in "HH:mm" format

        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; // Months are 0-based in JavaScript
        const day = parseInt(dateParts[2]);
        const hours = parseInt(timeParts[0]);
        const minutes = parseInt(timeParts[1]);

        const start = new Date(year, month, day, hours, minutes);

        // Repeat the same process for the end time
        const endParts = appointment.end_time.split(":");
        const endHours = parseInt(endParts[0]);
        const endMinutes = parseInt(endParts[1]);
        const end = new Date(year, month, day, endHours, endMinutes);

        const title = typeMappings[appointment.type] || appointment.type;

        return {
          title,
          start,
          end,
          location: "Sight Support Centre",
          description: "A meeting!",
        };
      });

      setFormattedAppointments(formattedEvents);
    };

    formatAppointmentsForCalendar();
  }, [appointments]);

  const localizer = momentLocalizer(moment);

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
