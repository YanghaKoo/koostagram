import React from "react";
import spinner from "./puff.svg";

const Spinner = ({ width, height, pw, ph }) => {
  const style = { width: width, height: height};
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: pw,
        height: ph,
        
      }}
    >
      <img src={spinner} style={style} alt="" />
    </div>
  );
};

export default Spinner;
