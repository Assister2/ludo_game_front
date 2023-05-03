import React, { useState,useEffect } from "react";
import { Card } from "react-bootstrap";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import {API_URL} from "./url";
import Wraper from "./wraper";

export default function Register({ setLoggedIn, match }) {
  //form states
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [referelCode, setReferelCode] = useState(match?.params?.code || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //functional states
  const [err, setErr] = useState("");
  const [redirect, setRedirect] = useState("");

  const [refferal,setIsRefferal]=useEffect(null);
  
  function setStateForOnceSec(setState, value) {
    setState(value);
    setTimeout(() => {
      setState("");
    }, 4 * 1000);
  }

  const [loading, setLoading] = useState(false);

  //check for redirect url
  if (redirect !== "") {
    return <Redirect to={redirect} />;
  }

  useEffect(()=>{
    const queryParams = new URLSearchParams(window.location.search);
    const referParam = queryParams.get('refer');
    console.log(referParam);
    if (referParam) {
      setIsRefferal(referParam)
    } else {
      setIsRefferal("")
    }
  },[])

  //this is the handler function for the submit even/click event
  async function register(e) {
    //prevent default
    e.preventDefault();

    if (loading) {
      return;
    }

    if (password !== confirmPassword) {
      setStateForOnceSec(setErr, "Password and Confirm Password do not match!");
      return;
    }

    setLoading(true);

    //create a header
    let theHeader = new Headers();

    //make the request
    theHeader.append("Content-Type", "application/json");
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: theHeader,
      body: JSON.stringify({
        fullName: fullName,
        username: username,
        phone: phone,
        password: password,
        referelCode: referelCode,
      }),
    });
    console.log(response);
    //parse the response body
    const responseBody = await response.json();
    setLoading(false);
    //check for error
    if (responseBody.err) {
      console.log(responseBody.err);
      setStateForOnceSec(setErr, responseBody.err);
      return;
    }


    //set the id and key and also another field stating that otp is not confirmed in localStorage
    localStorage.setItem("id", responseBody.id);
    localStorage.setItem("key", responseBody.key);
    localStorage.setItem("otpConfirmed", false);
    //localStorage.setItem("loggedIn", true);
    localStorage.setItem("phone", phone);

    //redirect to the otp page
    setRedirect("/otp");
    //setLoggedIn(true);
  }

  return (
    <Wraper colSize={6}>
      <Card style={{ marginTop: 20 }}>
        <Card.Header>Register</Card.Header>
        <Card.Body>
          <form className="  align-left">
            {err === "" || (
              <div className="alert alert-danger" role="alert">
                {err}
              </div>
            )}
            <div className="form-group row">
              <label className="col-sm-4 col-form-label text-md-right">
                Full Name
              </label>
              <div className="col-md-6">
                <input
                  id="fullName"
                  type="text"
                  className="form-control"
                  value={fullName}
                  disabled={loading}
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 col-form-label text-md-right">
                Username
              </label>
              <div className="col-md-6">
                <input
                  id="username"
                  type="text"
                  className="form-control"
                  value={username}
                  disabled={loading}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 col-form-label text-md-right">
                Whatsapp Number
              </label>
              <div className="col-md-6">
                <input
                  id="phone"
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
                Referal Code (Optional)
              </label>
              <div className="col-md-6">
                <input
                  disabled={loading || refferal!=null || refferal!=""}
                  type="number"
                  className="form-control"
                  value={refferal}
                  onChange={(e) => {
                    setReferelCode(e.target.value);
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
                  id="password"
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
            <div
              className="custom-control custom-checkbox mb-3"
              style={{ textAlign: "left" }}
            >
              <input
                type="checkbox"
                className="custom-control-input"
                id="agreeCheckBox"
                checked={true}
                required
              />
              <label
                className="custom-control-label"
                for="agreeCheckBox"
                //style={{ textAlign: "left" }}
              >
                I Agree to the <Link to="/term">Terms & Conditions</Link> and I
                am 18 years or older and not a resident of Tamil Nadu, Andhra
                Pradesh, Telangana, Assam, Rajasthan, Orissa, Kerala, Sikkim,
                Nagaland or Gujarat.
              </label>
            </div>
            <div className="form-group row mb-0">
              <div className="col-md-8 offset-md-4">
                <button
                  type="submit"
                  className="btn btn-primary "
                  onClick={register}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </Card.Body>
      </Card>
    </Wraper>
  );
}
