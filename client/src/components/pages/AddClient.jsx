import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

export default function AddClient() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    console.log(formData);
    const response = await fetch("http://localhost:3000/api/clients/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData),
    });

    if (response.ok) {
      console.log("Client added successfully!");
      // Do more after success
      navigate("/clients");
    } else {
      console.error("Failed to add Client");
    }
  };

  return (
    <>
      <Navbar />
      <div className="main-content">
        <div className="header-container">
          <h1 className="page-header">Add a Client</h1>
          <a href="/clients">
            <button className="other-button-style">
              <i className="fa-regular fa-circle-xmark"></i> Exit
            </button>
          </a>
        </div>

        <div className="content-group">
          <form id="add-client-form" onSubmit={handleSubmit} method="post">
            <div className="form-group">
              <div className="form-section-split">
                <h2 className="small-heading">Personal Details</h2>
                <label htmlFor="title">
                  Title<span className="required">*</span>:
                </label>
                <select className="input-style" name="title" required>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Miss">Miss</option>
                  <option value="Ms">Ms</option>
                </select>

                <label htmlFor="first_name">
                  First Name<span className="required">*</span>:
                </label>
                <input
                  className="input-style"
                  type="text"
                  name="first_name"
                  required
                />

                <label htmlFor="last_name">
                  Last Name<span className="required">*</span>:
                </label>
                <input
                  className="input-style"
                  type="text"
                  name="last_name"
                  required
                />

                <label htmlFor="address_1">
                  Address 1<span className="required">*</span>:
                </label>
                <input
                  className="input-style"
                  type="text"
                  name="address_1"
                  required
                />

                <label htmlFor="address_2">Address 2:</label>
                <input className="input-style" type="text" name="address_2" />

                <label htmlFor="town">
                  Town<span className="required">*</span>:
                </label>
                <input
                  className="input-style"
                  type="text"
                  name="town"
                  required
                />

                <label htmlFor="county">
                  County<span className="required">*</span>:
                </label>
                <input
                  className="input-style"
                  type="text"
                  name="county"
                  required
                />

                <label htmlFor="postcode">
                  Postcode<span className="required">*</span>:
                </label>
                <input
                  className="input-style"
                  type="text"
                  name="postcode"
                  required
                />
              </div>

              <div className="form-group-vertical">
                <div className="form-inner-section">
                  <div className="form-group-vertical"></div>
                  <h2 className="small-heading">Contact Details</h2>
                  <label htmlFor="home_tel">Home Telephone:</label>
                  <input
                    className="input-style"
                    type="tel"
                    name="home_tel"
                    required
                  />

                  <label htmlFor="mobile_tel">Mobile Telephone:</label>
                  <input
                    className="input-style"
                    type="text"
                    name="mobile_tel"
                    required
                  />

                  <label htmlFor="email">Email:</label>
                  <input className="input-style" type="email" name="email" />

                  <label htmlFor="ec_name">Alternative Contact Name:</label>
                  <input className="input-style" type="text" name="ec_name" />

                  <label htmlFor="ec_number">
                    Alternative Contact Telephone:
                  </label>
                  <input className="input-style" type="text" name="ec_number" />
                </div>

                <div className="form-inner-section">
                  <h2 className="small-heading">Assessment Details</h2>
                  <label htmlFor="GAD7">GAD7 score:</label>
                  <input className="input-style" type="number" name="GAD7" />

                  <label htmlFor="PHQ9">PHQ9 score:</label>
                  <input className="input-style" type="number" name="PHQ9" />
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
