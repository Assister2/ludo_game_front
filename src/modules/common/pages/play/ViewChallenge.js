import React from "react";
import { CDN_URL } from "../../../../config";

const ViewChallenge = ({ holdModal, holdChallenge, userId, setHoldModal }) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`h-50 offcanvas offcanvas-bottom ${holdModal ? "show" : ""}`}
      tabIndex="-1"
      style={{ visibility: "visible" }}
    >
      <div className="offcanvas-header">
        <div
          className="text-capitalize d-flex flex-column align-items-start justify-content-start offcanvas-title h5"
          style={{ fontSize: "1.3rem" }}
        >
          <div>
            <span style={{ fontWeight: "bold" }}>room code:&nbsp;</span>
            <span>{holdChallenge?.roomCode}</span>
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>Your Result:&nbsp;</span>
            <span>
              I{" "}
              {holdChallenge?.creator?._id === userId
                ? holdChallenge?.results?.creator?.result
                : holdChallenge?.results?.player?.result}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setHoldModal(false);
          }}
          className="btn-close"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <div className="card">
          <div className="text-start card-body">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div
                  className="bg-dark rounded-circle me-2"
                  style={{ height: "24px", width: "24px" }}
                >
                  <img
                    src={`${CDN_URL}avatar/${holdChallenge?.player?.profileImage}`}
                    alt="avatar"
                  />
                </div>
                <span
                  className="fw-semibold text-truncate"
                  style={{ width: "80px" }}
                >
                  {holdChallenge?.player?.username}
                </span>
              </div>
              <div>
                <img
                  src="https://ludoplayers.com/static/media/vs.c153e22fa9dc9f58742d.webp"
                  height="40"
                  alt="vs"
                />
              </div>
              <div className="d-flex flex-row-reverse align-items-center">
                <div
                  className="bg-dark rounded-circle ms-2"
                  style={{ height: "24px", width: "24px" }}
                >
                  <img
                    src={`${CDN_URL}avatar/${holdChallenge?.creator?.profileImage}`}
                    alt="avatar"
                  />
                </div>
                <span
                  className=" fw-semibold text-truncate"
                  style={{ width: "80px" }}
                >
                  {holdChallenge?.creator?.username}
                </span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center pt-3">
              <span className="text-success fw-bold">
                ₹{holdChallenge?.amount}
              </span>
            </div>
          </div>
        </div>
        {/* <!-- <div className="mt-3 card">
                  <div className="text-start card-body">
                      <div className="d-flex justify-content-center align-items-center"><img
                          src="https://ludo-players.s3.ap-south-1.amazonaws.com/screenshots/2023-02-07-63e18a7064c26776827bf285-7976808042-player.jpeg"
                          alt="result-screenshoot" className="img-fluid" id="screenshoot-image"></div>
                  </div>
              </div> --> */}
        <hr />
        <p style={{ fontSize: "0.8rem" }}>
          Your Game Result is Successfully Posted. Please allow us 2-5 minutes
          to review &amp; update your game. If you have Posted Wrong Result or
          Screenshot, kindly&nbsp;
          <a href="/support">Contact Support</a>
        </p>
      </div>
    </div>
  );
};

export default ViewChallenge;
