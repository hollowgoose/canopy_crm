import React from "react";

export default function FilterModal({
  isFilterModalOpen,
  onClose,
  filterCriteria,
  onFilterChange,
}) {
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    console.log("Selected Filter:", value);
    onFilterChange(value);
  };

  const handleCloseClick = () => {
    onClose();
  };

  return (
    <div className={`filter-modal ${isFilterModalOpen ? "open" : ""}`}>
      <h2>Filter by Status</h2>
      <label>
        <input
          type="checkbox"
          value="All"
          onChange={handleCheckboxChange}
          checked={filterCriteria === "All"}
        />
        All
      </label>
      <label>
        <input
          type="checkbox"
          value="New"
          onChange={handleCheckboxChange}
          checked={filterCriteria === "New"}
        />
        New
      </label>
      <label>
        <input
          type="checkbox"
          value="Active"
          onChange={handleCheckboxChange}
          checked={filterCriteria === "Active"}
        />
        Active
      </label>
      <label>
        <input
          type="checkbox"
          value="Waiting"
          onChange={handleCheckboxChange}
          checked={filterCriteria === "Waiting"}
        />
        Waiting
      </label>
      <label>
        <input
          type="checkbox"
          value="Closed"
          onChange={handleCheckboxChange}
          checked={filterCriteria === "Closed"}
        />
        Closed
      </label>
      <button onClick={handleCloseClick}>Close</button>
    </div>
  );
}
