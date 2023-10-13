import React from "react";

export default function EventComponent({ event }) {
  return (
    <div>
      <strong>{event.title}</strong>
      <p>{event.location}</p>
      <p>{event.description}</p>
    </div>
  );
}
