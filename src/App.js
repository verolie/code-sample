import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import HomePage from "./views/HomePage/HomePage";
import Login from "./views/login/login";
import CreateProduct from "./views/HomePage/create/CreateProduct";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* Home page route */}
            <Route path="/login" element={<Login />} /> {/* Login route */}
            <Route path="/create-product" element={<CreateProduct />} />{" "}
            {/* Login route */}
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
