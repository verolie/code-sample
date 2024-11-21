import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import NavBar from "../../../components/navbar/navbar";
import createStockProduct from "../function/createStockProduct";
import AppContext from "../../../context/AppContext";
import "./style.css";

function CreateProduct() {
  const navigate = useNavigate();
  const { startLoading } = useContext(AppContext); // Access context
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [productNameError, setProductNameError] = useState("");
  const [quantityError, setQuantityError] = useState("");

  useEffect(() => {
    const cookies = document.cookie;
    const authToken = cookies
      .split("; ")
      .find((row) => row.startsWith("authToken="));

    if (!authToken) {
      navigate("/login"); // Redirect to login if authToken is missing
    }

    setProductName("");
    setQuantity(0);
  }, [navigate]);

  const validateForm = () => {
    let isValid = true;

    // Validate Product Name
    if (!productName.trim()) {
      setProductNameError("Product Name should not be empty.");
      isValid = false;
    } else {
      setProductNameError("");
    }

    // Validate Quantity
    if (quantity <= 0) {
      setQuantityError("Quantity should be greater than 0.");
      isValid = false;
    } else {
      setQuantityError("");
    }

    return isValid;
  };

  const handleFormSubmit = async (status) => {
    if (validateForm()) {
      const cookies = document.cookie;
      const authToken = cookies
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      const data = {
        productName,
        quantity,
        status,
      };

      // Activate loading state
      startLoading();

      try {
        await createStockProduct(authToken, data);
        alert(
          `Product ${
            status === "draft" ? "saved as draft" : "submitted successfully"
          }!`
        );
        navigate("/"); // Navigate to the homepage after successful submission
      } catch (error) {
        console.error("Error submitting product:", error);
      }
    }
  };

  return (
    <div>
      <NavBar />
      <h1 gutterBottom className="title-detail">
        Create Product
      </h1>
      <Box className="form-project">
        <form>
          <Box className="box-input">
            <TextField
              fullWidth
              label="Product Name"
              variant="outlined"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              error={!!productNameError}
              helperText={productNameError}
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
            />
          </Box>

          <Box className="button-form">
            <Button
              variant="contained"
              style={{ backgroundColor: "#AE445A", marginRight: "20px" }}
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "#22177A", marginRight: "20px" }}
              onClick={() => handleFormSubmit("draft")}
            >
              Save as draft
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "#387478", marginRight: "20px" }}
              onClick={() => handleFormSubmit("active")}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
}

export default CreateProduct;
