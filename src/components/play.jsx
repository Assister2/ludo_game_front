import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import socketIOClient from "socket.io-client";
import {API_URL,HOST} from "./url";
import firebase from "firebase";
import getHeader from "./session";
///constants
// const ENDPOINT = 'https://a61d-47-15-4-77.in.ngrok.io'
const ENDPOINT = HOST;
// const ENDPOINT = "https://api.ludoplayers.com";

export default function Play({ currentUser }) {
  //some functional states
  const [redirect, setRedirect] = useState("");
  const [playAudio, setPlayAudio] = useState(false);
  const [startButton, setStartButton] = useState("");

  //challenges states
  const [myChallenges, setMyChallenges] = useState([]);
  const [playableChallenges, setPlayableChallenges] = useState([]);
  const [runningChallenges, setRunningChallenges] = useState([]);
  const [myRunningChallenges, setMyRunningChallenges] = useState([]);

  //form states
  const [amount, setAmount] = useState("");

  //functional states
  const [socket, setSocket] = useState();

  //some ui states
  const [maxRequest, setMaxRequest] = useState("");
  const [low, setLow] = useState("");
  const [cancelled, setCancelled] = useState("");
  const [rejected, setRejected] = useState("");

  function setMaxForOneSec(id) {
    setMaxRequest(id);
    setTimeout(() => {
      setMaxRequest("");
    }, 1000);
  }

  function setLowForOneSec(id) {
    setLow(id);
    setTimeout(() => {
      setLow("");
    }, 1000);
  }
  function setCancelledForOneSec(id) {
    setCancelled(id);
    setTimeout(() => {
      setCancelled("");
    }, 1000);
  }
  function setRejectedForOneSec(id) {
    setRejected(id);
    setTimeout(() => {
      setRejected("");
    }, 1000);
  }
  async function getAndSendToken(messaging,publicVapidKey) {
    const token = await messaging.getToken({ vapidKey: publicVapidKey });
    console.log(token);
    if (!localStorage.getItem("isSent")) {
      const body = {
        token: token,
      };

      await fetch(`${API_URL}/user/subscribe`, {
        method: "POST",
        headers: getHeader(),
        body: JSON.stringify(body),
      });
      localStorage.setItem("isSent", true);
    }
  }
  //socket shits
  useEffect(() => {
    if (!currentUser._id) {
      return;
    }
    try {
      //we cant just declare a variable outside the useEffect and set the value of that to the socket
      //so I just made a socket state and setting the socket to that
      let localScopeSocket = socketIOClient(ENDPOINT);
      setSocket(localScopeSocket);
      localScopeSocket.emit("init", { id: localStorage.getItem("id") });

      //all the listeners
      localScopeSocket.on("error", ({ message }) => {
        alert(message);
      });
      localScopeSocket.on("update", (data) => {
        if (data.category == "your-challenges") {
          //only include challenges where creator is this user
          setMyChallenges(
            data.challenges.map((challenge) => {
              if (challenge.creator == currentUser._id) {
                return challenge;
              }
            })
          );
        }
        if (data.category == "playable-challenges") {
          //exclude challenges where this user is creator and (if state is requested & they are not player)
          setPlayableChallenges(
            data.challenges.map((challenge) => {
              if (
                challenge.state == "requested" &&
                challenge.player !== currentUser._id
              ) {
                return;
              }
              if (challenge.creator !== currentUser._id) {
                return challenge;
              }
            })
          );
        }
        if (data.category == "running-challenges") {
          //exclude challenges where this user is either player or creator
          setMyRunningChallenges(
            data.challenges.map((challenge) => {
              if (
                challenge.creator == currentUser._id ||
                challenge.player == currentUser._id
              ) {
                if (
                  !localStorage.getItem(challenge._id) &&
                  challenge.player == currentUser._id
                ) {
                  challenge.startButton = true;
                  localStorage.setItem(challenge._id, "shit");
                }

                return challenge;
              }
            })
          );
          setRunningChallenges(
            data.challenges.map((challenge) => {
              if (
                challenge.creator !== currentUser._id &&
                challenge.player !== currentUser._id
              ) {
                return challenge;
              }
            })
          );
        }
      });

      localScopeSocket.on("max-request", (id) => setMaxForOneSec(id));
      localScopeSocket.on("rejected", (id) => setRejectedForOneSec(id));
      localScopeSocket.on("cancelled", (id) => setCancelledForOneSec(id));
      localScopeSocket.on("low-balance", (id) => setLowForOneSec(id));
      localScopeSocket.on("start-button", (id) => setStartButton(id));

      localScopeSocket.on("play-audio", () => {
        setPlayAudio(true);
        setTimeout(() => {
          setPlayAudio(false);
        }, 2500);
      });

      localScopeSocket.on("refresh", ({ user, category }) => {
        if (user == currentUser._id || user == "everyone") {
          localScopeSocket.emit("refresh", category);
        }
      });

      localScopeSocket.on("redirect", ({ user, to }) => {
        if (user == "everyone" || user == currentUser._id) {
          setRedirect(to);
        }
      });

      localScopeSocket.io.on("reconnect", () => {
        localScopeSocket.emit("init", {
          id: localStorage.getItem("id"),
          key: localStorage.getItem("key"),
        });
      });
      // Retrieve Firebase Messaging object.
      const publicVapidKey =
      "BJ8sWnq_Zr232YSRo_qo02gKEzmt3nI0hOkVJHHxT2C59exgfTeaqpOTRHzSnoeFQSbIWvJKBKcjSRdajzx8Qs4";

      let messaging;
      if (Notification.requestPermission().then(
        (permission)=> {
          if (permission === "granted") {
            messaging = firebase.messaging();
            getAndSendToken(messaging,publicVapidKey);
          }
        }      
        )){
       
      }



          // Add the public key generated from the console here.
      //header

      
      if (messaging) {
        getAndSendToken().then();
      }
      return () => {
        localScopeSocket.emit("page_change");
      };
    } catch (err) {
      console.log(err);
    }
  }, []);

  //redirecting to otp confirmation page if otp is not confirmed
  if (localStorage.getItem("otpConfirmed") === "false") {
    return <Redirect to="/otp" />;
  }

  //redirections
  if (redirect !== "") {
    return <Redirect to={redirect} />;
  }

  function challangeText(challange) {
    if (!challange) {
      return;
    }
    let creatorName = "You";
    if (challange.creatorUsername !== currentUser.username) {
      creatorName = challange.creatorUsername;
    }
    if (challange.player) {
      return `${challange.creatorUsername} vs ${challange.playerUsername}`;
    }
    return `${creatorName} have set a challenge`;
  }

  function Money({ value }) {
    return (
      <span style={{ background: "antiquewhite", padding: 2 }}>
        {" "}
        ₹<b>{value}</b>
      </span>
    );
  }

  function DeleteButton({ challenge }) {
    return (
      <button
        className="btn btn-danger dltChallange btn-sm"
        onClick={() => {
          socket.emit("delete", challenge._id);
        }}
      >
        Delete
      </button>
    );
  }

  function UnresponsiveCancelledButton() {
    return (
      <button className="btn btn-warning cancelRequesting btn-sm disabled">
        Cancelled
      </button>
    );
  }
  function UnresponsiveRejectedButton() {
    return (
      <button className="btn btn-warning cancelRequesting btn-sm disabled">
        Rejected
      </button>
    );
  }
  function UnresponsiveMaxRequestButton() {
    return (
      <button className="btn btn-secondary btn-sm cancelRequesting">
        Max Request
      </button>
    );
  }

  function UnresponsiveLowBallanceButton() {
    return (
      <button className="btn btn-secondary btn-sm cancelRequesting">
        Low Balance
      </button>
    );
  }

  function cancelRequest(challenge) {
    return () => {
      socket.emit("cancel", challenge._id);
    };
  }

  function PlayAndCancelButton({ challenge }) {
    return (
      <>
        <button
          className="checkCancelRequest btn btn-success viewChallange btn-sm"
          onClick={() => {
            socket.emit("play", challenge._id);
          }}
        >
          Play
        </button>
        <button
          className="btn btn-danger cancelRequest btn-sm"
          onClick={cancelRequest(challenge)}
        >
          Cancel
        </button>
      </>
    );
  }

  function CreatorButtons({ challenge }) {
    if (challenge.player) {
      return <PlayAndCancelButton challenge={challenge} />;
    }

    return <DeleteButton challenge={challenge} />;
  }

  function ViewOrStartButton({ challenge }) {
    function view() {
      socket.emit("view", challenge._id);
    }
    if (startButton === challenge._id) {
      return (
        <button className="btn btn-success playChallange btn-sm" onClick={view}>
          Start
        </button>
      );
    }
    return (
      <button className="btn btn-success playChallange btn-sm" onClick={view}>
        View
      </button>
    );
  }

  function PlayerPlayOrCancelButton({ challenge }) {
    if (challenge.player) {
      return (
        <button
          className="btn btn-secondary btn-sm cancelRequesting"
          onClick={cancelRequest(challenge)}
        >
          Requested
        </button>
      );
    }
    return (
      <button
        className="btn btn-primary playChallange btn-sm"
        onClick={() => {
          //emmit the power
          socket.emit("request", challenge._id);
        }}
      >
        Play
      </button>
    );
  }

  return (
    <>
      {playAudio && (
        <audio autoPlay>
          <source
            src="https://ludokhelo.com/audio/play.mp3"
            type="audio/mpeg"
          />
        </audio>
      )}

      <div class="container">
        <div class="row justify-content-center text-center">
          <div class="col-md-6">
            <br />

            <div class="m-auto">
              <input
                type="number"
                class="form-control"
                id="inputSetChallenge"
                required
                name="amount"
                placeholder="Amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
              <button
                type="button"
                class="btn btn-primary"
                id="setBt"
                onClick={() => {
                  //validation
                  if (
                    Number(amount) % 50 != 0 ||
                    Number(amount) < 49 ||
                    Number(amount) > 10001
                  ) {
                    alert(
                      "Challenge Amount should be greater than ₹50 and should be less than ₹10000. And should be in denomination of ₹50."
                    );
                    return;
                  }

                  //emit a create event
                  socket.emit("create", { amount: amount });

                  setAmount("");
                }}
              >
                Set
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <ul id="my-running-challenge-list" className="list-group">
        {myRunningChallenges.map((challenge) =>
          challenge ? (
            <li className="list-group-item">
              <div className="challengeText">
                {challangeText(challenge)} for{" "}
                <Money value={challenge.amount} />
              </div>
              <div className="challengeButton">
                <ViewOrStartButton challenge={challenge} />
              </div>
            </li>
          ) : null
        )}
      </ul>
      <ul id="my-challenge-list" className="list-group">
        {myChallenges.map((challenge) =>
          challenge ? (
            <li className="list-group-item">
              <div className="challengeText">
                {challangeText(challenge)} for{" "}
                <Money value={challenge.amount} />
              </div>
              <div className="challengeButton">
                {cancelled === challenge._id ? (
                  <UnresponsiveCancelledButton />
                ) : (
                  <CreatorButtons challenge={challenge} />
                )}
              </div>
            </li>
          ) : null
        )}
      </ul>
      <ul id="playable-challange-list" className="list-group">
        {playableChallenges.map((challenge) =>
          challenge ? (
            <li className="list-group-item">
              <div className="challengeText">
                {challangeText(challenge)} for{" "}
                <Money value={challenge.amount} />
              </div>
              <div className="challengeButton">
                {cancelled === challenge._id ? (
                  <UnresponsiveCancelledButton />
                ) : rejected === challenge._id ? (
                  <UnresponsiveRejectedButton />
                ) : maxRequest === challenge._id ? (
                  <UnresponsiveMaxRequestButton />
                ) : low === challenge._id ? (
                  <UnresponsiveLowBallanceButton />
                ) : (
                  <PlayerPlayOrCancelButton challenge={challenge} />
                )}
              </div>
            </li>
          ) : null
        )}
      </ul>
      <ul id="running-challenge-list" className="list-group">
        {runningChallenges.map((challenge) =>
          challenge ? (
            <li className="list-group-item">
              <div className="challengeText">
                {challangeText(challenge)} for{" "}
                <Money value={challenge.amount} />
              </div>
            </li>
          ) : null
        )}
      </ul>
    </>
  );
}
