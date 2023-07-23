import { CircularProgress } from "@material-ui/core";
// import { toast } from "react-toastify";
import { toast } from "react-toastify";
import AWS from "aws-sdk";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { CDN_URL } from "../../../config";
import React, { useEffect, useState, useRef } from "react";
import { BsArrowLeftShort, BsInfoCircle, BsClipboard } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  cancelChallengeApi,
  looseChallengeApi,
  winChallengeApi,
} from "../../../apis/challenge";

import { getWalletReq } from "../../../redux/actions/wallet";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { connectSocket, isSocketConnected } from "../../../socket";
import SwipeableContainer from "./Guidedrawer";
import TwentyMinuteCountdown from "../components/appbar/TwentyMinuteCountdown";
import LudoKing from "../../../../public/images/ludoking.jpg";

export default function Game(props) {
  const params = useParams();
  const navigate = useNavigate();
  const userId = Cookies.get("userId");
  const [wonModal, setWonModal] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [is_open, setOpen] = useState(false);
  const [lostModal, setLostModal] = useState(false);
  const [disableCancelButton, setDisableCancelButton] = useState(false);
  const [screenshoot, setScreenshoot] = useState("");
  const [cancellationReason, setCancellation] = useState("");
  const [canceLLationModal, setCancellationModal] = useState(false);
  const [fileType, setFileType] = useState("");
  const [tabVisibleTime, setIsTabVisibleTime] = useState(true);
  const [isIlostClicked, setisIlostClicked] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const dispatch = useDispatch();
  let challengeInititalState = {
    creatorUserName: "",
    creatorImage: null,
    playerUserName: "",
    playerImage: null,
    playerId: "",
    creatorId: "",
    amount: 0,
    roomCode: "",
    challengeId: params.id,
  };

  const [image, setImage] = useState(null);
  const [challenge, setChallenge] = useState(challengeInititalState);
  const [showTimer, setShowTimer] = useState(false);
  const [userIs, setuserIs] = useState(null);
  const [ws, setWs] = useState();
  const [walletWs, setWalletWs] = useState();
  const [postResultLoading, setPostResultLoading] = useState(false);

  const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS,
    secretAccessKey: process.env.REACT_APP_SECRET,
  };
  AWS.config.update({
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS,
    secretAccessKey: process.env.REACT_APP_SECRET,
  });
  const showToast = () => {
    toast.success("Text copied!");
  };
  const handleRedirect = () => {
    const userAgent = window.navigator.userAgent;

    if (/iPad|iPhone|iPod/.test(userAgent)) {
      window.location.href =
        "https://itunes.apple.com/in/app/ludo-king/id993090598";
    } else if (/Android/.test(userAgent)) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.ludo.king";
    }
  };

  const socket = useRef(null);
  useEffect(() => {
    let heartbeatInterval = null;
    if (userId) {
      socket.current = connectSocket();

      if (!isSocketConnected(socket.current)) {
        socket.current.connect();
      }

      const wss = socket.current;
      setWs(wss);
      heartbeatInterval = setInterval(() => {
        wss.emit("ludogame", JSON.stringify({ type: "heartbeat" }));
      }, 2000);
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
    return () => {
      clearInterval(heartbeatInterval);
    };
  }, []);

  if (ws) {
    ws.on("showTimer", (datas) => {
      localStorage.removeItem("countdownEndTime");

      var data = JSON.parse(datas);
      setShowTimer(data.showTimer);
      // localStorage.setItem("showTimer", data.showTimer);
    });
    ws.on("ludogame", (event) => {
      event = JSON.parse(event);

      if (event.type === "heartbeat") {
        ws.emit("ludogame", JSON.stringify({ type: "ack" }));
      }

      if (event.status === 200) {
        // let looser = user.id != challenge.creator._id ? "creator" : "player";
        setChallenge({
          ...challenge,
          creatorUserName: event.data.creator.username,
          creatorImage: event.data.creator.profileImage,
          playerUserName: event.data.player.username,
          playerImage: event.data.creator.profileImage,
          roomCode: event.data.roomCode,
          amount: event.data.amount,
          creatorId: event.data.creator._id,
          playerId: event.data.player._id,
        });
        if (event.data.state === "hold") {
          navigate("/play");
        }
        const userIss =
          userId === event.data?.creator._id ? "creator" : "player";
        const otherUseree =
          userId !== event.data?.creator._id ? "creator" : "player";
        setuserIs(userIss);

        if (
          event.data.results[userIss]?.result === "" &&
          event.data.results[otherUseree]?.result !== ""
        ) {
          setShowTimer(true);
        }
      }
      // console.log("event.data22", event.data.results);
      if (
        event.data?.creator?._id == userId &&
        event.data?.results?.creator?.result !== ""
      ) {
        console.log("creatoor", event.data?.results);
        // toast.error("You have already submitted result")
        navigate("/play");
        return;
      }
      if (
        event.data?.player._id == userId &&
        event.data?.results?.player?.result !== ""
      ) {
        console.log("playeeer", event.data?.results);
        // toast.error("You have already submitted result")
        navigate("/play");
        return;
      }
      if (event.status === 400) {
        // toast.error(event.error)
        navigate("/play");
        return;
      }
      // setChallenges(event)
    });
  }
  const handleGuide = () => setOpen(true);
  const handleGuide2 = () => setOpen(false);

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
    try {
      if (screenshoot !== "") {
        const uploadFile = async (file) => {
          setPostResultLoading(true);
          if (!file) {
            return;
          }
          const maxFileSize = 10 * 1024 * 1024; // 10 MB (in bytes)
          const fileSize = file.size;
          if (fileSize > maxFileSize) {
            return toast.error("File size exceeds the maximum limit.");
          } else {
            const s3 = new AWS.S3();
            const params = {
              Bucket: "ludo3",
              Key: `${Date.now()}_${file.name}_id_${challengeObject.id}`,
              Body: file,
              ACL: "public-read",
              ContentType: file.type,
            };
            const { Location } = await s3.upload(params).promise();
            if (Location) {
              return Location;
            } else {
              return false;
            }
          }
        };
        const Url = await uploadFile(screenshoot);
        if (Url) {
          challengeObject.image = Url;

          let challenge = await winChallengeApi(challengeObject);
          if (challenge) {
            navigate("/play");
          }
          setPostResultLoading(false);

          if (challenge) {
            localStorage.removeItem("countdownEndTime");
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
          setPostResultLoading(false);
          toast.success("result submitted");
          navigate("/play");
        }
      } else {
        toast.error("please upload result");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const looseChallenge = async (challengeId) => {
    try {
      setisIlostClicked(true);
      let challenge = await looseChallengeApi(challengeId);
      if (challenge) {
        navigate("/play");
      }
      setisIlostClicked(false);
      if (challenge.status == 200) {
        localStorage.removeItem("countdownEndTime");
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
        toast.error(challenge.error);
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
        navigate("/play");
      }
      setDisableCancelButton(false);
      if (challenge) {
        localStorage.removeItem("countdownEndTime");
        ws.emit(
          "getUserWallet",
          JSON.stringify({
            type: "getUserWallet",
            payload: {
              userId: userId,
            },
          })
        );
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
    setScreenshoot(event.target.files[0]);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    if (event.target.files[0]) {
      setIsImageUploaded(true);
    }

    // Set isImageUploaded to true when an image is selected
  };
  const handleCancellationReason = async (text) => {
    setCancellation(text);
  };
  console.log(challenge);
  return (
    <div className=" col-12 col-sm-12 col-md-6 col-lg-4 mx-auto p-3 g-0">
      <div>
        <SwipeableContainer
          is_open={is_open}
          handleGuide2={handleGuide2}
        ></SwipeableContainer>
      </div>
      <div>
        <div className="d-flex alig-items-center justify-content-between mt-2 mb-3">
          <Link to="/play">
            <button type="button" className="text-capitalize btn btn-primary">
              <BsArrowLeftShort />
              <span className="text-capitalize">back</span>
            </button>
          </Link>
          <div>
            {" "}
            {showTimer ? (
              <TwentyMinuteCountdown
                challengeObj={{
                  challengeId: challenge.challengeId,
                  userId: userId,
                }}
              />
            ) : (
              <></>
            )}
          </div>

          <div className="d-grid">
            <button
              type="button"
              onClick={handleGuide}
              className="d-flex align-items-center justify-content-center btn btn-outline-danger"
            >
              <BsInfoCircle className="me-1" />
              <span className="text-capitalize">Rules</span>
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
                    src={`${CDN_URL}avatar/${
                      challenge.creatorImage ? challenge.creatorImage : "2.svg"
                    }`}
                    alt="avatar"
                  />
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
                  <img
                    src={`${CDN_URL}avatar/${
                      challenge.playerImage ? challenge.playerImage : "2.svg"
                    }`}
                    alt="avatar"
                  />
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

              <button
                style={{ marginTop: "5px" }}
                className="btn btn-secondary text-capitalize d-flex align-items-center justify-content-center"
                onClick={handleRedirect}
              >
                <img
                  style={{ width: "1.4rem", marginRight: "5px" }}
                  // src={`${CDN_URL}public/images/ludoking.jpg`}
                  src={LudoKing}
                  alt="ludo king"
                />
                Open Ludo King
              </button>
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
                {isIlostClicked ? (
                  <CircularProgress
                    style={{
                      width: "1.5rem",
                      height: "1.5rem",
                      verticalAlign: "middle",
                      color: "#fff",
                    }}
                  />
                ) : (
                  "Yes, i lost"
                )}
              </button>
              <button
                onClick={() => {
                  setLostModal(false);
                }}
                type="button"
                className="btn btn-outline-danger btn-lg"
              >
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
                disabled={isImageUploaded}
                onChange={handleImageChange}
              />
              {screenshoot !== "" && (
                <img
                  width={100}
                  height={100}
                  src={image}
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
                {postResultLoading || IsLoading ? (
                  <CircularProgress
                    style={{
                      width: "1.5rem",
                      height: "1.5rem",
                      verticalAlign: "middle",
                      color: "#fff",
                    }}
                  />
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
                style={{ cursor: "pointer" }}
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
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleCancellationReason("Not Joined");
                }}
              >
                Not Joined
              </span>
            </div>
            <div className="col">
              <span
                style={{ cursor: "pointer" }}
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
                style={{ cursor: "pointer" }}
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
                style={{ cursor: "pointer" }}
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
                style={{ cursor: "pointer" }}
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
                style={{ cursor: "pointer" }}
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
              {disableCancelButton ? (
                <CircularProgress
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    verticalAlign: "middle",
                    color: "#fff",
                  }}
                />
              ) : (
                "Confirm"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// scp username@server1_ip:/path_to_the_remote_file username@server2_ip:/path_to_destination_directory/
