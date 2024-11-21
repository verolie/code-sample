import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import NavBar from "../../../components/navbar/navbar";
import getStockProduct from "../function/getStockProduct";
import AppContext from "../../../context/AppContext";
import editStockProduct from "../function/editStockProduct";
import deleteStockProduct from "../function/deleteStockProduct";
import "./style.css";

function DetailProduct() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [status, setStatus] = useState("");
  const [productNameError, setProductNameError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { startLoading, stopLoading } = useContext(AppContext);
  const { id } = useParams();

  const getData = async () => {
    const cookies = document.cookie;
    const token = cookies
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      startLoading();
      const dataRequest = {
        productId: id,
      };

      const data = await getStockProduct(token, dataRequest);

      setProductName(data.product_name);
      setQuantity(data.quantity);
      setStatus(data.status);
    } catch (error) {
      alert(error.message || "Failed to fetch product data");
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const validateForm = () => {
    let isValid = true;

    if (!productName.trim()) {
      setProductNameError("Product Name should not be empty.");
      isValid = false;
    } else {
      setProductNameError("");
    }

    if (quantity <= 0) {
      setQuantityError("Quantity should be greater than 0.");
      isValid = false;
    } else {
      setQuantityError("");
    }

    return isValid;
  };

  const handleFormSubmit = async (actionType) => {
    if (validateForm()) {
      const cookies = document.cookie;
      const authToken = cookies
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      const data = {
        idProd: id,
        productName,
        quantity,
        status: actionType,
      };

      startLoading();

      try {
        await editStockProduct(authToken, data);
        alert(
          `Product ${
            status === "draft" ? "saved as draft" : "submitted successfully"
          }!`
        );
        navigate("/");
      } catch (error) {
        console.error("Error submitting product:", error);
      }
    }
  };

  // Handle product deletion
  const handleDelete = () => {
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    const cookies = document.cookie;
    const authToken = cookies
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];

    try {
      await deleteStockProduct(authToken, id);
      closeModal();
      alert("Product deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
      closeModal();
    }
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <div>
      <NavBar />
      <h1 gutterBottom className="title-detail">
        Detail Product
      </h1>
      <Box className="form-project">
        <form onSubmit={(e) => e.preventDefault()}>
          <Box className="box-input">
            <TextField
              fullWidth
              label="Product Name"
              variant="outlined"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              error={!!productNameError}
              helperText={productNameError}
              disabled={!isEditMode}
            />
          </Box>
          <Box className="box-input">
            <TextField
              fullWidth
              label="Quantity"
              variant="outlined"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              error={!!quantityError}
              helperText={quantityError}
              disabled={!isEditMode}
            />
          </Box>

          <Box className="button-form">
            {!isEditMode ? (
              <>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#AE445A", marginRight: "20px" }}
                  onClick={() => navigate("/")}
                >
                  Back
                </Button>
                {status === "inactive" ? (
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#387478", marginRight: "20px" }}
                    onClick={() => handleFormSubmit("active")}
                  >
                    Reactive
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#22177A" }}
                    onClick={toggleEditMode}
                  >
                    Edit
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#AE445A", marginRight: "20px" }}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#AE445A", marginRight: "20px" }}
                  onClick={() => navigate("/")}
                >
                  Back
                </Button>
                {status === "draft" && (
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#22177A",
                      marginRight: "20px",
                    }}
                    onClick={() => handleFormSubmit("draft")}
                  >
                    Save as draft
                  </Button>
                )}
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#387478", marginRight: "20px" }}
                  onClick={() => handleFormSubmit("active")}
                >
                  Submit
                </Button>
              </>
            )}
          </Box>
        </form>
      </Box>

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

export default DetailProduct;
