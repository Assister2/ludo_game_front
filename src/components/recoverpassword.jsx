import React, { useState } from "react";
import { Redirect } from "react-router";
import CardWraper from "./cardwraper";
import {API_URL} from "./url";

export default function RecoverPassword() {
  //form states
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //functional states
  const [err, setErr] = useState("");
  const [redirect, setRedirect] = useState("");

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
    <CardWraper title="Reset Password">
      <div className="form-group row">
        {err === "" || (
          <div className="alert alert-danger" role="alert">
            {err}
          </div>
        )}

        <label className="col-sm-4 col-form-label text-md-right">
          Password
        </label>
        <div className="col-md-6">
          <input
            type="password"
            className="form-control"
            value={password}
            disabled={loading}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-4 col-form-label text-md-right">
          Confirm Password
        </label>
        <div className="col-md-6">
          <input
            type="password"
            className="form-control"
            disabled={loading}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="form-group row mb-0">
        <div className="col-md-8 offset-md-4">
          <button
            className="btn btn-primary "
            onClick={async (e) => {
              if (password !== confirmPassword) {
                alert("Password and Confirm Password do not match!");
                return;
              }
              //where all the magic happens
              e.preventDefault();

              setLoading(true);

              //build a header
              const theHeader = new Headers();
              theHeader.append("Content-Type", "application/json");

              const response = await fetch(`${API_URL}/auth/recover`, {
                method: "PATCH",
                headers: theHeader,
                body: JSON.stringify({
                  phone: localStorage.getItem("phone"),
                  otp: localStorage.getItem("otp"),
                  password: password,
                }),
              });

              const responseBody = await response.json();

              setLoading(false);
              if (responseBody.err) {
                setStateForOnceSec(setErr, responseBody.err);
                return;
              }
              setRedirect("/logout");
            }}
          >
            Reset Password
          </button>
        </div>
      </div>
    </CardWraper>
  );
}
