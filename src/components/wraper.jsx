import React from "react";

export default function Wraper({ children, colSize }) {
  return (
    <div className="row no-gutters justify-content-center">
      <div className={`col-10 col-md-${colSize}`}>{children}</div>
    </div>
  );
}
