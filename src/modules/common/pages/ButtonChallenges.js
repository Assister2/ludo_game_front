import React from "react";
import { CircularProgress } from "@material-ui/core";
const ButtonChallenges = ({
  item,
  userId,
  CDN_URL,
  setIsButtonDisabled,
  setIsButtonType,
  playGameLoading,
  startGameLoading,
  cancelChallenge,
  viewGame,
  viewHold,
  isButtonDisabled,
  isButtonType,
  RequestedLoading,
  cancelChallengeCreator,
}) => {
  return (
    <div className="my-2 card">
      <div className="d-flex align-items-center justify-content-between card-header">
        {item.state === "requested" && item.creator._id === userId ? (
          <span>Requested Challenge By</span>
        ) : item.state === "playing" ? (
          <span>Challenge running with</span>
        ) : (
          <span>Challenge set by</span>
        )}
        <span className="text-success fw-bold">Rs {item.amount}</span>
      </div>
      <div className="d-flex align-items-center justify-content-between card-body">
        <div className="d-flex align-items-center flex-grow-1">
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
                alt="Avatar"
              />
            </div>
          </div>
          {item.creator._id === userId && item.state === "open" ? (
            <div className="d-flex align-items-center justify-content-start">
              <div
                role="status"
                className="me-2 spinner-border"
                style={{ marginLeft: "5px" }}
              >
                <span className="visually-hidden">
                  {item.creator._id === userId && item.state === "hold"
                    ? "waiting for player to start"
                    : "finding player..."}
                </span>
              </div>
              <span className="text-capitalize">finding player</span>
            </div>
          ) : (
            <>
              <div style={{ marginLeft: "5px" }}>
                <span
                  className="fw-semibold text-truncate text-start"
                  style={{ width: "100px" }}
                >
                  {item.state === "open"
                    ? `${item?.creator?.username.slice(0, 5)}...`
                    : item.creator._id === userId
                    ? `${item?.player?.username.slice(0, 5)}...`
                    : `${item?.creator?.username.slice(0, 5)}...`}
                </span>
              </div>
            </>
          )}
        </div>
        <div className="d-flex align-items-center">
          <div className="hstack gap-2 minBreakpoint-xs">
            {item.creator?._id === userId && item.state === "open" && (
              <button
                disabled={
                  item._id === isButtonDisabled && isButtonType === "delete"
                }
                className="btn btn-danger playChallange btn-sm"
                onClick={() => {
                  setIsButtonDisabled(item._id);
                  setIsButtonType("delete");
                }}
              >
                {item._id === isButtonDisabled && isButtonType === "delete" && (
                  <CircularProgress
                    style={{
                      width: "1.0rem",
                      height: "1.0rem",
                      verticalAlign: "middle",
                      color: "#fff",
                    }}
                  />
                )}{" "}
                Delete
              </button>
            )}
            {item.state === "open" && item.creator?._id !== userId && (
              <button
                className="btn btn-primary playChallange btn-sm"
                onClick={() => {
                  setIsButtonDisabled(item);
                  setIsButtonType("playChallange");
                }}
                disabled={item._id === isButtonDisabled && playGameLoading}
              >
                {item._id === isButtonDisabled && playGameLoading && (
                  <CircularProgress
                    style={{
                      width: "1.0rem",
                      height: "1.0rem",
                      verticalAlign: "middle",
                      color: "#fff",
                    }}
                  />
                )}{" "}
                Play
              </button>
            )}
            {item.player?._id === userId && item.state === "requested" && (
              <button
                disabled={RequestedLoading}
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setIsButtonDisabled(item._id);
                  setIsButtonType("requested");
                }}
              >
                {item._id === isButtonDisabled && RequestedLoading && (
                  <CircularProgress
                    style={{
                      width: "1.0rem",
                      height: "1.0rem",
                      verticalAlign: "middle",
                      color: "#fff",
                    }}
                  />
                )}{" "}
                Requested
              </button>
            )}

            {item.creator?._id === userId && item.state === "requested" && (
              <div className="hstack gap-2 minBreakpoint-xs">
                <button
                  disabled={startGameLoading}
                  className="checkCancelRequest btn btn-success viewChallange btn-sm"
                  onClick={() => {
                    setIsButtonDisabled(item._id);
                    setIsButtonType("viewChallange");
                  }}
                >
                  {startGameLoading && (
                    <CircularProgress
                      style={{
                        width: "1.0rem",
                        height: "1.0rem",
                        verticalAlign: "middle",
                        color: "#fff",
                      }}
                    />
                  )}{" "}
                  Play
                </button>
                <button
                  disabled={cancelChallengeCreator}
                  className="btn btn-danger cancelRequest btn-sm"
                  onClick={() => {
                    setIsButtonDisabled(item._id);
                    setIsButtonType("cancel");
                  }}
                >
                  {cancelChallengeCreator && (
                    <CircularProgress
                      style={{
                        width: "1.0rem",
                        height: "1.0rem",
                        verticalAlign: "middle",
                        color: "#fff",
                      }}
                    />
                  )}{" "}
                  Cancel
                </button>
              </div>
            )}
            {item.player?._id === userId &&
              item.state === "playing" &&
              item.results.player.result === "" && (
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => {
                    viewGame(item._id);
                  }}
                >
                  view
                </button>
              )}
            {item.creator?._id === userId &&
              item.state === "playing" &&
              item.results.creator.result === "" && (
                <button
                  onClick={() => {
                    viewGame(item._id);
                  }}
                  className="btn btn-success btn-sm"
                >
                  view
                </button>
              )}
            {item.creator?._id === userId &&
              item.state === "playing" &&
              item.results.creator.result !== "" && (
                <button
                  onClick={() => {
                    viewHold(item);
                  }}
                  className="btn btn-success btn-sm"
                >
                  view
                </button>
              )}
            {item.player?._id === userId &&
              item.state === "playing" &&
              item.results.player.result !== "" && (
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
  );
};

export default ButtonChallenges;
