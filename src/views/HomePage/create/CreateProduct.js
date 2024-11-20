import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./style.css";
import NavBar from "../../../components/navbar/navbar";

function CreateProduct() {
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const cookies = document.cookie;
    const authToken = cookies
      .split("; ")
      .find((row) => row.startsWith("authToken="));

    if (!authToken) {
      navigate("/login"); // Redirect to login if authToken is missing
    }
  }, [navigate]);

  return (
    <div>
      <NavBar />
      <h1>Home Page</h1>
      <div>Welcome to the Home Page!</div>
    </div>
  );
}

export default CreateProduct;
