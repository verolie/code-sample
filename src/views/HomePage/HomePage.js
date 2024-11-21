import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import NavBar from "../../components/navbar/navbar";
import formatDate from "./function/formatDate";
import getStockProduct from "./function/getStockProduct";
import deleteStockProduct from "./function/deleteStockProduct";
import AppContext from "../../context/AppContext";

function HomePage() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState();
  const [authToken, setAuthToken] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { startLoading, stopLoading } = useContext(AppContext); // Access context

  const fetchStockProducts = async () => {
    // Get authToken from cookies
    const cookies = document.cookie;
    const token = cookies
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];

    if (!token) {
      navigate("/login");
      return;
    }

    setAuthToken(token);

    try {
      startLoading();
      const dataRequest = {
        currentPage,
        rowsPerPage,
      };

      const data = await getStockProduct(token, dataRequest);

      setRows(data.detail || []);
      setTotalPages(data.total_page || 1);
      setTotalData(data.total);
    } catch (error) {
      alert(error);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchStockProducts();
  }, [currentPage]); // Refetch when page or rowsPerPage changes

  const handleCreate = () => {
    navigate("/create-product");
  };

  const handleEdit = (id) => {
    console.log("Edit", id);
    navigate(`/detail-product/${id}`);
  };

  const openModal = (StockProductID) => {
    setSelectedId(StockProductID);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  };

  const confirmDelete = async (event) => {
    event.preventDefault();
    try {
      await deleteStockProduct(authToken, selectedId);
      closeModal();
      fetchStockProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "active":
        return "status-active";
      case "inactive":
        return "status-inactive";
      case "draft":
        return "status-draft";
      default:
        return "";
    }
  };

  return (
    <div>
      <NavBar />
      <h1>Home Page</h1>

      {/* Create button */}
      <div className="grid-create-button">
        <button className="create-button" onClick={handleCreate}>
          Create
        </button>
      </div>

      {/* Table */}
      <div className="grid-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Updated By</th>
              <th>Updated At</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.StockProductID}>
                <td>{row.ProductName}</td>
                <td>{row.Quantity}</td>
                <td>{row.UpdatedBy || "N/A"}</td>
                <td>{row.UpdatedAt ? formatDate(row.UpdatedAt) : "N/A"}</td>
                <td>
                  <span
                    className={`status-block ${getStatusClass(row.Status)}`}
                  >
                    {row.Status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(row.StockProductID)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openModal(row.StockProductID)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span style={{ marginRight: "10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <p className="pagination">Total Data: {totalData}</p>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this item?</p>
            <div className="modal-buttons">
              <button onClick={confirmDelete} className="confirm-button">
                Yes, Delete
              </button>
              <button onClick={closeModal} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
