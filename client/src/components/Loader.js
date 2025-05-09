import React, { useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";

function Loader() {
  const [loading] = useState(true);

  return (
    <div style={{ display: "flex", marginTop: "150px", justifyContent: "center", alignItems: "flex-start", height: "100vh" }}>
      <PuffLoader color="#000" loading={loading} size={80} />
    </div>
  );
}

export default Loader;
