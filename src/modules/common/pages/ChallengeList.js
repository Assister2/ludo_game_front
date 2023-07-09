import React from "react";
import { CDN_URL } from "../../../config";
import { CSSTransition } from "react-transition-group";
import { CircularProgress } from "@material-ui/core";
const ChallengeList = React.memo(
  ({
    isButtonType,
    setIsButtonType,
    setIsButtonDisabled,
    isButtonDisabled,
    playGameLoading,
    startGameLoading,
    challenges,
    handleOpen,
    userId,
    RequestedLoading,
    viewGame,
    viewHold,
  }) => {
    const memoizedChallenges = React.useMemo(
      () =>
        challenges.map((item) => {
          return (
            <CSSTransition
              key={item._id}
              timeout={100}
              classNames={{
                enter: false ? "card-animation-enter" : "",
                enterActive:
                  item.creator?._id !== userId
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
                            <img src="https://ludo3.s3.ap-south-1.amazonaws.com/avtar/2.svg"></img>
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
                      {item.state == "requested" &&
                      item.creator._id == userId ? (
                        <span>Requested Challenge By</span>
                      ) : item.state == "playing" ? (
                        <span>Challenge running with</span>
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
                              src={`${CDN_URL}avatar/${item.creator.profileImage}`}
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
                                disabled={
                                  item._id === isButtonDisabled &&
                                  isButtonType === "delete"
                                }
                                className="btn btn-danger playChallange btn-sm"
                                onClick={() => {
                                  setIsButtonDisabled(item._id);
                                  setIsButtonType("delete");
                                }}
                              >
                                Delete
                              </button>
                            )}
                          {item.state == "open" &&
                            item.creator?._id != userId && (
                              <button
                                className="btn btn-primary playChallange btn-sm"
                                onClick={() => {
                                  setIsButtonDisabled(item);
                                  setIsButtonType("playChallange");
                                }}
                                disabled={playGameLoading}
                              >
                                {playGameLoading ? (
                                  <CircularProgress
                                    style={{
                                      width: "1.0rem",
                                      height: "1.0rem",
                                      verticalAlign: "middle",
                                    }}
                                    color="white"
                                  />
                                ) : (
                                  "Play"
                                )}
                              </button>
                            )}
                          {item.player?._id == userId &&
                            item.state == "requested" && (
                              <button
                                disabled={RequestedLoading}
                                className="btn btn-secondary btn-sm"
                                onClick={() => {
                                  setIsButtonDisabled(item._id);
                                  setIsButtonType("requested");
                                }}
                              >
                                Requested
                              </button>
                            )}

                          {item.creator?._id == userId &&
                          item.state == "requested" ? (
                            <div className="hstack gap-2 minBreakpoint-xs">
                              <button
                                disabled={
                                  item._id === isButtonDisabled &&
                                  isButtonType === "viewChallange"
                                    ? true
                                    : false
                                }
                                className="checkCancelRequest btn btn-success viewChallange btn-sm"
                                onClick={() => {
                                  setIsButtonDisabled(item._id);
                                  setIsButtonType("viewChallange");
                                }}
                              >
                                {startGameLoading ? (
                                  <CircularProgress
                                    style={{
                                      width: "1.0rem",
                                      height: "1.0rem",
                                      verticalAlign: "middle",
                                    }}
                                    color="white"
                                  />
                                ) : (
                                  "Play"
                                )}
                              </button>
                              <button
                                disabled={
                                  item._id === isButtonDisabled &&
                                  isButtonType === "cancel"
                                    ? true
                                    : false
                                }
                                className="btn btn-danger cancelRequest btn-sm"
                                onClick={() => {
                                  setIsButtonDisabled(item._id);
                                  setIsButtonType("cancel");
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : null}
                          {item.player?._id == userId &&
                            item.state == "playing" &&
                            item.results.player.result == "" && (
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
                            item.state == "playing" &&
                            item.results.creator.result == "" && (
                              <button
                                onClick={() => {
                                  viewGame(item._id);
                                }}
                                className="btn btn-success btn-sm"
                              >
                                view
                              </button>
                            )}
                          {item.creator?._id == userId &&
                            item.state == "playing" &&
                            item.results.creator.result != "" && (
                              <button
                                onClick={() => {
                                  viewHold(item);
                                }}
                                className="btn btn-success btn-sm"
                              >
                                view
                              </button>
                            )}
                          {item.player?._id == userId &&
                            item.state == "playing" &&
                            item.results.player.result != "" && (
                              <button
                                onClick={() => {
                                  viewHold(item);
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
                          <span>Challenge running with</span>
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
                                  backgroundImage: `url(${CDN_URL}avatar/${item?.player?.profileImage}`,
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
                                    ? `${item?.creator?.username.slice(
                                        0,
                                        5
                                      )}...`
                                    : item.creator._id == userId
                                    ? `${item?.player?.username.slice(0, 5)}...`
                                    : `${item?.creator?.username.slice(
                                        0,
                                        5
                                      )}...`}
                                </span>
                                {/* {item.state == "hold" && item.creator._id == userId ?
                                                    <div role="status" className="me-2 spinner-border">
                                                        <span className="visually-hidden"></span>
                                                    </div> :
                                                } */}
                              </div>
                            }
                          </div>
                          {item.creator?._id === userId &&
                          item.results.creator?.timeover &&
                          item.state === "hold" ? (
                            <div className="d-flex align-items-center">
                              <div className="hstack gap-2 minBreakpoint-xs">
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={handleOpen}
                                >
                                  Hold
                                </button>
                              </div>
                            </div>
                          ) : item.player?._id === userId &&
                            item.results.player?.timeover &&
                            item.state === "hold" ? (
                            <div className="d-flex align-items-center">
                              <div className="hstack gap-2 minBreakpoint-xs">
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={handleOpen}
                                >
                                  Hold
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="d-flex align-items-center">
                              <div className="hstack gap-2 minBreakpoint-xs">
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={() => {
                                    viewHold(item);
                                  }}
                                >
                                  View
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <>
                        {
                          <div className="d-flex align-items-center">
                            <div className="hstack gap-2 minBreakpoint-xs">
                              {
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={() => {
                                    viewHold(item);
                                  }}
                                >
                                  View
                                </button>
                              }
                            </div>
                          </div>
                        }
                      </>
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
      <ul style={{ padding: 0 }} className="challenge-list">
        {memoizedChallenges}
      </ul>
    );
  }
);

export default ChallengeList;
