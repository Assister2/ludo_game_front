import React from "react";
import CircularLoading from "../../components/atoms/CircularLoading";

export default function LostModal({
  handleClose,
  handleLooseChallenge,
  lostModal,
  isIlostClicked,
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`h-auto offcanvas offcanvas-bottom ${
        lostModal ? "show" : "hide"
      }`}
      tabIndex="-1"
      style={{ visibility: "visible" }}
    >
      <div className="offcanvas-header">
        <div className="offcanvas-title h5"></div>
        <button
          onClick={handleClose}
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
              onClick={handleLooseChallenge}
              className="text-capitalize btn btn-danger btn-lg"
            >
              {isIlostClicked ? (
                <CircularLoading
                  height={"1.5rem"}
                  width={"1.5rem"}
                  color={"white"}
                />
              ) : (
                "Yes, i lost"
              )}
            </button>
            <button
              onClick={handleClose}
              type="button"
              className="btn btn-outline-danger btn-lg"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
