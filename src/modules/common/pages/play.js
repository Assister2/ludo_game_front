// import cogoToast from "cogo-toast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Dash from "./dash";
import "./animation.css";
// import Avatar from "react-avatar";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Cookies from "js-cookie";
import io from "socket.io-client";
import React, { useContext, useEffect, useRef, useState, useMemo } from "react";
import { BsSortUp } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import socketNew2 from "../../../socker";
import Dropdown from "react-bootstrap/Dropdown";
import {
  sortEvents,
  filterEvents,
  challengesSort,
} from "../functions/functions";

import { useDispatch } from "react-redux";
import { CDN_URL } from "../../../config";
import { useSelector } from "react-redux";
import NotificationSound from "./notification.mp3";
import Moment from "react-moment";
import moment from "moment";
// const URL = `${process.env.REACT_APP_CLIENT_BASEURL_WS}/playpage`;

export default function Play() {
  let errorDisplayed = false;
  const dispatch = useDispatch();
  const isLoggedIn = Cookies.get("isLoggedIn");
  const userId = Cookies.get("userId");
  const token = Cookies.get("token");

  const [amount, setAmount] = useState("");
  const [challenges, setChallenges] = useState([]);
  const [sorting, setSorting] = useState("");
  const [isTabVisible, setIsTabVisible] = useState(true);

  const [lastError, setLastError] = useState(false);
  const [ws, setWs] = useState();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setAmount(e.target.value);
  };
  const socket2 = useSelector((state) => state.socketReducer);
  const { data } = useSelector((state) => state.wallet);
  console.log("wallett", data);

  if (!socket2.instance) {
    dispatch({ type: "SOCKET_CONNECTED", payload: socketNew2 });
  }
  const { instance } = socket2;
  var socketNew = instance;

  const [holdChallenge, setHoldChallenge] = useState({});

  const [holdModal, setHoldModal] = useState(false);

  const [createChallengeLoading, setCreateChallengeLoading] = useState(false);

  const audioPlayer = useRef(null);
  let client = null;
  function playAudio() {
    // audioPlayer.current.play();
  }

  console.log(challenges);
  useEffect(() => {
    if (userId) {
      if (userId) {
        socketNew.connect();
      }

      const handleVisibilityChange = () => {
        setIsTabVisible(!document.hidden);
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      client = socketNew.connect();

      // if (client) {

      console.log("ws opened");
      if (!!client) {
        setWs(client);
      }

      console.log("chckss", ws, client);
      setInterval(() => {
        client.send(JSON.stringify({ type: "heartbeat" }));
      }, 1000);

      client.send(
        JSON.stringify({
          type: "",
          payload: { userId },
        })
      );

      client.on("message", (event) => {
        var events = JSON.parse(event);

        if (events.type === "heartbeat") {
          client.send(JSON.stringify({ type: "ack" }));
        }

        if (events.challengeRedirect) {
          console.log("events.challengeRedirect", events.challengeRedirect);
          navigate(`/game/${events.challengeId}`);
          return;
        }
        if (events.status == 400) {
          console.log("eventsss", events);
          toast.error(events.error);

          return;
        }
        if (events.sort) {
          sortEvents(events, userId);
        }
        if (events.filter) {
          const tempData = filterEvents(events, userId, viewGame, playAudio);

          setChallenges(tempData);
        }
      });
      console.log("errorr");
      client.on("error", (events) => {
        console.log("ccc", events);
      });
    }
    //refresh
    // client.send(
    //   JSON.stringify({
    //     type: "deleteOpenChallengesOfCreator",
    //     payload: { userId },
    //   })
    // );
    return () => {
      setLastError(true);
      if (client) {
        client.send(
          JSON.stringify({
            type: "deleteOpenChallengesOfCreator",
            payload: { userId },
          })
        );
      }
    };
  }, []);

  useEffect(() => {
    let challegesData = [...challenges];
    challengesSort(challegesData, userId, sorting);

    setChallenges(challegesData);
  }, [sorting]);

  const noOfChallenges = useMemo(() => {
    var challenge = 0;

    challenges.map((item) => {
      if (item.creator?._id == userId) {
        if (
          (item.creator?._id == userId && item.state === "open") ||
          item.state === "requested"
        ) {
          challenge++;
        }
      }
    });

    return challenge;
  }, [challenges]);

  const noOfholdChallenges = useMemo(() => {
    var challenge = 0;

    challenges.map((item) => {
      if (item.state === "hold") {
        if (item.creator._id == userId || item.player._id == userId)
          challenge++;
      }
    });
    return challenge;
  }, [challenges]);

  useEffect(() => {
    if (ws?.connected) {
      console.log("emmm");
      ws.emit(
        "getUserWallet",
        JSON.stringify({
          type: "getUserWallet",
          payload: {
            userId: userId,
          },
        })
      );
    }
  }, [noOfholdChallenges, client]);

  if (ws) {
    if (!isTabVisible) {
      if (noOfChallenges && noOfChallenges > 0) {
        ws.send(
          JSON.stringify({
            type: "deleteOpenChallengesOfCreator",
            payload: { userId },
          })
        );
      }
    }
  }

  const createChallenge = () => {
    if (amount <= 0) {
      toast.error("amount should be greater that 0 and multiples of 50");
      return;
    }
    if (amount > 10000) {
      toast.error("amount should lesser than or equals to 10000");
      return;
    }
    if (amount % 50 !== 0) {
      toast.error("amount should be multiple of 50");
      return;
    }
    setCreateChallengeLoading(true);
    ws.send(
      JSON.stringify({
        type: "create",
        payload: { amount: amount, userId },
      })
    );
    setAmount("");
    setTimeout(() => {
      setCreateChallengeLoading(false);
    }, 1000);
  };
  const deleteChallenge = (challengeId) => {
    ws.send(
      JSON.stringify({
        type: "delete",
        payload: { challengeId: challengeId, userId: userId },
      })
    );
  };

  const playChallenge = (challenge) => {
    if (data.wallet >= challenge.amount) {
      console.log("challengeee", challenge);

      ws.send(
        JSON.stringify({
          type: "play",
          payload: { challengeId: challenge._id, userId },
        })
      );
    } else {
      toast.error("not enough chips");
    }
  };

  const cancelChallenge = (challengeId) => {
    ws.send(
      JSON.stringify({
        type: "cancel",
        payload: { challengeId: challengeId, userId },
      })
    );
  };

  const startGame = (challengeId) => {
    ws.send(
      JSON.stringify({
        type: "startGame",
        payload: { challengeId, userId },
      })
    );
  };

  const viewGame = (challengeId) => {
    navigate(`/game/${challengeId}`);
  };

  const viewHold = (challenge) => {
    setHoldChallenge(challenge);
    if (challenge.creator._id == userId && challenge.results.creator == "") {
      viewGame(challenge._id);
    } else if (
      challenge.player?._id == userId &&
      challenge.results.player == ""
    ) {
      viewGame(challenge._id);
    } else {
      setHoldModal(true);
    }
  };

  const memoizedChallenges = React.useMemo(
    () =>
      challenges.map((item) => {
        // console.log("item", item)
        // console.log("userId", item.creator._id !== userId && item.player?._id !== userId && item.state == "playing")
        return (
          <CSSTransition
            key={item._id}
            timeout={100}
            classNames={{
              enter: false ? "card-animation-enter" : "",
              enterActive:
                item.creator?._id != userId
                  ? "card-animation-enter-active"
                  : "",
            }}
          >
            <li
              className={
                item.creator?._id !== userId
                  ? "p-0 overflow-hidden appear-from-left"
                  : "p-0 overflow-hidden"
              }
            >
              {item.creator?._id != userId &&
              item.player?._id != userId &&
              item.state == "playing" ? (
                <div className="my-2 card">
                  <div className="text-start card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex flex-column align-items-start vstack gap-2 minBreakpoint-xs">
                        <div
                          className="bg-dark rounded-circle me-2"
                          style={{ height: "24px", width: "24px" }}
                        >
                          <img
                            src="https://ludoplayers.com/static/media/avatar-m-5.28bb00c89f61b95d81ebd66ceb9ed80f.svg"
                            alt="avatar"
                          ></img>
                        </div>
                        <span className=" fw-semibold text-truncate text-end">
                          {item?.creator?.username.slice(0, 5)}...
                        </span>
                      </div>
                      <div className="d-flex flex-column align-items-center vstack gap-2 minBreakpoint-xs">
                        <span>
                          <em>
                            <img
                              src="	https://ludoplayers.com/static/media/vs.c153e22fa9dc9f58742d.webp"
                              alt="verses-icon"
                              width="24"
                            />
                          </em>
                        </span>
                        <span className="text-success fw-bold text-center">
                          Rs
                          {item.amount}
                        </span>
                      </div>
                      <div className="d-flex flex-column align-items-end vstack gap-2 minBreakpoint-xs">
                        <div
                          className="bg-dark rounded-circle"
                          style={{ height: "24px", width: "24px" }}
                        >
                          <img src="https://ludoplayers.com/static/media/avatar-m-2.f630f4eeffb6e2e929909f66cfd814a2.svg"></img>
                        </div>
                        <span className=" fw-semibold text-truncate text-end">
                          {item.player?.username.slice(0, 5)}...
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : item.state == "open" ||
                item.state == "requested" ||
                item.state == "playing" ? (
                <div className="my-2 card">
                  <div className="d-flex align-items-center justify-content-between card-header">
                    {item.state == "requested" && item.creator._id == userId ? (
                      <span>Challenge requested by</span>
                    ) : item.state == "playing" ? (
                      <span>In a challenge with</span>
                    ) : (
                      <span>Challenge set by</span>
                    )}

                    <span className="text-success fw-bold">
                      Rs {item.amount}
                    </span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between card-body">
                    <div className="d-flex align-items-center flex-grow-1">
                      {/* <div className="bg-dark rounded-circle me-2" style={{ height: "24px", width: "24px" }}> */}
                      {/* <img src={`${CDN_URL}/avatar/${item.creator.profileImage}`}></img> */}
                      <div style={{ height: "24px", width: "24px" }}>
                        <div
                          style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                          }}
                          className="bg-success rounded-circle position-relative"
                        >
                          <img
                            src={`${CDN_URL}/avatar/${item.creator.profileImage}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                      </div>
                      {/* </div> */}
                      {item.creator._id == userId && item.state == "open" ? (
                        <div className="d-flex align-items-center justify-content-start">
                          <div
                            role="status"
                            className="me-2 spinner-border"
                            style={{ marginLeft: "5px" }}
                          >
                            <span className="visually-hidden">
                              {item.creator._id == userId &&
                              item.state == "hold"
                                ? "waiting for player to start"
                                : "finding player..."}
                            </span>
                          </div>
                          <span className="text-capitalize">
                            finding player
                          </span>
                        </div>
                      ) : (
                        <>
                          <div style={{ marginLeft: "5px" }}>
                            <span
                              className="fw-semibold text-truncate text-start"
                              style={{ width: "100px" }}
                            >
                              {item.state == "open"
                                ? `${item?.creator?.username.slice(0, 5)}...`
                                : item.creator._id == userId
                                ? `${item?.player?.username.slice(0, 5)}...`
                                : `${item?.creator?.username.slice(0, 5)}...`}
                            </span>
                            {/* {item.state == "hold" && item.creator._id == userId ?
                                                    <div role="status" className="me-2 spinner-border">
                                                        <span className="visually-hidden"></span>
                                                    </div> :
                                                } */}
                          </div>
                        </>
                      )}
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="hstack gap-2 minBreakpoint-xs">
                        {item.creator?._id == userId &&
                          item.state == "open" && (
                            <button
                              className="btn btn-danger playChallange btn-sm"
                              onClick={() => {
                                deleteChallenge(item._id);
                              }}
                            >
                              delete
                            </button>
                          )}
                        {item.state == "open" &&
                          item.creator?._id != userId && (
                            <button
                              className="btn btn-primary playChallange btn-sm"
                              onClick={() => {
                                playChallenge(item);
                              }}
                            >
                              Play
                            </button>
                          )}
                        {item.player?._id == userId &&
                          item.state == "requested" && (
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() => {
                                cancelChallenge(item._id);
                              }}
                            >
                              Requested
                            </button>
                          )}

                        {item.creator?._id == userId &&
                        item.state == "requested" ? (
                          <div className="hstack gap-2 minBreakpoint-xs">
                            <button
                              className="checkCancelRequest btn btn-success viewChallange btn-sm"
                              onClick={() => {
                                startGame(item._id);
                              }}
                            >
                              Play
                            </button>
                            <button
                              className="btn btn-danger cancelRequest btn-sm"
                              onClick={() => {
                                cancelChallenge(item._id);
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : null}
                        {item.player?._id == userId &&
                          item.state == "playing" && (
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => {
                                viewGame(item._id);
                              }}
                            >
                              view
                            </button>
                          )}
                        {item.creator?._id == userId &&
                          item.state == "playing" && (
                            <button
                              onClick={() => {
                                viewGame(item._id);
                              }}
                              className="btn btn-success btn-sm"
                            >
                              view
                            </button>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {(item.creator?._id == userId ||
                    item.player?._id == userId) &&
                  item.state == "hold" ? (
                    <div className="my-2 card">
                      <div className="d-flex align-items-center justify-content-between card-header">
                        <span>Challenge set by</span>
                        <span className="text-success fw-bold">
                          Rs {item.amount}
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between card-body">
                        <div className="d-flex align-items-center flex-grow-1">
                          <div style={{ height: "24px", width: "24px" }}>
                            <div
                              style={{
                                width: "24px",
                                height: "24px",
                                marginLeft: "-5px",
                                backgroundSize: "contain",
                                backgroundImage: `url(${CDN_URL}/avatar/${item?.player?.profileImage}`,
                              }}
                              className="bg-success rounded-circle position-relative"
                            >
                              {/* <div style={{ width: "24px", height: "24px", bottom: "0px", right: "0px", cursor: "pointer" }} className="position-absolute shadow rounded-circle bg-white">

                                </div> */}
                            </div>
                          </div>
                          {
                            <div>
                              <span
                                className="fw-semibold text-truncate text-start"
                                style={{ width: "100px" }}
                              >
                                {item.state == "open"
                                  ? `${item?.creator?.username.slice(0, 5)}...`
                                  : item.creator._id == userId
                                  ? `${item?.player?.username.slice(0, 5)}...`
                                  : `${item?.creator?.username.slice(0, 5)}...`}
                              </span>
                              {/* {item.state == "hold" && item.creator._id == userId ?
                                                    <div role="status" className="me-2 spinner-border">
                                                        <span className="visually-hidden"></span>
                                                    </div> :
                                                } */}
                            </div>
                          }
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="hstack gap-2 minBreakpoint-xs">
                            {
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => {
                                  viewHold(item);
                                }}
                              >
                                view
                              </button>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </li>
          </CSSTransition>
        );
      }),
    [challenges]
  );

  return (
    <div className="col-12 col-sm-12 col-md-6 col-lg-4 mx-auto p-4 g-0">
      <audio ref={audioPlayer} src={NotificationSound} />

      <div className="d-flex flex-column">
        <div className="bg-gray-200 h-100 w-100 p-3 bg-light d-flex align-items-center justify-content-between hstack gap-2 minBreakpoint-xs">
          <div className="input-group flex-1 flex-nowrap">
            <input
              type="number"
              onChange={handleChange}
              value={amount}
              className="form-control"
              min={50}
              max={10000}
              placeholder="Amount"
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                width: "auto",
              }}
            ></input>
            <button
              disabled={createChallengeLoading}
              onClick={() => {
                createChallenge();
                // socketNew.disconnect();
              }}
              className="btn btn-primary w-25"
            >
              Set
            </button>
            <br></br>
          </div>

          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <BsSortUp />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setSorting("lowToHigh");
                }}
              >
                Low-High
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setSorting("highToLow");
                }}
              >
                High-slow
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <ul className="m-0 px-2">{memoizedChallenges}</ul>
      </div>
      <div
        role="dialog"
        aria-modal="true"
        className={`h-50 offcanvas offcanvas-bottom ${holdModal ? "show" : ""}`}
        tabindex="-1"
        style={{ visibility: "visible" }}
      >
        <div className="offcanvas-header">
          <div
            className="text-capitalize d-flex flex-column align-items-start justify-content-start offcanvas-title h5"
            style={{ fontSize: "1.3rem" }}
          >
            <div>
              <span style={{ fontWeight: "bold" }}>room code:&nbsp;</span>
              <span>{holdChallenge?.roomCode}</span>
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Your Result:&nbsp;</span>
              <span>
                I{" "}
                {holdChallenge?.creator?._id == userId
                  ? holdChallenge?.results?.creator
                  : holdChallenge?.results?.player}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setHoldModal(false);
            }}
            className="btn-close"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="card">
            <div className="text-start card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div
                    className="bg-dark rounded-circle me-2"
                    style={{ height: "24px", width: "24px" }}
                  >
                    <img
                      src="   https://ludoplayers.com/static/media/avatar-m-1.0be9cab97da9db857abd6d00805bac77.svg"
                      alt="avatar"
                    />
                  </div>
                  <span
                    className="fw-semibold text-truncate"
                    style={{ width: "80px" }}
                  >
                    {/* pankaj819 */}
                    {holdChallenge?.player?.username}
                  </span>
                </div>
                <div>
                  <img
                    src=" https://ludoplayers.com/static/media/vs.c153e22fa9dc9f58742d.webp"
                    height="40"
                    alt="vs"
                  />
                </div>
                <div className="d-flex flex-row-reverse align-items-center">
                  <div
                    className="bg-dark rounded-circle ms-2"
                    style={{ height: "24px", width: "24px" }}
                  >
                    <img
                      src="   https://ludoplayers.com/static/media/avatar-m-1.0be9cab97da9db857abd6d00805bac77.svg"
                      alt="avatar"
                    />
                  </div>
                  <span
                    className=" fw-semibold text-truncate"
                    style={{ width: "80px" }}
                  >
                    {holdChallenge?.creator?.username}
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center pt-3">
                <span className="text-success fw-bold">
                  ₹{holdChallenge?.amount}
                </span>
              </div>
            </div>
          </div>
          {/* <!-- <div className="mt-3 card">
                        <div className="text-start card-body">
                            <div className="d-flex justify-content-center align-items-center"><img
                                src="https://ludo-players.s3.ap-south-1.amazonaws.com/screenshots/2023-02-07-63e18a7064c26776827bf285-7976808042-player.jpeg"
                                alt="result-screenshoot" className="img-fluid" id="screenshoot-image"></div>
                        </div>
                    </div> --> */}
          <hr />
          <p style={{ fontSize: "0.8rem" }}>
            Your Game Result is Successfully Posted. Please allow us 2-5 minutes
            to review &amp; update your game. If you have Posted Wrong Result or
            Screenshot, kindly&nbsp;<a href="#/support">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}
