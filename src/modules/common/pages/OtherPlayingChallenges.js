import React from "react";

const OtherPlayingChallenges = ({ item, CDN_URL }) => {
  return (
    <div className="my-2 card">
      <div className="text-start card-body">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-start">
            <div
              className="bg-dark rounded-circle me-2"
              style={{ height: "24px", width: "24px" }}
            >
              <img
                src={`${CDN_URL}avatar/${item.creator.profileImage}`}
                alt="avatar"
              />
            </div>
            <span className=" fw-semibold text-truncate" style={{ width: "80px" }}>
              {item?.creator?.username.slice(0, 5)}...
            </span>
          </div>
          <div>
              <img
                src="	https://ludoplayers.com/static/media/vs.c153e22fa9dc9f58742d.webp"
                alt="verses-icon"
                height="40"
              />
          </div>
          <div className="d-flex flex-row-reverse align-items-end">
            <div
              className="bg-dark rounded-circle ms-2"
              style={{ height: "24px", width: "24px" }}
            >
              <img
                src={`${CDN_URL}avatar/${item.player.profileImage}`}
                alt="Avatar"
              />
            </div>
            <span className=" fw-semibold text-truncate" style={{ width: "80px" }}>
              {item.player?.username.slice(0, 5)}...
            </span>
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-center pt-3">
          <span class="text-success fw-bold">Rs {item.amount}</span>
        </div>
      </div>
    </div>
  );
};

export default OtherPlayingChallenges;
