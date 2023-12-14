import React from "react";

export default function EventComponent({ event }) {
    return (
        <div>
            <strong>{event.title}</strong>
            <p>{event.clientName}</p>
            <p>{event.time}</p>
        </div>
    );
}
