import React from "react";
import { CDN_URL, AVATAR } from "../../../../../config";
import Cookies from "js-cookie";
import { BsWallet2, BsClockHistory, BsGift } from "react-icons/bs";
import { HiUsers } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function SideBar({ f_open, handleClose }) {
  const userData = useSelector((state) => state.user);
  const { data } = useSelector((state) => state.loginReducer);
  let isLoggedIn = Cookies.get("isLoggedIn");
  let fullName = Cookies.get("fullName");

  return (
    <>
      <Offcanvas show={f_open} onHide={handleClose} style={{ zIndex: "1200" }}>
        <Offcanvas.Header className="bg-dark">
          <Offcanvas.Title className="text-white"> Goti King</Offcanvas.Title>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </Offcanvas.Header>
        <div className="d-flex flex-column align-items-stretch justify-content-start p-0 offcanvas-body">
          <div className="d-flex align-items-center justify-content-between p-4">
            <div className="fs-1 fw-bold text-start d-flex align-items-center justify-content-start">
              <div className="hstack gap-2 minBreakpoint-xs">
                <div className="m-0 me-1 d-flex align-items-center justify-content-start">
                  <p className="m-0">Hey,</p>
                  <p
                    className="text-truncate m-0 me-2"
                    style={{ maxWidth: "125px" }}
                  >
                    &nbsp;
                    {data.isLoggedIn ? fullName : ""}
                  </p>
                  <img
                    src="https://ludo3.s3.ap-south-1.amazonaws.com/hello.a512d06e9ef9c85276f6.webp"
                    alt="hello icon"
                    width="36px"
                  />
                </div>
              </div>
            </div>
            {data.isLoggedIn && (
              <div>
                <a href="/profile">
                  <div
                    className="rounded-circle bg-dark"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <img
                      src={`${AVATAR}${userData?.data?.profileImage}`}
                      alt="avatar"
                    />
                  </div>
                </a>
              </div>
            )}
          </div>
          <div className=" d-flex flex-column align-items-stretch justify-content-start">
            {data.isLoggedIn ? (
              <>
                <Link
                  className="text-start text-decoration-none bg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
                  to={`/${data.isLoggedIn ? "play" : "login"}`}
                  onClick={() => handleClose()}
                >
                  <div className="d-flex align-items-center justify-content-start">
                    <div className="hstack gap-3 minBreakpoint-xs">
                      <img
                        src="https://ludoplayers.com/static/media/play.2f22f88bac8acca85f6a.webp"
                        height="36px"
                        alt="play"
                      />
                      <p className="p-0 m-0 text-capitalize">play</p>
                    </div>
                  </div>
                  <img
                    style={{ width: "1.4rem" }}
                    src={`${CDN_URL}svgs/arrow.svg`}
                    height="36px"
                    alt="arrow"
                  />
                </Link>
                <Link
                  className="text-start text-decoration-none bg-white p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
                  to="/wallet"
                  onClick={() => handleClose()}
                >
                  <div className="d-flex align-items-center justify-content-start">
                    <div className="hstack gap-3 minBreakpoint-xs">
                      {/* <   <img
                    src="https://ludoplayers.com/static/media/play.2f22f88bac8acca85f6a.webp"
                    height="36px"
                    alt="play"
                  />> */}
                      <BsWallet2 />
                      <p className="p-0 m-0 text-capitalize">wallet</p>
                    </div>
                  </div>
                  <img
                    style={{ width: "1.4rem" }}
                    src={`${CDN_URL}svgs/arrow.svg`}
                    height="36px"
                    alt="arrow"
                  />
                </Link>

                <Link
                  className="text-start text-decoration-none bg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
                  to="/history"
                  onClick={() => handleClose()}
                >
                  <div className="d-flex align-items-center justify-content-start">
                    <div className="hstack gap-3 minBreakpoint-xs">
                      <BsClockHistory />
                      <p className="p-0 m-0 text-capitalize">History</p>
                    </div>
                  </div>
                  <img
                    style={{ width: "1.4rem" }}
                    src={`${CDN_URL}svgs/arrow.svg`}
                    height="36px"
                    alt="arrow"
                  />
                </Link>
                <Link
                  className="text-start text-decoration-none bg-white p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
                  to="/profile"
                  onClick={() => handleClose()}
                >
                  <div className="d-flex align-items-center justify-content-start">
                    <div className="hstack gap-3 minBreakpoint-xs">
                      <HiUsers />
                      <p className="p-0 m-0 text-capitalize">Profile</p>
                    </div>
                  </div>
                  <img
                    style={{ width: "1.4rem" }}
                    src={`${CDN_URL}svgs/arrow.svg`}
                    height="36px"
                    alt="arrow"
                  />
                </Link>
                <Link
                  className="text-start text-decoration-none bg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
                  to="/referal"
                  onClick={() => handleClose()}
                >
                  <div className="d-flex align-items-center justify-content-start">
                    <div className="hstack gap-3 minBreakpoint-xs">
                      <BsGift />
                      <p className="p-0 m-0 text-capitalize">Refer & Earn</p>
                    </div>
                  </div>
                  <img
                    style={{ width: "1.4rem" }}
                    src={`${CDN_URL}svgs/arrow.svg`}
                    height="36px"
                    alt="arrow"
                  />
                </Link>
                <Link
                  className="text-start text-decoration-none bg-white p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
                  to="/support"
                  onClick={() => handleClose()}
                >
                  <div className="d-flex align-items-center justify-content-start">
                    <div className="hstack gap-3 minBreakpoint-xs">
                      <img
                        src="https://ludo3.s3.ap-south-1.amazonaws.com/liveChatOffcanvas.4db8ac024d1cc6d424a3.webp"
                        height="36px"
                        alt="support icon"
                      />
                      <p className="p-0 m-0 text-capitalize">support</p>
                    </div>
                  </div>
                  <img
                    style={{ width: "1.4rem" }}
                    src={`${CDN_URL}svgs/arrow.svg`}
                    height="36px"
                    alt="arrow"
                  />
                </Link>

                <Link
                  className="text-start text-decoration-none  bg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
                  to="/legal"
                  onClick={() => handleClose()}
                >
                  <div className="d-flex align-items-center justify-content-start">
                    <div className="hstack gap-3 minBreakpoint-xs">
                      <img
                        style={{ width: "2rem" }}
                        src={
                          "https://ludo3.s3.ap-south-1.amazonaws.com/legal.svg"
                        }
                        height="36px"
                        alt="support icon"
                      />
                      <p className="p-0 m-0 text-capitalize">legal terms</p>
                    </div>
                  </div>
                  <img
                    style={{ width: "1.4rem" }}
                    src={`${CDN_URL}svgs/arrow.svg`}
                    height="36px"
                    alt="arrow"
                  />
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="text-start text-decoration-none bg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
                  to={`/${data.isLoggedIn ? "play" : "login"}`}
                  onClick={() => handleClose()}
                >
                  <div className="d-flex align-items-center justify-content-start">
                    <div className="hstack gap-3 minBreakpoint-xs">
                      <img
                        src="https://ludoplayers.com/static/media/play.2f22f88bac8acca85f6a.webp"
                        height="36px"
                        alt="play"
                      />
                      <p className="p-0 m-0 text-capitalize">play</p>
                    </div>
                  </div>
                  <img
                    style={{ width: "1.4rem" }}
                    src={`${CDN_URL}svgs/arrow.svg`}
                    height="36px"
                    alt="arrow"
                  />
                </Link>
                <Link
                  className="text-start text-decoration-none bg-white p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
                  to="/register"
                  onClick={() => handleClose()}
                >
                  <div className="d-flex align-items-center justify-content-start">
                    <div className="hstack gap-3 minBreakpoint-xs">
                      <img
                        src="https://ludoplayers.com/static/media/play.2f22f88bac8acca85f6a.webp"
                        height="36px"
                        alt="play"
                      />
                      <p className="p-0 m-0 text-capitalize">register</p>
                    </div>
                  </div>
                  <img
                    style={{ width: "1.4rem" }}
                    src={`${CDN_URL}svgs/arrow.svg`}
                    height="36px"
                    alt="arrow"
                  />
                </Link>

                <Link
                  className="text-start text-decoration-none bg-white p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
                  to="/support"
                  onClick={() => handleClose()}
                >
                  <div className="d-flex align-items-center justify-content-start">
                    <div className="hstack gap-3 minBreakpoint-xs">
                      <img
                        src="https://ludoplayers.com/static/media/liveChatOffcanvas.4db8ac024d1cc6d424a3.webp"
                        height="36px"
                        alt="support icon"
                      />
                      <p className="p-0 m-0 text-capitalize">support</p>
                    </div>
                  </div>
                  <img
                    style={{ width: "1.4rem" }}
                    src={`${CDN_URL}svgs/arrow.svg`}
                    height="36px"
                    alt="arrow"
                  />
                </Link>

                <Link
                  className="text-start text-decoration-none  bg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
                  to="/legal"
                  onClick={() => handleClose()}
                >
                  <div className="d-flex align-items-center justify-content-start">
                    <div className="hstack gap-3 minBreakpoint-xs">
                      <img
                        style={{ width: "2rem" }}
                        src={`${CDN_URL}svgs/legal.svg`}
                        height="36px"
                        alt="support icon"
                      />
                      <p className="p-0 m-0 text-capitalize">legal terms</p>
                    </div>
                  </div>
                  <img
                    style={{ width: "1.4rem" }}
                    src={`${CDN_URL}svgs/arrow.svg`}
                    height="36px"
                    alt="arrow"
                  />
                </Link>
              </>
            )}
          </div>
        </div>
      </Offcanvas>
    </>
  );
}
