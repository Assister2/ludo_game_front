import React, { useState } from "react";
import { Redirect } from "react-router";
import CardWraper from "../components/cardwraper";
import getHeader from "../components/session";
import {API_URL} from "../components/url";

export default function ChangePassword({ setLoggedIn }) {
  //form states
  const [oldPassword, setOldPassword] = useState("");
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
    <CardWraper title="Change Password">
      {err === "" || (
        <div className="alert alert-danger" role="alert">
          {err}
        </div>
      )}
      <div className="form-group row">
        <label className="col-sm-4 col-form-label text-md-right">
          Old Password
        </label>
        <div className="col-md-6">
          <input
            type="password"
            className="form-control"
            value={oldPassword}
            disabled={loading}
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-4 col-form-label text-md-right">
          New Password
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
            value={confirmPassword}
            disabled={loading}
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
              const response = await fetch(`${API_URL}/auth/changepassword`, {
                method: "PATCH",
                headers: getHeader(),
                body: JSON.stringify({
                  oldPassword: oldPassword,
                  newPassword: password,
                }),
              });

              const responseBody = await response.json();

              setLoading(false);
              if (responseBody.err) {
                setStateForOnceSec(setErr, responseBody.err);
                return;
              }
              alert("Password changed successfully");
              setTimeout(() => {
                setRedirect("/");
                localStorage.clear();
                setLoggedIn(false);
              }, 500);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </CardWraper>
  );
}
