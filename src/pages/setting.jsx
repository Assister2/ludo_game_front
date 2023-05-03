import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardWraper from "../components/cardwraper";
import getHeader from "../components/session";
import {API_URL} from "../components/url";

export default function Setting({ user }) {
  const [username, setUsername] = useState(user.username);

  //functional states
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function setStateForOnceSec(setState, value) {
    setState(value);
    setTimeout(() => {
      setState("");
    }, 4 * 1000);
  }

  return (
    <CardWraper size={5} title="Settings">
      {success && (
        <div className="alert alert-success" role="alert">
          Username Updated
        </div>
      )}
      {err === "" || (
        <div className="alert alert-danger" role="alert">
          {err}
        </div>
      )}
      <div className="form-group row">
        <label className="col-sm-4 col-form-label text-md-right">
          Mobile Number
        </label>
        <div className="col-md-6">
          <input
            type="number"
            className="form-control"
            value={user.phone}
            readOnly
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-4 col-form-label text-md-right">
          Username
        </label>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            value={username}
            disabled={loading}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      <div style={{ textAlign: "left" }}>
        <button
          className="btn btn-primary"
          onClick={async () => {
            setLoading(true);
            const response = await fetch(`${API_URL}/user/profile`, {
              method: "PATCH",
              headers: getHeader(),
              body: JSON.stringify({ username: username }),
            });

            const responseBody = await response.json();

            setLoading(false);
            if (responseBody.err) {
              setErr(responseBody.err);
              return;
            }
            setStateForOnceSec(setErr, "");
            setStateForOnceSec(setSuccess, true);
          }}
        >
          Update Changes
        </button>
        <br />
        <br />
        <Link
          style={{ display: "block" }}
          className="btn btn-success"
          to="/changepassword"
        >
          Change Password
        </Link>
      </div>
    </CardWraper>
  );
}
