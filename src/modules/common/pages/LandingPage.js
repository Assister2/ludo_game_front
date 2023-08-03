import { SwipeableDrawer } from "@material-ui/core";
import Cookies from "js-cookie";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CDN_URL } from "../../../config";

export default function LandingPage() {
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.loginReducer);
  const [f_open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div className="partials">
        <SwipeableDrawer
          PaperProps={{
            style: { width: "100vw", minHeight: "50vh" },
          }}
          anchor="bottom"
          open={f_open}
          onClose={handleClose}
        >
          <div>
            <div
              style={{ padding: "1rem" }}
              className="bg-dark offcanvas-header"
            >
              <div className="text-white fw-bold offcanvas-title h5">
                How To Play Games & Earn?
              </div>
              <button
                onClick={handleClose}
                type="button"
                className="btn-close btn-close-white"
                aria-label="Close"
              ></button>
            </div>
          </div>
        </SwipeableDrawer>
      </div>
      <div
        style={{}}
        className="col-12 col-sm-12 col-md-6 col-lg-4 mx-auto p-3 g-0"
      >
        {!data.isLoggedIn ? (
          <div>
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet="https://ludo3.s3.ap-south-1.amazonaws.com/landingNew.webp"
              />
              <source
                media="(min-width: 769px)"
                srcSet="https://ludo3.s3.ap-south-1.amazonaws.com/landingNew.webp"
              />
              <img
                style={{ maxWidth: "100%", height: "auto" }}
                src="https://ludo3.s3.ap-south-1.amazonaws.com/landingNew.webp"
                alt="landing"
              />
            </picture>
          </div>
        ) : (
          <div>
            <div className="p-0 container-fluid">
              .
              <div className="d-flex align-items-center justify-content-between mt-3 mb-4">
                <h1 className="text-capitalize text-start">games</h1>
                <button
                  onClick={() => {
                    setOpen(true);
                  }}
                  type="button"
                  className="d-flex align-items-center btn btn-outline-primary btn-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    className="me-1"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                  </svg>
                  <span className="text-capitalize">####</span>
                </button>
              </div>
              <div className="mb-3 gx-3 row">
                <div className="col">
                  <Link className="text-decoration-none text-black" to="/play">
                    <div>
                      <picture>
                        <source
                          media="(min-width: 1024px)"
                          srcSet="https://ludo3.s3.ap-south-1.amazonaws.com/ludo1.webp"
                          type="image/webp" // Specify the image type for WebP format
                        />
                        <source
                          media="(min-width: 768px)"
                          srcSet="https://ludo3.s3.ap-south-1.amazonaws.com/ludo1.webp"
                          type="image/webp" // Specify the image type for WebP format
                        />
                        <img
                          src="https://ludo3.s3.ap-south-1.amazonaws.com/ludo1.webp" // Provide a fallback image for browsers that don't support <picture>
                          className="rounded-3"
                          style={{
                            width: "100%",
                            cursor: "pointer",
                            height: "auto",
                          }}
                          alt="landing"
                        />
                      </picture>
                    </div>
                  </Link>
                </div>

                <div className="col">
                  <div
                    className="position-relative"
                    style={{ cursor: "not-allowed" }}
                  >
                    <div>
                      <picture>
                        <source
                          media="(min-width: 1024px)"
                          srcSet="https://ludo3.s3.ap-south-1.amazonaws.com/ludo2.webp"
                          type="image/webp" // Specify the image type for WebP format
                        />
                        <source
                          media="(min-width: 768px)"
                          srcSet="https://ludo3.s3.ap-south-1.amazonaws.com/ludo2.webp"
                          type="image/webp" // Specify the image type for WebP format
                        />
                        <img
                          src="https://ludo3.s3.ap-south-1.amazonaws.com/ludo2.webp" // Provide a fallback image for browsers that don't support <picture>
                          alt="ludo classic"
                          className="rounded-3"
                          style={{
                            width: "100%",
                            cursor: "pointer", // Change cursor style to "pointer"
                            height: "auto",
                          }}
                        />
                      </picture>
                    </div>
                    <div className="position-absolute top-0 start-0 end-0 bottom-0 bg-black opacity-25"></div>
                    <div
                      className="position-absolute top-0 start-0 end-0 bottom-0 d-flex align-items-start justify-content-end overflow-hidden"
                      style={{ zIndex: 10 }}
                    >
                      <span
                        className="text-dark fw-bold text-capitalize bg-warning px-3"
                        style={{
                          fontSize: "0.8rem",
                          transform:
                            "rotate(30deg) translateX(35px) translateY(0px)",
                          width: "200px",
                        }}
                      >
                        coming soon
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" gx-3 row">
                <div className="col">
                  <div
                    className="position-relative"
                    style={{ cursor: "not-allowed" }}
                  >
                    <div>
                      <picture>
                        <source
                          media="(min-width: 1024px)"
                          srcSet="https://ludo3.s3.ap-south-1.amazonaws.com/ludo3.webp"
                          type="image/webp" // Specify the image type for WebP format
                        />
                        <source
                          media="(min-width: 768px)"
                          srcSet="https://ludo3.s3.ap-south-1.amazonaws.com/ludo3.webp"
                          type="image/webp" // Specify the image type for WebP format
                        />
                        <img
                          src="https://ludo3.s3.ap-south-1.amazonaws.com/ludo3.webp" // Provide a fallback image for browsers that don't support <picture>
                          alt="ludo classic"
                          className="rounded-3"
                          style={{
                            width: "100%",
                            cursor: "pointer", // Change cursor style to "pointer"
                            height: "auto",
                          }}
                        />
                      </picture>
                    </div>
                    <div className="position-absolute top-0 start-0 end-0 bottom-0 bg-black opacity-25"></div>
                    <div
                      className="position-absolute top-0 start-0 end-0 bottom-0 d-flex align-items-start justify-content-end overflow-hidden"
                      style={{ zIndex: 10 }}
                    >
                      <span
                        className="text-dark fw-bold text-capitalize bg-warning px-3"
                        style={{
                          fontSize: "0.8rem",
                          transform:
                            "rotate(30deg) translateX(35px) translateY(0px)",
                          width: "200px",
                        }}
                      >
                        coming soon
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div
                    className="position-relative"
                    style={{ cursor: "not-allowed" }}
                  >
                    <div>
                      <picture>
                        <img
                          src="https://ludo3.s3.ap-south-1.amazonaws.com/ludo4.webp"
                          alt="ludo classic"
                          className="rounded-3"
                          style={{
                            width: "100%",
                            cursor: "not-allowed",
                            height: "auto",
                          }}
                        />
                      </picture>
                    </div>
                    <div className="position-absolute top-0 start-0 end-0 bottom-0 bg-black opacity-25"></div>
                    <div
                      className="position-absolute top-0 start-0 end-0 bottom-0 d-flex align-items-start justify-content-end overflow-hidden"
                      style={{ zIndex: 10 }}
                    >
                      <span
                        className="text-dark fw-bold text-capitalize bg-warning px-3"
                        style={{
                          fontSize: "0.8rem",
                          transform:
                            "rotate(30deg) translateX(35px) translateY(0px)",
                          width: "200px",
                        }}
                      >
                        coming soon
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        )}
        {!data.isLoggedIn && (
          <div className="text-center text-muted" style={{ marginTop: "1rem" }}>
            <i>
              This Game involves an element of financial risk and may be
              addictive. Please Play responsibly and at your own risk.
            </i>
          </div>
        )}
      </div>
      {!data.isLoggedIn && (
        <div
          className="position-fixed d-flex align-items-center justify-content-center hstack gap-3 minBreakpoint-xs"
          style={{ zIndex: "10", bottom: "30px", left: "20px", right: "20px" }}
        >
          <div className="d-grid flex-grow-1">
            <button
              onClick={() =>
                data.isLoggedIn ? navigate("/play") : navigate("/login")
              }
              style={{
                padding: "14px 0px",
                fontSize: "1.3rem",
              }}
              className="btn btn-dark btn-lg fw-semibold"
            >
              Play Now
            </button>
            <Link
              className="bg-light border shadow rounded-circle d-flex align-items-center justify-content-center position-fixed text-dark"
              to="/support"
              style={{
                height: "60px",
                width: "60px",
                zIndex: 10,
                bottom: "100px",
                right: "30px",
              }}
            >
              <img
                src="https://ludo-players.s3.ap-south-1.amazonaws.com/cdn/lp/icons/liveChat.webp"
                height="36px"
                alt="support icon"
              />
            </Link>
          </div>
          {data.isLoggedIn && (
            <a
              href="whatsapp://send/?phone=918808344653&amp;text=I+have+an+issue.+Please+Help+Me&amp;app_absent=0"
              className="bg-success shadow-lg rounded-circle d-flex align-items-center justify-content-center text-white ml-auto"
              style={{ height: "60px", width: "60px" }}
            >
              <img src={`${CDN_URL}svgs/whatsapp.svg`} alt="whatsapp" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
