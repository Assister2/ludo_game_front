import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Redirect } from "react-router";
import CardWraper from "./cardwraper";
import Wraper from "./wraper";
import {API_URL} from "./url";

export default function Help() {
  const [whatsapNumber, setWhatsappNumber] = useState("");

  useEffect(async () => {
    let response = await fetch(`${API_URL}/site/phone`);
    let responseBody = await response.json();
    setWhatsappNumber(responseBody.phone);
  });

  if (!localStorage.getItem("loggedIn")) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      
      
      <CardWraper size={5} title={<>Watch This Video to Know How To Play</>}>
        <p>
          If You have any Problem, Please Contact Support at Whatsapp ({whatsapNumber}) Your Problem will
          be solved in Within 12 Hours.
        </p>
        <a
          href={`https://api.whatsapp.com/send/?phone=${whatsapNumber}&text=I+have+an+issue.+Please+Help+Me+&app_absent=0`}
        >
          <p>Click here To Contact Admin on Whatsapp</p>
        </a>
      </CardWraper>


  
      <Wraper colSize={4}>
        <Card style={{ marginTop: 20 }}>
          <Card.Body>
            <h3 style={{ textAlign: "center" }}>
              How To Play Games & Earn? 
            </h3>
            <div className="embed-responsive embed-responsive-16by9">
            <iframe width="auto" height="auto" src="https://www.youtube.com/embed/LSfTtps5yHA?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

            </div>

          </Card.Body>
        </Card>
      </Wraper>
      <Wraper colSize={4}>
        <Card style={{ marginTop: 20 }}>
          <Card.Body>
            <h3 style={{ textAlign: "center" }}>
              How To Buy Chips? (Phonepe)
            </h3>
            <div className="embed-responsive embed-responsive-16by9">
            <iframe width="auto" height="auto" src="https://www.youtube.com/embed/u1_T8-mqqT0?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

            </div>

          </Card.Body>
        </Card>
      </Wraper>
      <Wraper colSize={4}>
        <Card style={{ marginTop: 20 }}>
          <Card.Body>
            <h3 style={{ textAlign: "center" }}>
              How To Sell or Withdraw Chips?
            </h3>
            <div className="embed-responsive embed-responsive-16by9">
            <iframe width="auto" height="auto" src="https://www.youtube.com/embed/Mmvb1VnRvk0?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

            </div>

          </Card.Body>
        </Card>
      </Wraper>













    </>
  );
}
