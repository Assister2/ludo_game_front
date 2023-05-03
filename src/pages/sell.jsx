import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import CardWraper from "../components/cardwraper";
import getHeader from "../components/session";
import {API_URL} from "../components/url";

export default function Sell() {
  //form states
  const [paymentMethod, setPaymentMethod] = useState("Paytm Wallet");
  const [phone, setPhone] = useState("");
  const [amount, setAmoount] = useState("");
  const [aggreed, setAggreed] = useState(true);

  //ui states
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function setStateForOnceSec(setState, value) {
    setState(value);
    setTimeout(() => {
      setState("");
    }, 4 * 1000);
  }

  //functional states
  const [clicked, setClicked] = useState(false);
  const [updatePending, setUpdatePending] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);

  //got from api states
  const [pendings, setPendings] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("sell_audio")) {
      setTimeout(() => {
        setPlayAudio(true);
      }, 1000);
      localStorage.setItem("sell_audio", true);
    }
  }, []);

  useEffect(() => {
    console.log(pendings);
    getPendings();
  }, [updatePending]);

  async function getPendings() {
    const response = await fetch(`${API_URL}/user/pending`, {
      headers: getHeader(),
    });
    setPendings(await response.json());
  }

  async function sell() {
    //if (clicked) {
    //return;
    //}
    setClicked(true);
    if (success !== "") {
      return;
    }

    const response = await fetch(`${API_URL}/user/sell`, {
      method: "POST",
      headers: getHeader(),
      body: JSON.stringify({
        paymentMethod: paymentMethod,
        phone: phone,
        amount: amount,
      }),
    });

    const responseBody = await response.json();
    setClicked(false);

    console.log(responseBody);
    if (responseBody.err) {
      setStateForOnceSec(setErr, responseBody.err);
      return;
    }

    setErr("");
    setStateForOnceSec(setSuccess, `Successfully Sold ${amount} Chips `);
    setUpdatePending(!updatePending);
  }

  return (
    <>
      {playAudio && (
        <audio autoPlay>
          <source src="/sell.mp3" type="audio/mpeg" />
        </audio>
      )}{" "}
      <CardWraper
        size={5}
        title={
          <>
            Sell Chips{" "}
            <span className="text-info" style={{ fontSize: 18 }}>
              (1Rupee = 1Chip){" "}
            </span>
          </>
        }
      >
        {err === "" || (
          <div className="alert alert-danger" role="alert">
            {err}
          </div>
        )}
        <div>
          <p className="text-primary" style={{ textAlign: "center" }}>
            (Processing Timing: 12:00 PM)
          </p>
        </div>

        <div className="form-group">
          <div
            style={{
              marginBottom: 20,
              padding: 5,
              border: "2px dotted",
              borderRadius: 10,
            }}
          >
            <p
              class="blinking-info"
              style={{ fontSize: 22, textAlign: "center" }}
            >
              Only{" "}
              <span class="blinking-black">
                <b>2 Request</b>
              </span>{" "}
              allowed per day.
            </p>
            <p
              class=" blinking-info"
              style={{ fontSize: 19, textAlign: "center" }}
            >
              एक दिन में सिर्फ{" "}
              <span class="blinking-black">
                <b>2 रिकवेस्ट</b>
              </span>{" "}
              ही ली जाएगी |
            </p>
          </div>
          <div className="input-group mb-3">
            <select
              name=""
              id=""
              className="form-control"
              onChange={(e) => {
                setPaymentMethod(
                  e.target.children[e.target.selectedIndex].innerHTML
                );
              }}
            >
              <option value="">Paytm Wallet</option>
              <option value="">Phonepe</option>
            </select>
          </div>
          <div className="input-group mb-3">
            <input
              type="number"
              placeholder="Your Number"
              className="form-control"
              value={phone}
              disabled={loading}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="number"
              placeholder="Chips"
              className="form-control"
              value={amount}
              disabled={loading}
              onChange={(e) => {
                setAmoount(e.target.value);
              }}
            />
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
            <label className="custom-control-label" for="agreeCheckBox">
              I Agree that I am 18 years or older and not a resident of Tamil
              Nadu, Andhra Pradesh, Telangana, Assam, Orissa, Kerala, Sikkim,
              Nagaland or Gujarat.
            </label>
          </div>
          <span className="waves-input-wrapper waves-effect waves-light">
            <input
              type="submit"
              value="Sell"
              className="btn btn-primary"
              onClick={sell}
            />
          </span>
        </div>

        {success === "" || (
          <div className="alert alert-success" role="alert">
            {success}
          </div>
        )}
      </CardWraper>
      <br />
      <Container style={{ marginBottom: 15 }}>
        <ul className="list-group">
          {pendings.map((pending) => {
            let date = new Date(pending.createdAt);

            return (
              <li
                className="list-group-item history-list text-center"
                style={{ background: "#ccc" }}
              >
                <small className="text-muted">
                  {date.getFullYear() +
                    "-" +
                    (date.getMonth() + 1) +
                    "-" +
                    date.getDate() +
                    "  " +
                    date.getHours() +
                    ":" +
                    date.getMinutes() +
                    ":" +
                    date.getSeconds()}
                </small>
                <br />
                <div className="row">
                  <div className="col-8">
                    Amount - <b>{pending.amount} Chips</b> <br />
                    Number - <b>{pending.phone} </b>
                  </div>
                  <div className="col-4">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={async () => {
                        if (!window.confirm("Are You Sure?")) {
                          return;
                        }
                        setLoading(true);
                        const response = await fetch(
                          `${API_URL}/user/cancel/${pending._id}`,
                          {
                            method: "PATCH",
                            headers: getHeader(),
                          }
                        );

                        const responseBody = await response.json();

                        setLoading(false);
                        if (responseBody.err) {
                          setStateForOnceSec(setErr, responseBody.err);
                          return;
                        }
                        setUpdatePending(!updatePending);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <br />
      </Container>
    </>
  );
}
