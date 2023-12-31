import React from "react";

const CircularLoading = ({ height, width, color }) => {
  return (
    <div
      className="spinner-border"
      role="status"
      style={{ height: height, width: width, color: color }}
    ></div>
  );
};
export default CircularLoading;
