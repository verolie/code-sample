import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import "./style.css";

function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState("Guest"); // Default username
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  useEffect(() => {
    // Fetch username from localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []); // Empty dependency array to run only once

  const handleClickUser = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="container-navbar">
      <Grid
        container
        spacing={1}
        alignItems="center"
        onClick={handleClickUser}
        className="grid-item-account"
      >
        <Grid item className="icon">
          <AccountCircleIcon fontSize="large" />
        </Grid>
        <Grid item className="icon">
          <Typography>{username}</Typography>
        </Grid>
      </Grid>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        className="menu-logout"
      >
        <MenuItem onClick={handleLogout}>
          Log Out
          <ExitToAppIcon style={{ marginLeft: "8px" }} />
        </MenuItem>
      </Menu>
    </div>
  );
}

export default NavBar;
