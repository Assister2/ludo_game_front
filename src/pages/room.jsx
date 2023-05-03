//Importing Shits
import copy from "copy-to-clipboard";
import React, { useEffect, useState } from "react";
import { Card, Navbar } from "react-bootstrap";
import { Redirect } from "react-router";
import socketIOClient from "socket.io-client";
import getHeader from "../components/session";
import {API_URL,HOST} from "../components/url.js";

//CONSTANTS
// const ENDPOINT = "http://localhost:80";
const ENDPOINT =HOST;
// const ENDPOINT = "https://api.ludoplayers.com";

//exporting the main function
export default function Room({ match, setHeaderEnabled, headerEnabled, user }) {
  //some important shits
  setHeaderEnabled(false);

  //some functional states
  const [redirect, setRedirect] = useState("");

  //room states
  const [challengeText, setChallengeText] = useState("...");
  const [creator, setCreator] = useState("");
  const [code, setCode] = useState("");
  const [codeChangable, setCodeChangable] = useState(false);

  //socket
  const [socket, setSocket] = useState();

  //form states
  const [myResult, setMyResult] = useState("");
  const [screenshoot, setScreenshoot] = useState("");
  const [cancellationReason, setCancellation] = useState("");

  //some ui states
  const [imageTitle, setImageTitle] = useState("Upload");

  //socket shits
  useEffect(() => {
    if (headerEnabled || !user._id) {
      return;
    }
    //we cant just declare a variable outside the useEffect and set the value of that to the socket
    //so I just made a socket state and setting the socket to that
    let localScopeSocket = socketIOClient(ENDPOINT);
    setSocket(localScopeSocket);

    //send initialization events
    localScopeSocket.emit("init", {
      id: localStorage.getItem("id"),
      key: localStorage.getItem("key"),
    });
    localScopeSocket.emit("joinRoom", match.params.id);

    localScopeSocket.on("try-again", () => {
      setTimeout(() => {
        localScopeSocket.emit("joinRoom", match.params.id);
      }, 100);
    });

    //creator event
    localScopeSocket.on("creator", (id) => {
      setCreator(id);
    });

    //challengeText event
    localScopeSocket.on("challenge_text", (text) => {
      setChallengeText(text);
    });

    //listen for  redirect_error event
    localScopeSocket.on("redirect_error", ({ to, message }) => {
      alert(message);
      setRedirect(to);
      setHeaderEnabled(true);
    });
    localScopeSocket.on("redirect", ({ to }) => {
      setRedirect(to);
      setHeaderEnabled(true);
    });

    //listen for code event
    localScopeSocket.on("code", (code) => {
      setCode(code);
    });

    //listen for code changable event
    localScopeSocket.on("code_changable", (by) => {
      if (by == user._id) {
        setCodeChangable(true);
      }
    });

    //listen for redirect event
    localScopeSocket.on("redirect", ({ id, to }) => {
      if (id !== user._id) {
        return;
      }
      setRedirect(to);
      setHeaderEnabled(true);
    });

    //handle reconnect
    localScopeSocket.io.on("reconnect", () => {
      //send initialization events
      localScopeSocket.emit("init", {
        id: localStorage.getItem("id"),
        key: localStorage.getItem("key"),
      });
      localScopeSocket.emit("joinRoom", match.params.id);
    });

    return () => {
      localScopeSocket.emit("page_change");
    };
  }, []);

  //redirection
  if (redirect !== "") {
    return <Redirect to={redirect} />;
  }

  //return the components
  return (
    <>
      <Navbar className="justify-content-center">
        <Navbar.Brand>Welcome</Navbar.Brand>
      </Navbar>
      <div className="row no-gutters justify-content-center">
        <div className="col-sm-9 col-md-8 col-lg-6">
          <Card>
            <Card.Body>
              <div>
                <small className="text-danger">
                  {" "}
                  Notice: कृपया ध्यान दे, गेम स्टार्ट होने के बाद 4-5 चान्सेस तक
                  हर चांस में स्क्रीनशॉट ले | जरुरत पड़ने पर आपके काम आ सकता है |
                </small>
                <br />
                <br />
                <div className="challengeBetween">{challengeText}</div>
              </div>
              <hr />
              {creator === "" ? (
                <></>
              ) : code == "" && creator !== user._id ? (
                <>
                  <h5 className="blinking  text-center">
                    Waiting for Room Code...
                  </h5>{" "}
                  <br />
                </>
              ) : (
                <>
                  <div>
                    <span
                      className="card-text text-success"
                      style={{ fontSize: "x-large" }}
                    >
                      Room Code -> {code}
                    </span>
                    <button
                      className="btn btn-link waves-effect waves-light"
                      onClick={() => {
                        copy(code);
                      }}
                    >
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAlCAYAAAAjt+tHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAhwAAAIcBnRI8SAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJBSURBVFiF7dfPi05RGAfwz/xoJiwm0VgYKY0oJRkrGxHKRopSNrMiFjNLWfsPWChSFqiJBUlSymyMFclCGr9SoyYTE00jg2Ysznnrejt35t73vu+sfOvpvvc5z4/vPc85zzkvxdGGM3iJOUziKtaXiNEw2nANCwmZRH+rCRzLJHyIQZzHbNSNtprAvZhoDO0Z/YkMsY2NBO6Mz+3YlXmvx874vIP5jP4u/kS/IbzJ8Z/EI/xMDQ7FoKn6ZmUeAwn/JwV8F/ACK1IEPuc4/MJ0lLc4nfN1/fHrvkTbmUVIHE8FSBmeRXdOwiIYwIdE3OEiBJq1oo8WIZBadLUprYpVRYxSBPqiLAuyBG4LdWsFTmF13mCtPodalJzQHwqvgR6sKRG80qylCAziQokYbVUItC9t0lqkZmBEOHQaQTcO4H4VAlNRyqILt/CxKoEB7E/oF9umXXH8MC4mxq9gLZ6lnOu34bD0+ZC3TTuEstXsyizg3BI8T+i/5/iPCH2/hl7pYzsXjTaiDtyUnq0y0hCBDtxoQvKFVB8YxPuE7MnY9GBHCcK5yGvFmxL6lZnf09iHx9jWbAJjOJfQj9e9TwnbdRRbM/qnwi26MKqehuvwKhOn8jbcgC1L+H0VbrmES+1BYSY259jvFko4jon6waKNKCsPEkn68E56BnLvA808DT9hr5L3g1QJLuP6En6/c/QTmrAG5qIsCzrxQ1ggQzjSojy98TmbGmxGPy8iMxLX/U6cxGvhH3Kr8A2XhIX6H//gL2Qi98ZRMe6DAAAAAElFTkSuQmCC" />
                    </button>
                  </div>
                 
                  <br />
                  <br />
                </>
              )}
              <div className="challengeBetween">
                <small className="text-danger">
                  नोट: रूम बनाते समय Classic मोड सलेक्ट करें ॥
                </small>
                <br />
                <small className="text-danger">
                  Note: Please Create Classic Game Room Code only
                </small>
              </div>
              <br />
              <div className="challengeBetween">
                <h6 className="card-text text-info">
                  ₹50 Penality = Wrong Update.
                </h6>
                <h6 className="card-text text-info">
                  ₹25 Penality = If you don't update After losing.
                </h6>
                <h6 className="card-text text-info">
                  ₹25 Penality = If You try to Play "Popular Mode".
                </h6>
              </div>
              <hr />
              <h4>POST RESULT</h4>
              <hr />
              <div className="form-group challenge-result-block">
                <div
                  className="form-check challengeOptions text-success"
                  style={myResult === "won" ? { background: "palegreen" } : {}}
                >
                  <input
                    type="radio"
                    id="challengeWon"
                    name="challengeResult"
                    value="won"
                    required
                    className="form-check-input"
                    onChange={(e) => setMyResult(e.target.value)}
                  />
                  <label className="form-check-label" for="challengeWon">
                    I Won
                  </label>
                </div>
                <div
                  className="form-check challengeOptions text-danger"
                  style={
                    myResult === "lost"
                      ? { background: "rgb(255, 185, 185)" }
                      : {}
                  }
                >
                  <input
                    type="radio"
                    id="challengeLost"
                    name="challengeResult"
                    value="lost"
                    required
                    className="form-check-input"
                    onChange={(e) =>
                      alert("Are You Sure U Lost") & setMyResult(e.target.value)
                    }
                  />
                  <label className="form-check-label" for="challengeLost">
                    I Lost
                  </label>
                </div>
                <div
                  className="form-check challengeOptions text-danger"
                  style={
                    myResult === "cancel"
                      ? { background: "rgb(255, 255, 211)" }
                      : {}
                  }
                >
                  <input
                    type="radio"
                    id="challengeCancel"
                    name="challengeResult"
                    value="cancel"
                    required
                    className="form-check-input"
                    onChange={(e) => setMyResult(e.target.value)}
                  />
                  <label className="form-check-label" for="challengeCancel">
                    Cancel Game
                  </label>
                </div>
              </div>
              {myResult == "cancel" && (
                <div>
                  <br />
                  <div className="form-group">
                    <label>Cancel Reason</label>
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="2"
                      maxLength="50"
                      className="form-control"
                      onChange={(e) => setCancellation(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              )}
              {myResult == "won" && (
                <div>
                  <br />
                  <label> Winning Screen Shot</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="screenShot"
                      accept=".png, .jpg, .jpeg"
                      required="required"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) {
                          return;
                        }
                        var reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function (e) {
                          setScreenshoot(e.target.result);
                        };
                        setImageTitle(file.name);

                        // setScreenshoot(file);
                      }}
                    ></input>
                    <label htmlFor="" className="custom-file-label">
                      {imageTitle}
                    </label>
                  </div>
                  <br />
                  <br />
                  <div>
                    <img
                      src={screenshoot}
                      alt=""
                      className="img-fluid"
                      id="screenshoot-image"
                    />
                  </div>
                </div>
              )}

              <br />
              <span className="waves-input-wrapper waves-effect waves-light">
                <input
                  type="submit"
                  value="Post Result"
                  className="btn btn-primary"
                  onClick={async () => {
                    //validate some stuffs
                    if (myResult == "") {
                      alert("Choose a Option");
                      return;
                    }
                    if ((myResult == "won") & (screenshoot == "")) {
                      alert("Screenshot is required");
                      return;
                    }
                    if (code == "" && myResult !== "cancel") {
                      alert("Room Code not found!");
                      return;
                    }

                    //maybe upload the screenshoot or something

                    if (myResult == "won") {
                      const response = await fetch(
                        `${API_URL}/user/challenge/${match.params.id}`,
                        {
                          method: "PATCH",
                          headers: getHeader(),
                          body: JSON.stringify({ screenshoot: screenshoot }),
                        }
                      );
                      await response.json();
                    }

                    //emmit update_result event
                    socket.emit("update_result", {
                      id: match.params.id,
                      result: myResult,
                      cancellationReason: cancellationReason,
                    });
                  }}
                />
              </span>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}
