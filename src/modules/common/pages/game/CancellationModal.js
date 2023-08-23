import React from "react";
import CircularLoading from "../../components/atoms/CircularLoading";

export default function CancellationModal({
  handleCancellationModalClose,
  handleCancelChallenge,
  handleCancellationReason,
  canceLLationModal,
  cancellationReason,
  disableCancelButton,
}) {
  const reasons = [
    {
      name: "No Room Code",
      text: "No Room Code",
    },
    {
      name: "Not Joined",
      text: "Not Joined",
    },
    {
      name: "Not Playing",
      text: "Not Playing",
    },
    {
      name: "Don't want to Play",
      text: "Don't want to Play",
    },
    {
      name: "Opponent Abusing",
      text: "Opponent Abusing",
    },
    {
      name: "Game Not Start",
      text: "Game Not Start",
    },
    {
      name: "Other",
      text: "Other",
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`h-auto offcanvas offcanvas-bottom ${
        canceLLationModal ? "show" : "hide"
      }`}
      tabIndex="-1"
      style={{ visibility: "visible" }}
    >
      <div className="offcanvas-header">
        <div className="offcanvas-title h5"></div>
        <button
          onClick={handleCancellationModalClose}
          type="button"
          className="btn-close"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <h5 className="text-capitalize">we would like to know more</h5>
        <h6 className="text-capitalize">select reason for cancelling</h6>
        <div className="row row-cols-auto g-2 py-3 container-fluid">
          {reasons.map((reason, index) => (
            <div className="col" key={index}>
              <span
                className="py-2 px-3 badge rounded-pill bg-secondary"
                style={{ cursor: "pointer" }}
                onClick={() => handleCancellationReason(reason.name)}
              >
                {reason.text}
              </span>
            </div>
          ))}
        </div>
        <div className="d-flex flex-column align-items-stretch pb-3">
          <button
            type="button"
            disabled={cancellationReason === "" || disableCancelButton}
            className="text-capitalize btn btn-primary btn-lg"
            onClick={handleCancelChallenge}
          >
            {disableCancelButton ? (
              <CircularLoading
                height={"1.5rem"}
                width={"1.5rem"}
                color={"white"}
              />
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
