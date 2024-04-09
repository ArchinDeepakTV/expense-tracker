import React from "react";
import Navbar from "./Navbar";
import Form from "./Form";
import Cards from "./Cards";

export default function LandingPage() {
  const [connected, set_connected] = React.useState(null);
  const nodeBackendURL = sessionStorage.getItem("nodeBackendURL");

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(nodeBackendURL, {
        mode: "cors",
      });
      const jsons = await response.json();

      if (response.ok) {
        set_connected(jsons);
        console.log("connected to nodejs backend");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div
        className="flexJustifyEvenly"
        style={{ flexDirection: "row", width: "100vw", height: "100vh" }}
      >
        <div className="flexJustifyCenter" style={{ flexDirection: "column" }}>
          <h1 style={{ color: "black" }}>{connected}</h1>
          <Navbar />
        </div>
        <div
          className="flexJustifyCenter"
          style={{ flexDirection: "column", width: "50vw" }}
        >
          <Cards />
          <span>total expenditure</span>
          <br />
          <br />
          <Form />
          <span style={{ color: "black" }}>Archin Deepak</span>
        </div>
      </div>
    </>
  );
}
