import React from "react";

const OtherPlayingChallenges = ({ item, CDN_URL }) => {
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
                src={`${CDN_URL}avatar/${item.creator.profileImage}`}
                alt="avatar"
              />
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
              <img
                src={`${CDN_URL}avatar/${item.player.profileImage}`}
                alt="Avatar"
              />
            </div>
            <span className=" fw-semibold text-truncate text-end">
              {item.player?.username.slice(0, 5)}...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherPlayingChallenges;
