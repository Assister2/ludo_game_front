import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {API_URL} from "./url";

export default function Term() {
  const [terms, setTerms] = useState("");
  useEffect(async () => {
    const response = await fetch(`${API_URL}/site/terms`);
    const responseBody = await response.json();
    document.getElementById("shit").innerHTML = responseBody.term;
  }, []);
  return (
    <div className="container" id="shit" style={{ textAlign: "left" }}></div>
  );
}
