import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import NavBar from "../../components/navbar/navbar";
import formatDate from "./function/formatDate";

function HomePage() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    {
      id: 1,
      productName: "John Doe",
      quantity: 30,
      status: "active",
      updatedBy: 1,
      updatedAt: "2024-11-19T09:23:55.284994+07:00",
    },
    {
      id: 2,
      productName: "Jane Smith",
      quantity: 25,
      status: "draft",
      updatedBy: 1,
      updatedAt: "2024-11-19T09:23:55.284994+07:00",
    },
    {
      id: 3,
      productName: "Alice Johnson",
      quantity: 28,
      status: "inactive",
      updatedBy: 1,
      updatedAt: "2024-11-19T09:23:55.284994+07:00",
    },
  ]);

  const handleCreate = () => {
    console.log("Create button clicked");
  };

  const handleEdit = (id) => {
    console.log("Edit", id);
  };

  const handleDelete = (id) => {
    console.log("Delete", id);
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  useEffect(() => {
    const cookies = document.cookie;
    const authToken = cookies
      .split("; ")
      .find((row) => row.startsWith("authToken="));

    if (!authToken) {
      navigate("/login");
    }
  }, [navigate]);

  // Function to get the background color based on the status
  const getStatusClass = (status) => {
    switch (status) {
      case "active":
        return "status-active"; // Green
      case "inactive":
        return "status-inactive"; // Red
      case "draft":
        return "status-draft"; // Blue
      default:
        return "";
    }
  };

  return (
    <div>
      <NavBar />
      <h1>Home Page</h1>
      <div>Welcome to the Home Page!</div>

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
              <tr key={row.id}>
                <td>{row.productName}</td>
                <td>{row.quantity}</td>
                <td>{row.updatedBy || "N/A"}</td>
                <td>{row.updatedAt ? formatDate(row.updatedAt) : "N/A"}</td>
                <td>
                  <span
                    className={`status-block ${getStatusClass(row.status)}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(row.id)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(row.id)}
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
    </div>
  );
}

export default HomePage;
