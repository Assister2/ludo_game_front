import React, { useState } from "react";
import { Card } from "react-bootstrap";
import getHeader from "./session";
import Wraper from "./wraper";
import {API_URL} from "./url";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
export default function Otp({ redirection, type, setLoggedIn }) {
  //user interface states
  const [resend, setResend] = useState("");
  const [loading, setLoading] = useState(false);

  //form states
  const [otp, setOtp] = useState("");

  //functional states
  const [err, setErr] = useState("");
  const [redirect, setRedirect] = useState("");

  function setStateForOnceSec(setState, value) {
    setState(value);
    setTimeout(() => {
      setState("");
    }, 4 * 1000);
  }

  async function resendotp(e) {
    e.preventDefault();
    setResend("disabled");
    setTimeout(() => {
      setResend("");
    }, 30 * 1000);
    console.log(localStorage.getItem("phone"));
    const response = await fetch(
      `${API_URL}/auth/${type === "recovery" ? "sendrecoveryotp" : "resend"}`,
      {
        method: "PATCH",
        body: JSON.stringify({ phone: localStorage.getItem("phone") }),
        headers: getHeader(),
      }
    );
    const resBody = await response.json();
    console.log(resBody);
  }

  if (redirect !== "") {
    return <Redirect to={redirect} />;
  }

  return (
    <Wraper colSize={6}>
      <Card style={{ marginTop: 20 }}>
        <Card.Header>
          Confirm OTP (sent to {localStorage.getItem("phone")})
        </Card.Header>
        <Card.Body>
          {err === "" || (
            <div className="alert alert-danger" role="alert">
              {err}
            </div>
          )}
          <div className="form-group row">
            <label className="col-sm-4 col-form-label text-md-right">
              Enter OTP
            </label>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                value={otp}
                disabled={loading}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="form-group row mb-0">
            <div className="col-md-8 offset-md-4">
              <button
                type="submit"
                className="btn btn-primary "
                onClick={async () => {
                  setLoading(true);
                  const response = await fetch(`${API_URL}/auth/confirmotp`, {
                    method: "POST",
                    headers: getHeader(),
                    body: JSON.stringify({
                      phone: localStorage.getItem("phone"),
                      otpCode: otp,
                    }),
                  });

                  const responseBody = await response.json();
                  setLoading(false);
                  if (responseBody.err) {
                    setStateForOnceSec(setErr, responseBody.err);
                    return;
                  }

                  if (type === "recovery") {
                    localStorage.setItem("otp", otp);
                    setRedirect(redirection);
                    return;
                  } else {
                    localStorage.setItem("otp", otp);
                    localStorage.setItem("otpConfirmed", true);
                    localStorage.setItem("loggedIn", true);
                    setRedirect("/");
                    setLoggedIn(true);
                  }
                }}
              >
                Continue
              </button>
              <Link
                className={`resendotp btn btn-link ${resend}`}
                onClick={resendotp}
              >
                Resend OTP
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Wraper>
  );
}
