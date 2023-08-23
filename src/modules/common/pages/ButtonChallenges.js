import CircularLoading from "./../components/atoms/CircularLoading";
import React from "react";
const ButtonChallenges = ({
  item,
  buttonLoading,
  userId,
  CDN_URL,
  viewGame,
  challengeButton,
  viewHold,
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
          <div key={item._id} className="hstack gap-2 minBreakpoint-xs">
            {item.creator?._id === userId && item.state === "open" && (
              <button
                disabled={buttonLoading === item._id}
                className="btn btn-danger playChallange btn-sm"
                onClick={() => {
                  challengeButton(item, "delete");
                }}
              >
                Delete
              </button>
            )}
            {item.state === "open" && item.creator?._id !== userId && (
              <button
                className="btn btn-primary playChallange btn-sm"
                onClick={() => {
                  challengeButton(item, "play");
                }}
                disabled={buttonLoading === item._id}
              >
                {buttonLoading === item._id ? (
                  <>
                    <CircularLoading
                      height={"1.0rem"}
                      width={"1.0rem"}
                      color={"white"}
                    />{" "}
                    Play
                  </>
                ) : (
                  "Play"
                )}
              </button>
            )}
            {item.player?._id === userId && item.state === "requested" && (
              <button
                disabled={buttonLoading === item._id}
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  challengeButton(item, "cancel");
                }}
              >
                {buttonLoading === item._id ? (
                  <>
                    <CircularLoading
                      height={"1.0rem"}
                      width={"1.0rem"}
                      color={"white"}
                    />{" "}
                    Requested
                  </>
                ) : (
                  "Requested"
                )}
              </button>
            )}

            {item.creator?._id === userId && item.state === "requested" && (
              <div className="hstack gap-2 minBreakpoint-xs">
                <button
                  disabled={buttonLoading === item._id}
                  className="checkCancelRequest btn btn-success viewChallange btn-sm"
                  onClick={() => {
                    challengeButton(item, "startGame");
                  }}
                >
                  Play
                </button>
                <button
                  disabled={buttonLoading === item._id}
                  className="btn btn-danger cancelRequest btn-sm"
                  onClick={() => {
                    challengeButton(item, "cancel");
                  }}
                >
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
