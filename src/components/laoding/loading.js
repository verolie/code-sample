"use client";

import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { CircularProgress } from "@mui/material";
import "./style.css";

const Loading = () => {
  const context = useContext(AppContext);

  if (!context || !context.loadingActive) {
    return null;
  }

  return (
    <div className="loading">
      <CircularProgress />
    </div>
  );
};

export default Loading;
