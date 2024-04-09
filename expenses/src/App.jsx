import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ExpenseListing from "./components/ExpenseListing";

function App() {
  sessionStorage.setItem(
    "nodeBackendURL",
    "https://expenses-tracker.duckdns.org"
  );
  // sessionStorage.setItem("nodeBackendURL", "http://localhost:5050");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/expensesList" element={<ExpenseListing />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
