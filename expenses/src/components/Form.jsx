import React from "react";

export default function Form() {
  const [reason, set_reason] = React.useState("");
  const [amount, set_amount] = React.useState("");
  const nodeBackendURL = sessionStorage.getItem("nodeBackendURL");

  const handle_form = async (event) => {
    event.preventDefault();
    let reasons = reason.toUpperCase();
    let new_entry = { name: reasons, amount: amount };
    await fetch(
      `${nodeBackendURL}/DB-insert`,
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
    window.location.href = "/";
  };

  return (
    <form onSubmit={handle_form}>
      <input
        type="text"
        name="reason"
        placeholder="spending reason"
        onChange={(e) => set_reason(e.target.value)}
        style={{
          textAlign: "center",
          margin: "10px",
          height: "3vh",
          width: "8vw",
          border: "1px solid gray",
          backgroundColor: "white",
          color: "black",
        }}
        maxLength={30}
        value={reason}
        autoFocus
      />
      <input
        type="number"
        name="amount"
        placeholder="amount in INR"
        onChange={(e) => set_amount(e.target.value)}
        style={{
          textAlign: "center",
          margin: "10px",
          height: "3vh",
          width: "7vw",
          border: "1px solid gray",
          backgroundColor: "white",
          color: "black",
        }}
        step={0.1}
        value={amount}
      />
      <br />
      <div
        className="flexJustifyCenter"
        style={{
          margin: "10px",
          border: "1px solid black",
          borderRadius: "1vh",
        }}
      >
        <button className="btn" type="submit">
          <b>Add Expense</b>
        </button>
        <span>Archin Deepak</span>
      </div>
    </form>
  );
}
