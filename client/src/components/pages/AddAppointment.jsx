import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";

export default function AddAppointment() {
  const [clients, setClients] = useState([""]);
  const [users, setUsers] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleClientSelection = (client) => {
    setSelectedClient(client);
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gather form data
    const formData = new FormData(document.getElementById("add-appt-form"));

    // Debug: Log the form data before sending it
    console.log("Form Data:", Object.fromEntries(formData.entries()));

    try {
      const response = await fetch(
        "http://localhost:3000/api/appointments/add",
        {
          method: "POST",
          body: new URLSearchParams(formData),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.ok) {
        // Handle a successful response (e.g., show a success message)
        console.log("Appointment added successfully!");
      } else {
        // Log the error details for debugging
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/clients", {
        headers: {
          "Content-Type": "applicaton/x-www-form-urlencoded",
        },
      });
      const data = await response.json();
      setClients(data.result);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const data = await response.json();
      setUsers(data.result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="main-content">
        <div className="header-container">
          <h1 className="page-header">Add an Appointment</h1>
          <a href="/clients">
            <button className="other-button-style">
              <i className="fa-regular fa-circle-xmark"></i> Exit
            </button>
          </a>
        </div>

        <div className="content-group">
          <form id="add-appt-form" onSubmit={handleSubmit} method="post">
            <div className="appt-form-group">
              <label htmlFor="title">
                Appointment Type<span className="required">*</span>:
              </label>
              <select className="input-style" name="type" required>
                <option value="drop_in">Drop-In</option>
                <option value="session">Session</option>
                <option value="meeting">Meeting</option>
                <option value="assessment">Assessment</option>
                <option value="initial_session">Initial Session</option>
                <option value="final_session">Final Session</option>
                <option value="supervision">Supervision</option>
              </select>

              <label htmlFor="date">
                Date<span className="required">*</span>:
              </label>
              <input type="date" name="date" required />

              <label htmlFor="start_time">
                Start Time<span className="required">*</span>:
              </label>
              <input type="time" name="start_time" required />

              <label htmlFor="end_time">
                End Time<span className="required">*</span>:
              </label>
              <input type="time" name="end_time" required />
            </div>

            <input type="hidden" name="client_id" value={selectedClient} />
            <input type="hidden" name="user_id" value={selectedUser} />

            <div className="form-group">
              <div className="vertical">
                <label htmlFor="client_id">Attending Client:</label>
                <div className="appt-user-list" id="clientList">
                  <ul>
                    {clients.length > 0 ? (
                      clients.map((client) => (
                        <li
                          key={client.client_id}
                          onClick={() =>
                            handleClientSelection(client.client_id)
                          } // Use client.client_id
                          data-client-id={client.client_id}
                          className={
                            selectedClient === client.client_id
                              ? "selected"
                              : "" // Use client.client_id
                          }
                        >
                          {client.first_name} {client.last_name}
                        </li>
                      ))
                    ) : (
                      <p>Loading clients...</p>
                    )}
                  </ul>
                </div>
              </div>

              <div className="vertical">
                <label htmlFor="user_id">Attending User:</label>
                <div className="appt-user-list" id="userList">
                  <ul>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <li
                          key={user.user_id}
                          onClick={() => handleUserSelection(user.user_id)} // Use client.client_id
                          data-user-id={user.user_id}
                          className={
                            selectedUser === user.user_id ? "selected" : "" // Use client.client_id
                          }
                        >
                          {user.first_name} {user.last_name}
                        </li>
                      ))
                    ) : (
                      <p>Loading users...</p>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <input
              className="other-button-style"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
}
