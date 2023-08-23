import Cookies from "js-cookie";
import "../styles/style.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CDN_URL } from "../../../config";
import Offcanvas from "react-bootstrap/Offcanvas";
import AppLayout from "../layout/AppLayout";

export default function LandingPage() {
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.loginReducer);
  const [f_open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <AppLayout>
      <div className="partials">
        <Offcanvas
          show={f_open}
          onHide={handleClose}
          placement={"bottom"}
          className={"h-50"}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>How To Play Games & Earn?</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="iframe-container">
              <iframe
                src="https://www.youtube.com/embed/2IcRDUUsjBg"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      <div className="col-12 col-sm-10 col-md-7 col-lg-12 mx-auto p-3 g-0">
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
                className="mw-100"
                style={{ maxHeight: "448px" }}
                src="https://ludo3.s3.ap-south-1.amazonaws.com/landingNew.webp"
                alt="landing"
              />
            </picture>
          </div>
        ) : (
          <div>
            <div className="p-0 container-fluid">
              <div
                role="alert"
                className="fade d-flex align-items-center justify-content-between alert alert-warning show text-start"
                style={{ fontSize: "0.9rem" }}
              >
                <span>
                  <b>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="20"
                      height="20"
                      fill="red"
                    >
                      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                    </svg>{" "}
                    &nbsp;&nbsp;Notice:- वेबसाइट में तकनिकी समस्या के कारन कल
                    रात से कुछ समस्याएं चल रही है ! इसके चलते आप चिंता न करें
                    आपका पैसा पूरी तरीके से सेफ है हम इस समस्या का समाधान कर रहे
                    है। इस बिच यदि आपको कोई समस्या आती है तो कृपया धैर्य रख कर
                    उसके सही होने का इंतज़ार करें । 🙏
                  </b>
                </span>
              </div>
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
                  <span className="text-capitalize">guide</span>
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
              <div
                className="position-fixed"
                style={{ bottom: "50px", zIndex: "10", left: "400px" }}
              >
                <Link
                  className="bg-light border shadow rounded-circle d-flex align-items-center justify-content-center text-dark"
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
            </div>
          </div>
        )}
        {!data.isLoggedIn && (
          <div
            className="text-center text-muted"
            style={{ marginTop: "1rem", paddingBottom: "90px" }}
          >
            <i>
              This Game involves an element of financial risk and may be
              addictive. Please Play responsibly and at your own risk.
            </i>
          </div>
        )}
      </div>
      {!data.isLoggedIn && (
        <div
          className="position-fixed d-flex align-items-center justify-content-center hstack gap-3 minBreakpoint-xs mx-auto mx-lg-0"
          style={{
            zIndex: "10",
            bottom: "30px",
            left: "20px",
            right: "20px",
            maxWidth: "440px",
          }}
        >
          <div className="d-grid flex-grow-1">
            <button
              onClick={() =>
                data.isLoggedIn ? navigate("/play") : navigate("/login")
              }
              className="btn btn-dark btn-lg fw-semibold py-3"
            >
              Play Now
            </button>
          </div>
          <Link
            className="bg-light border shadow rounded-circle d-flex align-items-center justify-content-center text-dark"
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
    </AppLayout>
  );
}
