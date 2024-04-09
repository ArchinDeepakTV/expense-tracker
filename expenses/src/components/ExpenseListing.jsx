import React from "react";
import Navbar from "./Navbar";

export default function ExpenseListing() {
  const [data_from_db, set_data_from_db] = React.useState("");
  const nodeBackendURL = sessionStorage.getItem("nodeBackendURL");

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${nodeBackendURL}/select-from`, {
        mode: "cors",
      });
      const jsons = await response.json();

      if (response.ok) {
        set_data_from_db(jsons);
        console.log("read data from db");
      }
    };
    fetchData();
  }, []);

  const handle_click = async (id) => {
    let new_entry = { id: id };
    console.log(id);
    await fetch(
      `${nodeBackendURL}/expense-delete`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(new_entry),
      },
      { mode: "cors" }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });

    window.location.reload(true);
  };

  return (
    <div
      className="flexJustifyCenter overflow-y-auto"
      style={{
        width: "100vw",
        height: "100vh",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      <div className="flexJustifyCenter" style={{ flexDirection: "column" }}>
        <h1 style={{ textAlign: "center", color: "black" }}>Expenses</h1>
        <Navbar />
      </div>
      <div
        className="overflow-y-auto"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "30px",
          width: "50vw",
          maxHeight: "85vh",
          borderRadius: "1vw",
          flexWrap: "wrap",
        }}
      >
        {data_from_db &&
          data_from_db.map((data) => (
            <div
              className="card"
              key={data.created_time}
              style={{ height: "15vh", margin: "15px" }}
            >
              <div
                className="card-body"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div
                  className="flexJustifyEvenly"
                  style={{ justifyContent: "space-between" }}
                >
                  <h5 className="cart-title">{data.reason}</h5>
                  <button
                    className="button"
                    key={data.created_time}
                    style={{ marginRight: "3vw" }}
                    onClick={(event) => handle_click(data.id)}
                  >
                    <span className="X"></span>
                    <span className="Y"></span>
                  </button>
                </div>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  INR {data.amount}
                </h6>
                <p className="card-text">{data.created_time}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
