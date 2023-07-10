import React from "react";
import { CDN_URL } from "../../../config";
import { CSSTransition } from "react-transition-group";
import OtherPlayingChallenges from "./OtherPlayingChallenges";
import ButtonChallenges from "./ButtonChallenges";
const ChallengeList = React.memo(
  ({
    isButtonType,
    setIsButtonType,
    setIsButtonDisabled,
    isButtonDisabled,
    playGameLoading,
    cancelChallenge,
    startGameLoading,
    challenges,
    handleOpen,
    userId,
    RequestedLoading,
    viewGame,
    viewHold,
    cancelChallengeCreator,
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
                  <div>
                    <OtherPlayingChallenges item={item} />
                  </div>
                ) : item.state == "open" ||
                  item.state == "requested" ||
                  item.state == "playing" ? (
                  <div>
                    <ButtonChallenges
                      item={item}
                      userId={userId}
                      CDN_URL={CDN_URL}
                      setIsButtonDisabled={setIsButtonDisabled}
                      setIsButtonType={setIsButtonType}
                      playGameLoading={playGameLoading}
                      startGameLoading={startGameLoading}
                      cancelChallenge={cancelChallenge}
                      viewGame={viewGame}
                      viewHold={viewHold}
                      isButtonDisabled={isButtonDisabled}
                      isButtonType={isButtonType}
                      RequestedLoading={RequestedLoading}
                      cancelChallengeCreator={cancelChallengeCreator}
                    />
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
      [
        challenges,
        isButtonDisabled,
        isButtonType,
        setIsButtonDisabled,
        setIsButtonType,
        startGameLoading,
        userId,
        playGameLoading,
        cancelChallengeCreator,
        handleOpen,
        viewGame,
        viewHold,
        RequestedLoading,
        cancelChallenge,
      ]
    );

    return (
      <ul style={{ padding: 0 }} className="challenge-list">
        {memoizedChallenges}
      </ul>
    );
  }
);

export default ChallengeList;
