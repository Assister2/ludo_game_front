import copy from "copy-to-clipboard";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import CardWraper from "../components/cardwraper";
import getHeader from "../components/session";
import {API_URL} from "../components/url";
import Wraper from "../components/wraper";

export default function Buy() {
  //states from api
  const [number, setNumber] = useState("");
  const [selected, setSelected] = useState(0);
  const [whatsapNumber, setWhatsappNumber] = useState("");

  //form states
  const [txnId, setTxnId] = useState("");
  const [amount, setAmoount] = useState("");

  //some functional states
  const [playAudio, setPlayAudio] = useState(false);

  //ui states
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function setStateForOnceSec(setState, value) {
    setState(value);
    setTimeout(() => {
      setState("");
    }, 1000);
  }

  //functional states
  const [clicked, setClicked] = useState(false);

  useEffect(async () => {
    let response = await fetch(`${API_URL}/site/paymentoptions`);
    let responseBody = await response.json();
    setNumber(responseBody.phone);

    response = await fetch(`${API_URL}/site/phone`);
    responseBody = await response.json();
    setWhatsappNumber(responseBody.phone);

    if (!localStorage.getItem("buy_audio")) {
      setTimeout(() => {
        setPlayAudio(true);
      }, 3.5 * 1000);
      localStorage.setItem("buy_audio", true);
    }
  }, []);

  async function buy() {
    if (clicked) {
      return;
    }
    setClicked(true);
    if (success !== "") {
      return;
    }
    setLoading(true);

    const response = await fetch(`${API_URL}/user/buy`, {
      method: "POST",
      headers: getHeader(),
      body: JSON.stringify({
        txnId: txnId,
        amount: amount,
      }),
    });

    const responseBody = await response.json();
    setLoading(false);
    setClicked(false);
    if (responseBody.err) {
      setStateForOnceSec(setErr, responseBody.err);
      return;
    }

    setErr("");
    setStateForOnceSec(setSuccess, `Successfully Added ${amount} Chips`);
  }

  return (
    <>
      {playAudio && (
        <audio autoPlay>
          <source src="/buy.mp3" type="audio/mpeg" />
        </audio>
      )}
      <CardWraper
        size={5}
        title={
          <>
            Buy Chips{" "}
            <span className="text-info" style={{ fontSize: 18 }}>
              (1Rupee = 1Chip){" "}
            </span>
          </>
        }
      >
        <div>
          <p style={{ color: "indigo", fontSize: 19 }}>
            Pay via Paytm or UPI Only
          </p>
          <p>
            {" "}
            Please pay at this number only{" "}
            <span style={{ fontSize: "120%", color: "red" }}>{number}</span> and
            Enter Transaction ID Below.
          </p>
        </div>
        <div className="form-group">
          <div className="input-group mb-3">
            <select
              name=""
              id=""
              className="form-control"
              onChange={(e) => setSelected(e.target.selectedIndex)}
            >
              <option value="">Paytm Wallet</option>
              <option value="">Phonepe UPI</option>
            </select>
          </div>
          <div className="input-group mb-3">
            <input
              id="paymentNumber"
              className="form-control"
              name="paymentNumber"
              placeholder="Recipient Paytm Number..."
              readonly=""
              value={selected == "0" ? number : `${number}@paytm`}
            />
            <button
              className="btn btn-outline-secondary waves-effect waves-light"
              onClick={() => copy(selected == "0" ? number : `${number}@paytm`)}
            >
              Copy
            </button>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              placeholder={selected == "0" ? "Transaction Id" : "UTR or Txn ID"}
              className="form-control"
              value={txnId}
              disabled={loading}
              onChange={(e) => {
                setTxnId(e.target.value);
              }}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="number"
              placeholder="Amount"
              className="form-control"
              value={amount}
              disabled={loading}
              onChange={(e) => {
                setAmoount(e.target.value);
              }}
            />
          </div>
          <span className="waves-input-wrapper waves-effect waves-light">
            <input
              type="submit"
              value="Load"
              className="btn btn-success"
              onClick={buy}
            />
          </span>
        </div>

        {success === "" || (
          <div className="alert alert-success" role="alert">
            {success}
          </div>
        )}
        {err === "" || (
          <div className="alert alert-danger" role="alert">
            {err}
          </div>
        )}
      </CardWraper>
      <CardWraper size={5} title={<>For Any Query Contact Below</>}>
        <p>
          If You are not able to Buy Chips -{" "}
          <a
            href={`https://api.whatsapp.com/send/?phone=${whatsapNumber}&text=I+am+Unable+to+Buy+Chips.+Please+Help+Me+&app_absent=0`}
          >
            Click Here
          </a>
        </p>

        <p>
          If Your Transaction ID is not Matching -{" "}
          <a
            href={`https://api.whatsapp.com/send/?phone=${whatsapNumber}&text=My+Transaction+ID+is+Not+Matching.+Please+Help+Me+&app_absent=0`}
          >
            Click Here
          </a>
        </p>

        <p>
          Please Contact Support at Whatsapp ({whatsapNumber}) Your Problem will
          be solved in Within 12 Hours.
        </p>
        <a
          href={`https://api.whatsapp.com/send/?phone=${whatsapNumber}&text=I+have+an+issue.+Please+Help+Me+&app_absent=0`}
        >
          <p>Click here To Contact Admin on Whatsapp</p>
        </a>
      </CardWraper>
      <Wraper colSize={5}>
        <Card style={{ marginTop: 20 }}>
          <Card.Body>
        
            <div className="embed-responsive embed-responsive-16by9">
            <iframe width="auto" height="auto" src="https://www.youtube.com/embed/D10L33EaD9M?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

            </div>

          </Card.Body>
        </Card>
      </Wraper>
    </>
  );
}
