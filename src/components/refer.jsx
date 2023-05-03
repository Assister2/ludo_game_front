import React, { useEffect, useState } from "react";
import CardWraper from "./cardwraper";
import getHeader from "./session";
import {API_URL,  HOST } from "./url";

// const URL = encodeURI("https://api.ludoplayers.com/redirect");
//const URL = "https://localhost:3000/register";
const URL = encodeURI(HOST+"/redirect");

export default function Refer() {
  const [referralCode, setReferalCode] = useState("");
  const [referPercentage, setReferPercentage] = useState("");
  const url = `https://wa.me/?text=Play Ludo and earn ₹10000 daily. ${URL}/${referralCode} Register Now, My refer code is ${referralCode}.`;

  useEffect( () => {

    (async()=>{
      let response = await fetch(`${API_URL}/user/referelcode`, {
        headers: getHeader(),
      });
      let responseBody = await response.json();
      setReferalCode(responseBody.code);
  
      response = await fetch(`${API_URL}/site/percentages`);
      responseBody = await response.json();
      setReferPercentage(responseBody.referBonus);
    })()
  }, []);

  return (
    <CardWraper title="Refer and Earn" size={4}>
      <p>
        You can refer and <b>Earn {referPercentage}%</b> of your referral
        winning, every time.
        <br />
        Like if your player plays for ₹10000 and wins, You will get ₹100 as
        referral amount. Click here to <a href={url}>Share via Whatsapp</a>{" "}
        Refer now.
      </p>
      <h6 className="mt-3 text-center colorCode">
        Referal Code: {referralCode}
      </h6>
      <a style={{ display: "block" }} className="btn btn-success" href={url}>
        Share On Whatsapp
      </a>
    </CardWraper>
  );
}
