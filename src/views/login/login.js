import React, { useState, useContext } from "react"; // Add useContext import
import "./login.css";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  CssBaseline,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AppContext from "../../context/AppContext";
import { getUser } from "./function/getUser";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { startLoading, stopLoading } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Validate form data
    validate();

    if (errorMessage) {
      alert(errorMessage);
    } else {
      // Start loading indicator
      startLoading();

      try {
        console.log("form data : ", formData);
        const userData = await getUser(formData);

        // alert(`Login successful! Welcome ${userData.username}`);
        document.cookie = `authToken=${userData.token}; path=/; secure; SameSite=Strict`;

        localStorage.setItem("username", userData.username);

        navigate("/");
      } catch (error) {
        setErrorMessage(error.message);
        alert(error.message);
      } finally {
        stopLoading();
      }
    }
  };

  const validate = (e) => {
    if (formData.username === "" || formData.password === "") {
      setErrorMessage("Username or Password should not be empty");
    }
  };

  return (
    <Container component="main" maxWidth={false} className="loginContainer">
      <CssBaseline />
      <Box
        className="formBox"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
