import React, { useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/react";

function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className="sweet-loading text-center">
      <PuffLoader color="#000" loading={loading} css={override} size={80} />
    </div>
  );
}

export default Loader;
