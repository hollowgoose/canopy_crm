import React from "react";

export default function EventComponent({ event }) {
    return (
        <div class="event-item">
            {event.time} {event.title}{" "}
        </div>
    );
}
