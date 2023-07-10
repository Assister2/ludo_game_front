import React from "react";

const OtherPlayingChallenges = ({ item }) => {
  return (
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
            <span className="fw-semibold text-truncate text-end">
              {item?.creator?.username.slice(0, 5)}...
            </span>
          </div>
          <div className="d-flex flex-column align-items-center vstack gap-2 minBreakpoint-xs">
            <span>
              <em>
                <img
                  src="https://ludoplayers.com/static/media/vs.c153e22fa9dc9f58742d.webp"
                  alt="verses-icon"
                  width="24"
                />
              </em>
            </span>
            <span className="text-success fw-bold text-center">
              Rs{item.amount}
            </span>
          </div>
          <div className="d-flex flex-column align-items-end vstack gap-2 minBreakpoint-xs">
            <div
              className="bg-dark rounded-circle"
              style={{ height: "24px", width: "24px" }}
            >
              <img src="https://ludo3.s3.ap-south-1.amazonaws.com/avtar/2.svg"></img>
            </div>
            <span className="fw-semibold text-truncate text-end">
              {item.player?.username.slice(0, 5)}...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherPlayingChallenges;
