import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { getClientById, getUserList } from "../../api/api";

export default function AddIndividualAppointment() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const clientId = searchParams.get("clientId");
  const [client, setClient] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const handleUserSelection = (user) => {
    setSelectedUser(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById("add-appt-form"));

    formData.append("client_id", clientId);

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
        console.log("Appointment added successfully");
        navigate(`/clients/${clientId}`);
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchClient = async () => {
    try {
      const clientData = await getClientById(clientId);
      if (clientData) {
        console.log("Fetched client data:", clientData);
        setClient(clientData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const userList = await getUserList();
      if (userList) {
        console.log("Fetched user list:", userList);
        setUsers(userList.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClient();
    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="main-content">
        <div className="header-container">
          <h1 className="page-header">
            Add an Appointment for {client.first_name} {client.last_name}
          </h1>
          <a href={`/clients/${clientId}`}>
            <button className="other-button-style">
              <i className="fa-regular fa-circle-xmark"></i> Exit
            </button>
          </a>
        </div>

        {/* Form goes here */}
        <div className="content-group">
          <form id="add-appt-form" onSubmit={handleSubmit} method="post">
            <div className="form-group">
              <div className="form-section-split">
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

              <input type="hidden" name="user_id" value={selectedUser} />

              <div className="form-section-split half-page-vertical">
                <label htmlFor="user_id">Attending User:</label>
                <div className="single-appt-user-list" id="userList">
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
