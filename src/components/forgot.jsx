import React from "react";
import { useState } from "react";
import { Redirect } from "react-router";
import CardWraper from "./cardwraper";
import {API_URL} from "./url";

export default function Forgot() {
  //form states
  const [phone, setPhone] = useState("");

  //functional states
  const [redirect, setRedirect] = useState("");
  const [err, setErr] = useState("");

  function setStateForOnceSec(setState, value) {
    setState(value);
    setTimeout(() => {
      setState("");
    }, 4 * 1000);
  }

  const [loading, setLoading] = useState(false);

  //redirecting
  if (redirect !== "") {
    return <Redirect to={redirect} />;
  }

  return (
    <CardWraper title="Forgot Password">
      {err === "" || (
        <div className="alert alert-danger" role="alert">
          {err}
        </div>
      )}
      <div className="form-group row">
        <label className="col-sm-4 col-form-label text-md-right">
          Enter Phone Number
        </label>
        <div className="col-md-6">
          <input
            type="number"
            className="form-control"
            value={phone}
            disabled={loading}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group row mb-0">
        <div className="col-md-8 offset-md-4 align-left">
          <button
            className="btn btn-primary "
            onClick={async (e) => {
              e.preventDefault();
              localStorage.setItem("phone", phone);

              setLoading(true);

              //generate a headers
              const theHeader = new Headers();
              theHeader.append("Content-Type", "application/json");

              const response = await fetch(`${API_URL}/auth/sendrecoveryotp`, {
                method: "PATCH",
                headers: theHeader,
                body: JSON.stringify({
                  phone: phone,
                }),
              });

              const responseBody = await response.json();

              setLoading(false);
              if (responseBody.err) {
                setStateForOnceSec(setErr, responseBody.err);
                return;
              }
              setRedirect("/recoveryotp");
            }}
          >
            Forget
          </button>
        </div>
      </div>
    </CardWraper>
  );
}
