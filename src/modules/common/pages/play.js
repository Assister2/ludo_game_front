// import cogoToast from "cogo-toast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChallengeList from "./ChallengeList";
// import Dash from "./dash";
import "./animation.css";
import ViewChallenge from "./ViewChallenge";
// import Avatar from "react-avatar";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState, useMemo } from "react";

import { useNavigate } from "react-router-dom";
import socketNew from "../../../socket";

import { logoutSuccess, logoutRequest } from "../../.././redux/actions/auth";
import {
  sortEvents,
  filterEvents,
  challengesSort,
} from "../functions/functions";
import { CircularProgress } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";

import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";

export default function Play() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const userId = Cookies.get("userId");
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [createChallengeLoading, setCreateChallengeLoading] = useState(false);
  const [challenges, setChallenges] = useState([]);

  const [isTabVisible, setIsTabVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const [ws, setWs] = useState();

  const handleChange = (e) => {
    setAmount(e.target.value);
  };
  const { instance } = useSelector((state) => state.socketReducer);
  const { data } = useSelector((state) => state.wallet1);

  const [holdChallenge, setHoldChallenge] = useState({});

  const [holdModal, setHoldModal] = useState(false);

  const socket = useRef(null);
  useEffect(() => {
    let heartbeatInterval;
    if (instance) {
      socket.current = instance.connect();
    } else {
      socket.current = socketNew.connect();
    }
    if (userId) {
      const handleVisibilityChange = () => {
        setIsTabVisible(!document.hidden);
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      // client = socket.current;

      if (!!socket.current) {
        setWs(socket.current);
      }

      heartbeatInterval = setInterval(() => {
        socket.current.send(JSON.stringify({ type: "heartbeat" }));
      }, 1000);

      socket.current.send(
        JSON.stringify({
          type: "",
          payload: { userId },
        })
      );

      socket.current.on("message", (event) => {
        var events = JSON.parse(event);
        if (events.status === "enabled") {
          setButtonLoading(false);
          setCreateChallengeLoading(false);
        }

        if (events.type === "heartbeat") {
          socket.current.send(JSON.stringify({ type: "ack" }));
        }

        if (events.challengeRedirect) {
          navigate(`/game/${events.challengeId}`);
          return;
        }

        if (events.status === 400) {
          setButtonLoading(false);
          setCreateChallengeLoading(false);
          toast.error(events.error);

          return;
        }

        if (events.sort) {
          sortEvents(events, userId);
        }
        if (events.filter) {
          const tempData = filterEvents(events, userId, viewGame);
          setChallenges(tempData);
        }
      });

      socket.current.on("error", (events) => {});
    }
    if (!userId) {
      dispatch(logoutSuccess());
      navigate("/login");
    }
    if (socket.current) {
      socket.current.send(
        JSON.stringify({
          type: "deleteOpenChallengesOfCreator",
          payload: { userId },
        })
      );
    }

    return () => {
      clearInterval(heartbeatInterval);
      if (socket.current) {
        socket.current.send(
          JSON.stringify({
            type: "deleteOpenChallengesOfCreator",
            payload: { userId },
          })
        );
      }
    };
  }, []);

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
          (item.player?._id === userId && item.state === "requested") ||
          (item.creator?._id === userId && item.state === "requested")
        ) {
          challenge++;
        }
      }
    });

    return challenge;
  }, [challenges, userId]);
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
  }, [isTabVisible]);

  const createChallenge = () => {
    if (amount <= 0) {
      toast.error("amount should be greater that 0 and multiples of 50");
      setCreateChallengeLoading(false);
      return;
    }
    if (amount > 10000) {
      toast.error("amount should lesser than or equals to 10000");
      setCreateChallengeLoading(false);
      return;
    }
    if (amount % 50 !== 0) {
      toast.error("amount should be multiple of 50");
      setCreateChallengeLoading(false);
      return;
    }
    if (!createChallengeLoading) {
      ws.send(
        JSON.stringify({
          type: "create",
          payload: { amount: amount, userId },
        })
      );
    }
    setCreateChallengeLoading(true);
    setAmount("");
  };
  const challengeButton = async (challenge, type) => {
    if (type === "play" && data.wallet < challenge.amount) {
      toast.error("not enough chips");
      return;
    }

    if (!buttonLoading) {
      ws.send(
        JSON.stringify({
          type: type,
          payload: { challengeId: challenge._id, userId },
        })
      );
    }
    setButtonLoading(challenge._id);
  };

  const viewGame = (challengeId) => {
    navigate(`/game/${challengeId}`);
  };

  const viewHold = (challenge) => {
    setHoldChallenge(challenge);

    const isCreator = challenge.creator._id === userId;
    const isPlayer = challenge.player?._id === userId;
    const creatorResultEmpty = !challenge.results.creator?.result;
    const playerResultEmpty = !challenge.results.player?.result;

    if ((isCreator && creatorResultEmpty) || (isPlayer && playerResultEmpty)) {
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
            />
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
                <>
                  <CircularProgress
                    style={{
                      width: "1.0rem",
                      height: "1.0rem",
                      verticalAlign: "middle",
                      color: "#fff",
                    }}
                  />{" "}
                  Set
                </>
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
            ws={ws}
            challenges={challenges}
            userId={userId}
            buttonLoading={buttonLoading}
            challengeButton={challengeButton}
            viewGame={viewGame}
            viewHold={viewHold}
            handleOpen={handleOpen}
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
