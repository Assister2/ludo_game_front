import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Wraper from "./wraper";
import { Link, Redirect } from "react-router-dom";
import {API_URL} from "./url";

export default function Login({ setLoggedIn, loggedIn }) {
  //form states
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  //functionalitywise states
  const [err, setErr] = useState("");

  function setStateForOnceSec(setState, value) {
    setState(value);
    setTimeout(() => {
      setState("");
    }, 4 * 1000);
  }

  const [loading, setLoading] = useState(false);

  if (loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Wraper colSize={6}>
      <Card style={{ marginTop: 20 }}>
        <Card.Header>Login</Card.Header>
        <Card.Body>
          <form>
            {err === "" || (
              <div className="alert alert-danger" role="alert">
                {err}
              </div>
            )}
            <div className="form-group row">
              <label className="col-sm-4 col-form-label text-md-right">
                Whatsapp Number
              </label>
              <div className="col-md-6">
                <input
                  type="number"
                  className="form-control"
                  value={phone}
                  disabled={loading}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-group row">
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
            <div className="form-group row mb-0">
              <div className="col-md-8 offset-md-4  align-left">
                <button
                  type="submit"
                  className="btn btn-primary btn-sm "
                  onClick={async (e) => {
                    e.preventDefault();

                    setLoading(true);
                    //make a headers
                    let theHeader = new Headers();
                    theHeader.append("Content-Type", "application/json");

                    //send the request
                    const response = await fetch(`${API_URL}/auth/login`, {
                      method: "POST",
                      headers: theHeader,
                      body: JSON.stringify({
                        phone: phone,
                        password: password,
                      }),
                    });

                    //parse the body
                    const responseBody = await response.json();
                    setLoading(false);

                    //error checking
                    if (responseBody.err) {
                      console.log("is not");
                      setStateForOnceSec(setErr, responseBody.err);
                      return;
                    }

                    //setting the id and key and loggedIn state in localStorage
                    localStorage.setItem("id", responseBody.id);
                    localStorage.setItem("key", responseBody.key);
                    localStorage.setItem("loggedIn", true);

                    //change the loggedIn state
                    setLoggedIn(true);
                  }}
                >
                  Login
                </button>

                <Link class="btn btn-link" to="/forgot">
                  Forgot Your Password
                </Link>
                <p>
                  Not Registered?{" "}
                  <Link to="/register" class="btn  btn-success btn-sm">
                    {" "}
                    Register Now{" "}
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </Card.Body>
      </Card>
    </Wraper>
  );
}
