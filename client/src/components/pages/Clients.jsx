import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getStatusClass } from "../../utils/statusUtils";
import Navbar from "../Navbar";
import FilterModal from "../FilterModal";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [totalFilteredPages, setTotalFilteredPages] = useState(1);

  const fetchClientData = async (page) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/clients?page=${page}&filter=${filterCriteria}`
      );
      const data = await response.json();

      const totalHeader = response.headers.get("X-Total-Pages");
      const total = totalHeader ? parseInt(totalHeader, 10) : 1;

      setTotalFilteredPages(total);

      setClients(data);
      setTotalPages(total);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  useEffect(() => {
    fetchClientData(currentPage);
  }, [currentPage, filterCriteria]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  const handleFilterChange = (newFilterCriteria) => {
    setFilterCriteria(newFilterCriteria);
    setIsFilterModalOpen(false); // Close the filter modal
  };

  // Generate an array of page numbers
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <>
      <Navbar />
      <div className="main-content">
        <div className="header-container">
          <div className="client-header">
            <h1 className="page-header">Clients</h1>
          </div>
          <div className="header-buttons">
            <button className="other-button-style" onClick={toggleFilterModal}>
              <i className="fa-solid fa-filter"></i> Filter
            </button>

            <a href="/clients/add">
              <button className="other-button-style">
                <i className="fa-solid fa-user-plus"></i> Add Client
              </button>
            </a>
          </div>
        </div>

        <div className="content-group">
          <div className="table-wrapper">
            <table className="client-table">
              <thead>
                <tr>
                  <th className="flex-1">Name</th>
                  <th className="flex-1">Status</th>
                  <th className="flex-1">Telephone</th>
                  <th className="flex-1">Email</th>
                  <th className="flex-0.5">
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.client_id}>
                    <td>
                      {client.first_name} {client.last_name}
                    </td>
                    <td>
                      <p className={getStatusClass(client.status)}>
                        {client.status}
                      </p>
                    </td>
                    <td>{client.mobile_tel}</td>
                    <td>{client.email}</td>
                    <td>
                      <Link to={`/clients/${client.client_id}`}>
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </Link>
                    </td>
                  </tr>
                ))}

                {/* Add empty rows. Fill remaining space */}
                {Array.from({ length: 10 - clients.length }).map((_, index) => (
                  <tr key={`empty-row-${index}`}>
                    <td colSpan="5">&nbsp;</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="table-footer">
              <button className="other-button-style" onClick={handlePrevPage}>
                Previous
              </button>

              <div className="page-numbers">
                {Array.from({ length: totalFilteredPages }, (_, index) => (
                  <p
                    key={index + 1}
                    className={currentPage === index + 1 ? "active-page" : ""}
                    onClick={() => setCurrentPage(index + 1)}
                    style={{ cursor: "pointer" }}
                  >
                    {index + 1}
                  </p>
                ))}
              </div>

              <button
                className="other-button-style"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {isFilterModalOpen && (
        <FilterModal
          isFilterModalOpen={isFilterModalOpen}
          onFilterChange={handleFilterChange} // Ensure this is correct
          onClose={() => setIsFilterModalOpen(false)}
        />
      )}
    </>
  );
}
