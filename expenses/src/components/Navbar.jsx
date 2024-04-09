import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <div
          className="container-fluid flexJustifyEvenly"
          style={{ width: "25vw" }}
        >
          <Link to={"/"}>
            <button
              className="btn me-2"
              type="button"
              style={{
                border: "1px solid black",
                color: "black",
              }}
            >
              HOME
            </button>
          </Link>
          <Link to={"/expensesList"}>
            <button
              className="btn me-2"
              type="button"
              style={{
                border: "1px solid black",
                color: "black",
              }}
            >
              LIST OF EXPENSES
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
