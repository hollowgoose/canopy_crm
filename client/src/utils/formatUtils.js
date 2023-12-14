export function formatDate(dateString) {
    const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-GB", options);
}

export function formatTime(timeString) {
    const options = { hour: "2-digit", minute: "2-digit", hour12: false };
    const time = new Date(`2000-01-01T${timeString}`).toLocaleTimeString(
        undefined,
        options
    );

    // Determine if it's "AM" or "PM" based on the hour
    const hour = parseInt(time.split(":")[0]);
    const ampm = hour < 12 ? "AM" : "PM";

    return `${time} ${ampm}`;
}

export const typeMappings = {
    drop_in: "Drop-In",
    appointment: "Appointment",
    meeting: "Meeting",
    assessment: "Assessment",
    session: "Session",
    initial_session: "Initial Session",
    final_session: "Final Session",
    supervision: "Supervision",
    // Add more mappings as needed
};

export function mapAppointmentType(type) {
    return typeMappings[type] || type;
}

export const appointmentTypeColors = {
    drop_in: "blue",
    appointment: "green",
    meeting: "green",
    assessment: "teal",
    session: "red",
    initial_session: "#00b2f5",
    final_session: "purple",
    supervision: "yellow",
};
