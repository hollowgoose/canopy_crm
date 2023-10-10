import React from "react";

export default function FilterModal({ isFilterModalOpen, onClose }) {
  const handleCheckboxChange = (event) => {
    // Handle checkbox changes here
    // You can update the filter criteria based on the selected checkboxes
  };

  const handleCloseClick = () => {
    // Call the onClose function to close the modal
    onClose();
  };

  return (
    <div className={`filter-modal ${isFilterModalOpen ? "open" : ""}`}>
      <h2>Filter by Status</h2>
      <label>
        <input type="checkbox" value="All" onChange={handleCheckboxChange} />
        All
      </label>
      <label>
        <input type="checkbox" value="New" onChange={handleCheckboxChange} />
        New
      </label>
      <label>
        <input type="checkbox" value="Active" onChange={handleCheckboxChange} />
        Active
      </label>
      <label>
        <input type="checkbox" value="Closed" onChange={handleCheckboxChange} />
        Closed
      </label>
      <button onClick={handleCloseClick}>Close</button>
    </div>
  );
}
