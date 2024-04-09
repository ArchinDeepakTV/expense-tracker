import React from "react";

export default function Cards() {
  const [total_expenditure, set_total_expenditure] = React.useState(0.0);
  const nodeBackendURL = sessionStorage.getItem("nodeBackendURL");

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${nodeBackendURL}/select-total`, {
        mode: "cors",
      });
      const jsons = await response.json();

      if (response.ok) {
        console.log(jsons);
        set_total_expenditure(jsons[0]["total"]);
        console.log("connected to nodejs backend");
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className="card flexJustifyEvenly bgContainer"
      style={{
        border: "1px solid black",
        width: "15vw",
        height: "9vh",
        flexDirection: "row",
        margin: "25px",
      }}
    >
      <div style={{ display: "flex", width: "15vw", alignItems: "center" }}>
        <h3 style={{ width: "25%", textAlign: "center", color: "black" }}>
          INR
        </h3>
        <div className="vl"></div>
        <h3 style={{ width: "70%", textAlign: "center", color: "black" }}>
          {total_expenditure}
        </h3>
      </div>
    </div>
  );
}
