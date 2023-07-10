// import cogoToast from "cogo-toast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChallengeList from "./ChallengeList";
// import Dash from "./dash";
import "./animation.css";
import ViewChallenge from "./ViewChallenge";
// import Avatar from "react-avatar";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useRef, useState, useMemo } from "react";
import { BsSortUp } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import socketNew2 from "../../../socker";
import Dropdown from "react-bootstrap/Dropdown";
import { logoutSuccess } from "../../.././redux/actions/auth";
import {
  sortEvents,
  filterEvents,
  challengesSort,
} from "../functions/functions";
import { CircularProgress } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import NotificationSound from "./notification.mp3";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import audio1 from "./notification.mp3";
export default function Play() {
  const dispatch = useDispatch();
  const userId = Cookies.get("userId");

  const [amount, setAmount] = useState("");
  const [challenges, setChallenges] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(null);
  const [isButtonType, setIsButtonType] = useState(false);
  const [audio, setAudio] = useState(true);
  const [sorting, setSorting] = useState("");
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const playAudio2 = () => {
    new Audio(audio1).play();
  };
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const [ws, setWs] = useState();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setAmount(e.target.value);
  };
  const socket2 = useSelector((state) => state.socketReducer);
  const { data } = useSelector((state) => state.wallet1);

  if (!socket2.instance) {
    dispatch({ type: "SOCKET_CONNECTED", payload: socketNew2 });
  }
  const { instance } = socket2;
  var socketNew = instance;

  const [holdChallenge, setHoldChallenge] = useState({});

  const [holdModal, setHoldModal] = useState(false);

  const [createChallengeLoading, setCreateChallengeLoading] = useState(false);
  const [startGameLoading, setStartGameLoading] = useState(false);
  const [playGameLoading, setPlayGameLoading] = useState(false);
  const [cancelChallengeCreator, setCancelChallengeCreator] = useState(false);
  const [RequestedLoading, setRequestedLoading] = useState(false);

  const audioPlayer = useRef(null);
  let client = null;
  function playAudio() {
    audioPlayer.current.play();
  }

  useEffect(() => {
    let heartbeatInterval;
    let deleteOpenChallengesOfCreator = true;
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

      if (!!client) {
        setWs(client);
      }

      heartbeatInterval = setInterval(() => {
        client.send(JSON.stringify({ type: "heartbeat" }));
      }, 2000);

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
        if (events.status === 2) {
          setCreateChallengeLoading(false);
        }
        if (events.status === 22) {
          setStartGameLoading(false);
        }
        if (events.status === 21) {
          setRequestedLoading(false);
        }

        if (events.challengeRedirect) {
          navigate(`/game/${events.challengeId}`);
          return;
        }
        if (events.status == 400) {
          setCreateChallengeLoading(false);
          setStartGameLoading(false);
          setRequestedLoading(false);
          toast.error(events.error);

          return;
        }
        if (events.sort) {
          sortEvents(events, userId);
        }
        if (events.filter) {
          const tempData = filterEvents(events, userId, viewGame, playAudio2);
          setChallenges(tempData);
        }
      });

      client.on("error", (events) => {
        console.log("ccc", events);
      });
    }
    if (!userId) {
      dispatch(logoutSuccess());
      navigate("/login");
    }
    if (client) {
      client.send(
        JSON.stringify({
          type: "deleteOpenChallengesOfCreator",
          payload: { userId },
        })
      );
    }

    return () => {
      clearInterval(heartbeatInterval);
      if (client) {
        client.send(
          JSON.stringify({
            type: "deleteOpenChallengesOfCreator",
            payload: { userId },
          })
        );

        // client.close();
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
      if (item.creator?._id === userId || item.player?._id === userId) {
        if (item.state === "playing") {
          if (
            item.creator?._id === userId &&
            item.results.player.result !== "" &&
            item.results.creator.result === ""
          ) {
            dispatch({ type: "display_timer", payload: true });
          } else if (
            item.player?._id === userId &&
            item.results.player.result === "" &&
            item.results.creator.result !== ""
          ) {
            dispatch({ type: "display_timer", payload: true });
          } else {
            dispatch({ type: "display_timer", payload: false });
          }
        }

        if (
          (item.creator?._id === userId && item.state === "open") ||
          (item.creator?._id === userId && item.state === "requested")
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
      if (item.creator?._id == userId && item.state == "requested") {
        // setCancelChallengeCreator(false);
      }
      if (item.creator?._id == userId && item.state == "requested" && audio) {
        playAudio2();
        setAudio(false);
      }
    });

    return challenge;
  }, [challenges]);

  useEffect(() => {
    if (ws?.connected) {
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
    }
  }, [noOfholdChallenges, isTabVisible]);

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
  };

  useEffect(() => {
    console.log(isButtonDisabled, isButtonType);
    if (isButtonDisabled && isButtonType === "delete") {
      deleteChallenge(isButtonDisabled);
    } else if (isButtonDisabled && isButtonType === "cancel") {
      handleCancel(isButtonDisabled);
    } else if (isButtonDisabled && isButtonType === "requested") {
      cancelChallenge(isButtonDisabled);
    } else if (
      typeof isButtonDisabled !== "string" &&
      isButtonType === "playChallange"
    ) {
      setIsButtonDisabled(isButtonDisabled._id);
      playChallenge(isButtonDisabled);
    } else if (isButtonDisabled && isButtonType === "viewChallange") {
      startGame(isButtonDisabled);
    }

    // Reset isButtonDisabled when a new request is received
    if (isButtonDisabled && isButtonType === "requested") {
      setIsButtonDisabled(null);
      setIsButtonType(null);
    }
  }, [isButtonDisabled, isButtonType]);

  const handleCancel = async (isButtonDisabled) => {
    if (!cancelChallengeCreator) {
      setCancelChallengeCreator(true);
      ws.send(
        JSON.stringify({
          type: "cancel",
          payload: { challengeId: isButtonDisabled, userId },
        })
      );

      

      setTimeout(() => {
        setCancelChallengeCreator(false);
      }, 2000);
    }
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
      if (!playGameLoading) {
        setPlayGameLoading(true);

        ws.send(
          JSON.stringify({
            type: "play",
            payload: { challengeId: challenge._id, userId },
          })
        );
      }
      setTimeout(() => {
        setPlayGameLoading(false);
      }, 2000);
    } else {
      toast.error("not enough chips");
    }
  };
  // console.log("ccdaf", challenges);

  const cancelChallenge = (challengeId) => {
    if (!RequestedLoading) {
      ws.send(
        JSON.stringify({
          type: "cancel",
          payload: { challengeId: challengeId, userId },
        })
      );

      setRequestedLoading(false);
    }
  };

  const startGame = (challengeId) => {
    if (!startGameLoading) {
      setStartGameLoading(true);

      ws.send(
        JSON.stringify({
          type: "startGame",
          payload: { challengeId, userId },
        })
      );
      setIsButtonDisabled(null);
      console.log("StartGame");
    }
  };

  const viewGame = (challengeId) => {
    navigate(`/game/${challengeId}`);
  };

  const viewHold = (challenge) => {
    setHoldChallenge(challenge);
    if (
      challenge.creator._id === userId &&
      challenge.results.creator?.result === ""
    ) {
      viewGame(challenge._id);
    } else if (
      challenge.player?._id === userId &&
      challenge.results.player?.result === ""
    ) {
      viewGame(challenge._id);
    } else {
      setHoldModal(true);
    }
  };

  return (
    <div
      className="col-12 col-sm-12 col-md-6 col-lg-4 mx-auto p-3 g-0"
      style={{ padding: "1rem", important: "true" }}
    >
      <audio ref={audioPlayer} src={NotificationSound} />

      <div className="d-flex flex-column">
        <div className="bg-gray-200 h-100 w-100 p-3 bg-light d-flex align-items-center justify-content-between hstack gap-2 ">
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
              style={{
                borderTopRightRadius: "6px",
                borderBottomRightRadius: "6px",
              }}
            >
              {createChallengeLoading ? (
                <CircularProgress
                  style={{
                    width: "1.0rem",
                    height: "1.0rem",
                    verticalAlign: "middle",
                  }}
                  color="white"
                />
              ) : (
                "Set"
              )}
            </button>

            <br></br>
          </div>

          {/* <Dropdown>
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
          </Dropdown> */}
        </div>
        <ul className="m-0 px-2">
          <div className="separator mt-3 mb-3">
            <img
              src="https://ludo-players.s3.ap-south-1.amazonaws.com/cdn/lp/illustrations/winner-cup-icon-png-19.png"
              alt="WinCupImg"
              style={{ width: "20px", height: "20px" }}
            />
            &nbsp;Open Battles&nbsp;
            <img
              src="https://ludo-players.s3.ap-south-1.amazonaws.com/cdn/lp/illustrations/winner-cup-icon-png-19.png"
              alt="WinCupImg"
              style={{ width: "20px", height: "20px" }}
            />
          </div>
          <ChallengeList
            challenges={challenges}
            userId={userId}
            isButtonDisabled={isButtonDisabled}
            isButtonType={isButtonType}
            setIsButtonDisabled={setIsButtonDisabled}
            cancelChallenge={cancelChallenge}
            setIsButtonType={setIsButtonType}
            playGameLoading={playGameLoading}
            RequestedLoading={RequestedLoading}
            viewGame={viewGame}
            viewHold={viewHold}
            startGameLoading={startGameLoading}
            handleOpen={handleOpen}
            cancelChallengeCreator={cancelChallengeCreator}
          />
        </ul>
      </div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogContent style={{ paddingTop: "13px" }}>
          {/* <Paper className={classes.paperContainer}> */}
          <Typography variant="body1">
            <b>Admin Will Update Result</b>
          </Typography>
          {/* </Paper> */}
        </DialogContent>
      </Dialog>
      <ViewChallenge
        holdModal={holdModal}
        holdChallenge={holdChallenge}
        userId={userId}
        setHoldModal={setHoldModal}
      />
    </div>
  );
}
