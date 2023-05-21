import { CircularProgress } from "@material-ui/core";
import cogoToast from "cogo-toast";
import Cookies from "js-cookie";
import React, { useEffect, useState, useRef } from "react";
import { BsArrowLeftShort, BsInfoCircle, BsClipboard } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  cancelChallengeApi,
  getChallengeByIdApi,
  looseChallengeApi,
  winChallengeApi,
} from "../../../apis/challenge";
import { getWalletReq } from "../../../redux/actions/wallet";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Moment from "react-moment";
import moment from "moment";
import socketNew2 from "../../../socker";
export default function Game(props) {
  const params = useParams();
  const navigate = useNavigate();
  const userId = Cookies.get("userId");
  const [wonModal, setWonModal] = useState(false);
  const [lostModal, setLostModal] = useState(false);
  const [myResult, setMyResult] = useState("");
  const [isTabSwitch, setTabSwitch] = useState(false);
  const [disableCancelButton, setDisableCancelButton] = useState(false);
  const [screenshoot, setScreenshoot] = useState("");
  const [cancellationReason, setCancellation] = useState("");
  const [canceLLationModal, setCancellationModal] = useState(false);
  const [fileType, setFileType] = useState("");
  const [tabVisibleTime, setIsTabVisibleTime] = useState(true);
  const [isIlostClicked, setisIlostClicked] = useState(false);
  const dispatch = useDispatch();
  let challengeInititalState = {
    playerUserName: "",
    creatorUserName: "",
    playerId: "",
    creatorId: "",
    amount: 0,
    roomCode: "",
    challengeId: params.id,
  };
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [challenge, setChallenge] = useState(challengeInititalState);
  const [ws, setWs] = useState();
  const [walletWs, setWalletWs] = useState();
  const [postResultLoading, setPostResultLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  const webSocketRef = useRef(null);

  const showToast = () => {
    cogoToast.success("Text copied!");
  };
  const socket2 = useSelector((state) => state.socketReducer);
  console.log("socket2game", socket2);
  if (!socket2.instance) {
    dispatch({ type: "SOCKET_CONNECTED", payload: socketNew2 });
  }
  const { instance } = socket2;
  var socketNew = instance;
  useEffect(() => {
    if (userId) {
      if (userId) {
        socketNew.connect();
      }
      dispatch(getWalletReq());
      const handleVisibilityChange = () => {
        setIsTabVisible(!document.hidden);
      };

      let heartbeatInterval = null;
      document.addEventListener("visibilitychange", handleVisibilityChange);

      const wss = socketNew.connect();

      setWs(wss);

      heartbeatInterval = setInterval(() => {
        wss.emit("ludogame", JSON.stringify({ type: "heartbeat" }));
      }, 30000);

      wss.emit(
        "ludogame",
        JSON.stringify({
          type: "getChallengeByChallengeId",
          payload: {
            challengeId: params.id,
            userId,
          },
        })
      );
    }
  }, []);

  if (ws) {
    ws.on("ludogame", (event) => {
      event = JSON.parse(event);

      if (event.type === "heartbeat") {
        ws.emit("ludogame", JSON.stringify({ type: "ack" }));
      }

      if (event.status == 200) {
        setChallenge({
          ...challenge,
          creatorUserName: event.data.creator.username,
          playerUserName: event.data.player.username,
          roomCode: event.data.roomCode,
          amount: event.data.amount,
          creatorId: event.data.creator._id,
          playerId: event.data.player._id,
        });
      }
      console.log("event.data", event.data);
      if (
        event.data?.creator?._id == userId &&
        event.data?.results?.creator !== ""
      ) {
        // cogoToast.error("You have already submitted result")
        navigate("/play");
        return;
      }
      if (
        event.data?.player._id == userId &&
        event.data?.results?.player !== ""
      ) {
        // cogoToast.error("You have already submitted result")
        navigate("/play");
        return;
      }
      if (event.status == 400) {
        // cogoToast.error(event.error)
        navigate("/play");
        return;
      }
      // setChallenges(event)
    });
  }

  const dialogs = document.querySelectorAll("dialog");

  // Add event listeners to each dialog
  dialogs.forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      // Close any open dialogs
      dialogs.forEach((dialog) => {
        if (dialog !== event.target && dialog.open) {
          dialog.close();
        }
      });
    });
  });

  useEffect(() => {
    if (wonModal) {
      setWonModal(true);
      if (lostModal) {
        setLostModal(false);
      }
      if (canceLLationModal) {
        setCancellationModal(false);
      }
    }
  }, [wonModal]);

  useEffect(() => {
    if (lostModal) {
      setLostModal(true);
      if (wonModal) {
        setWonModal(false);
      }
      if (canceLLationModal) {
        setCancellationModal(false);
      }
    }
  }, [lostModal]);

  useEffect(() => {
    if (canceLLationModal) {
      setCancellationModal(true);
      if (lostModal) {
        setLostModal(false);
      }
      if (wonModal) {
        setWonModal(false);
      }
    }
  }, [canceLLationModal]);

  const winChallenge = async (challengeObject) => {
    // console.log("win challenge working")
    try {
      if (screenshoot !== "") {
        setPostResultLoading(true);
        let challenge = await winChallengeApi(challengeObject);

        if (challenge) {
          setPostResultLoading(false);
          ws.emit(
            "ludogame",
            JSON.stringify({
              type: "getChallengeByChallengeId",
              payload: {
                challengeId: params.id,
                userId,
              },
            })
          );
        }
        cogoToast.success("result submitted");
        navigate("/play");
      } else {
        cogoToast.error("please upload result");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const looseChallenge = async (challengeId) => {
    try {
      setisIlostClicked(true);
      let challenge = await looseChallengeApi(challengeId);
      console.log("challenge", challenge);
      if (challenge.status == 200) {
        dispatch(getWalletReq());
        ws.emit(
          "ludogame",
          JSON.stringify({
            type: "getChallengeByChallengeId",
            payload: {
              challengeId: params.id,
              userId,
            },
          })
        );
      }
      if (challenge.status == 400) {
        cogoToast.error(challenge.error);
        navigate("/play");
      }
    } catch (error) {
      setisIlostClicked(false);
      console.log("error", error);
    }
  };

  const cancelChallenge = async (challengeObject) => {
    try {
      setDisableCancelButton(true);
      let challenge = await cancelChallengeApi(challengeObject);
      if (challenge) {
        ws.emit(
          "ludogame",
          JSON.stringify({
            type: "getChallengeByChallengeId",
            payload: {
              challengeId: params.id,
              userId,
            },
          })
        );
      }
    } catch (error) {
      setDisableCancelButton(false);
      console.log("error", error);
    }
  };

  const handleImageChange = (event) => {
    console.log("yes1");
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log("yes2");

      setScreenshoot(reader.result);
      console.log("yes3", event);
      const file = document.getElementById("upload-btn").files[0];
      // const file = event.target.files[0]
      const getFileExtension = file?.name?.split(".").pop();
      console.log("yes3.5", getFileExtension);
      setFileType(getFileExtension);
      console.log("yes4");

      console.log("file", file);
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  const handleCancellationReason = async (text) => {
    setCancellation(text);
  };

  return (
    <div className=" col-12 col-sm-12 col-md-6 col-lg-4 mx-auto p-3 g-0">
      <div>
        <div className="d-flex alig-items-center justify-content-between mt-2 mb-3">
          <Link to="/play">
            <button type="button" className="text-capitalize btn btn-primary">
              <BsArrowLeftShort />
              <span className="text-capitalize">back</span>
            </button>
          </Link>
          <div className="d-grid">
            <button
              type="button"
              className="d-flex align-items-center justify-content-center btn btn-outline-danger"
            >
              <BsInfoCircle className="me-1" />
              <span className="text-capitalize">Guide</span>
            </button>
          </div>
        </div>
        <div className="mb-2 shadow card">
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
                  {challenge.creatorUserName.slice(0, 5)}...
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
                  ₹ {challenge.amount}
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
                  {challenge.playerUserName.slice(0, 5)}...
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-2 shadow card">
          <div style={{ fontSize: "80%" }} className="card-body">
            Opponent का एक भी टोकन खुलने के बाद यदि आप Game Left करते हो तो
            Opponent को सीधा Win कर दिया जायेगा ! Auto Exit के केस में Admins का
            निर्णय ही अंतिम होगा जिससे आपको मान न होगा ! लेकिन यदि आप गेम को जान
            भुजकर Auto Exit में छोड़ देते है तो आपको Loss कर दिया जायेगा
          </div>
        </div>
        <div className="mb-3 shadow card">
          <div className="bg-light text-dark text-capitalize card-header">
            room code
          </div>
          <div className="card-body">
            <h1 className="py-3 fw-bold">{challenge.roomCode}</h1>
            <div className="d-grid">
              <CopyToClipboard text={challenge.roomCode} onCopy={showToast}>
                <button className="btn btn-primary text-capitalize d-flex align-items-center justify-content-center">
                  {" "}
                  <BsClipboard className="me-1" color="white" />
                  copy code
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
        <div className="mb-3 shadow card">
          <div className="bg-light text-dark text-capitalize card-header">
            Game Result
          </div>
          <div className="card-body">
            <p>
              After completion of your game, select the status of the game and
              post your screenshot below
            </p>
            <div className="d-flex flex-column align-content-stretch">
              <button
                className="btn btn-success btn-lg text-uppercase mb-3"
                onClick={() => {
                  setWonModal(true);
                }}
              >
                i won
              </button>
              <button
                className="btn btn-danger btn-lg text-uppercase mb-3"
                onClick={() => {
                  setLostModal(true);
                }}
              >
                i lost
              </button>
              <button
                className="btn btn-outline-dark btn-lg text-uppercase"
                onClick={() => {
                  setCancellationModal(!canceLLationModal);
                }}
              >
                cancel
              </button>
            </div>{" "}
          </div>
        </div>
        <div className="mb-3 shadow card">
          <div className="bg-light text-dark text-capitalize card-header">
            Penalty
          </div>
          <div className="card-body">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>₹100</td>
                  <td>Fraud / Fake Screenshot</td>
                </tr>
                <tr>
                  <td>₹50</td>
                  <td>Wrong Update</td>
                </tr>
                <tr>
                  <td>₹50</td>
                  <td>No Update</td>
                </tr>
                <tr>
                  <td>₹25</td>
                  <td>Abusing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        role="dialog"
        aria-modal="true"
        className={`h-auto offcanvas offcanvas-bottom ${
          lostModal ? "show" : "hide"
        }`}
        tabindex="-1"
        style={{ visibility: "visible" }}
      >
        <div className="offcanvas-header">
          <div className="offcanvas-title h5"></div>
          <button
            onClick={() => {
              setLostModal(false);
            }}
            type="button"
            className="btn-close"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <h1 className="text-capitalize">are you sure you lost this game?</h1>
          <div className="py-4">
            <div className="vstack gap-3 minBreakpoint-xs">
              <button
                disabled={isIlostClicked}
                type="button"
                onClick={() => {
                  looseChallenge(challenge.challengeId);
                }}
                className="text-capitalize btn btn-danger btn-lg"
              >
                Yes, i lost
              </button>
              <button type="button" className="btn btn-outline-danger btn-lg">
                No
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* win modal */}
      <div
        role="dialog"
        aria-modal="true"
        className={`h-auto offcanvas offcanvas-bottom ${
          wonModal ? "show" : "hide"
        }`}
        tabindex="-1"
        style={{ visibility: "visible" }}
      >
        <div className="offcanvas-header">
          <div className="offcanvas-title h5"></div>
          <button
            onClick={() => {
              setWonModal(false);
              setScreenshoot("");
            }}
            type="button"
            className="btn-close"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="pb-3 d-flex flex-column align-items-stretch">
            <div className="vstack gap-3 minBreakpoint-xs">
              <h1 className="text-capitalize">upload result</h1>
              <input
                hidden
                id="upload-btn"
                className="btn btn-primary btn-lg"
                type="file"
                onChange={handleImageChange}
              />
              {screenshoot !== "" && (
                <img
                  width={100}
                  height={100}
                  src={screenshoot}
                  alt="Selected Image"
                />
              )}

              <label for="upload-btn" className="btn btn-primary btn-lg">
                Upload Image
              </label>

              <button
                type="button"
                disabled={postResultLoading}
                className="btn btn-success btn-lg"
                onClick={() => {
                  winChallenge({
                    id: challenge.challengeId,
                    image: screenshoot,
                    fileType: fileType,
                  });
                }}
              >
                {" "}
                {postResultLoading ? (
                  <CircularProgress
                    style={{
                      width: "1.5rem",
                      height: "1.5rem",
                      verticalAlign: "middle",
                    }}
                    color="white"
                  ></CircularProgress>
                ) : (
                  "Post Result"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* cancellation modal */}
      <div
        role="dialog"
        aria-modal="true"
        className={`h-auto offcanvas offcanvas-bottom ${
          canceLLationModal ? "show" : "hide"
        }`}
        tabindex="-1"
        style={{ visibility: "visible" }}
      >
        <div className="offcanvas-header">
          <div className="offcanvas-title h5"></div>
          <button
            onClick={() => {
              setCancellationModal(false);
            }}
            type="button"
            className="btn-close"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <h5 className="text-capitalize">we would like to know more</h5>
          <h6 className="text-capitalize">select reason for cancelling</h6>
          <div className="row row-cols-auto g-2 py-3 container-fluid">
            <div className="col">
              <span
                className="py-2 px-3 badge rounded-pill bg-secondary"
                onClick={() => {
                  handleCancellationReason("No Room Code");
                }}
              >
                No Room Code
              </span>
            </div>
            <div className="col">
              <span
                className="py-2 px-3 badge rounded-pill bg-secondary"
                onClick={() => {
                  handleCancellationReason("Not Joined");
                }}
              >
                Not Joined
              </span>
            </div>
            <div className="col">
              <span
                className="py-2 px-3 badge rounded-pill bg-secondary"
                onClick={() => {
                  handleCancellationReason("Not Playing");
                }}
              >
                Not Playing
              </span>
            </div>
            <div className="col">
              <span
                className="py-2 px-3 badge rounded-pill bg-secondary"
                onClick={() => {
                  handleCancellationReason("Don't want to Play");
                }}
              >
                Don't want to Play
              </span>
            </div>
            <div className="col">
              <span
                className="py-2 px-3 badge rounded-pill bg-secondary"
                onClick={() => {
                  handleCancellationReason("Opponent Abusing");
                }}
              >
                Opponent Abusing
              </span>
            </div>
            <div className="col">
              <span
                className="py-2 px-3 badge rounded-pill bg-secondary"
                onClick={() => {
                  handleCancellationReason("Game Not Start");
                }}
              >
                Game Not Start
              </span>
            </div>
            <div className="col">
              <span
                className="py-2 px-3 badge rounded-pill bg-secondary"
                onClick={() => {
                  handleCancellationReason("Other");
                }}
              >
                Other
              </span>
            </div>
          </div>
          <div className="d-flex flex-column align-items-stretch pb-3">
            <button
              type="button"
              disabled={cancellationReason === "" || disableCancelButton}
              className="text-capitalize btn btn-primary btn-lg"
              onClick={() => {
                cancelChallenge({
                  _id: challenge.challengeId,
                  cancellationReason,
                });
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// scp username@server1_ip:/path_to_the_remote_file username@server2_ip:/path_to_destination_directory/
