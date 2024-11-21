import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import HomePage from "./views/HomePage/HomePage";
import Login from "./views/login/login";
import DetailProduct from "./views/HomePage/detail/DetailProduct";
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
            {/* Create product route */}
            <Route
              path="/detail-product/:id"
              element={<DetailProduct />}
            />{" "}
            {/* Detail with ID */}
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
