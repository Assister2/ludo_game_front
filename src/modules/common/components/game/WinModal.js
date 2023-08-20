import React from "react";
import CircularLoading from "../atoms/CircularLoading";

export default function WinModal({
  handleClose,
  handleImageChange,
  handleWinChallenge,
  wonModal,
  isImageUploaded,
  postResultLoading,
  IsLoading,
  image,
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`h-auto offcanvas offcanvas-bottom ${
        wonModal ? "show" : "hide"
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
        <div className="pb-3 d-flex flex-column align-items-stretch">
          <div className="vstack gap-3 minBreakpoint-xs">
            <h1 className="text-capitalize">Upload Result</h1>
            {isImageUploaded && (
              <>
                <img
                  width={100}
                  height={100}
                  src={image}
                  alt="Selected Image"
                />
              </>
            )}
            <label htmlFor="upload-btn" className="btn btn-primary btn-lg">
              {isImageUploaded ? "Replace Image" : "Upload Image"}
            </label>
            <input
              id="upload-btn"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            <button
              type="button"
              disabled={postResultLoading || !isImageUploaded}
              className="btn btn-success btn-lg"
              onClick={handleWinChallenge}
            >
              {" "}
              {postResultLoading || IsLoading ? (
                <CircularLoading
                  height={"1.5rem"}
                  width={"1.5rem"}
                  color={"white"}
                />
              ) : (
                "Post Result"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
