import React from "react";
import { Card } from "react-bootstrap";
import Wraper from "./wraper.jsx";
import CardWraper from "./cardwraper";

export default function Closed({ title, description }) {
  return (
    //<Wraper colSize={4}>
    <CardWraper size={5} title={<>{title}</>}>
      <p style={{ textAlign: "center" }}>{description}</p>
      <img
        className="img-fluid"
        src="https://ludokhelo.com/images/comeback.jpg"
      />
    </CardWraper>
    //</Wraper>
  );
}
