import React, { useEffect, useState } from "react";
import "./style.css";
import { CDN_URL } from "../../../../config";
import { Guide } from "./components/Guide";

import SideBar from "./components/SideBar";
import { Link, useHref } from "react-router-dom";
import { useSelector } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function Header(props) {
  const [f_open, setOpen] = useState(false);
  // const userId = Cookies.get("userId");
  const [f_open_menu, setOpenMenu] = useState(false);
  const [show_comm, setShowComm] = useState(false);
  const handleClose = () => setOpen(false);

  const path = useHref(window?.location);
  const { data } = useSelector((state) => state.loginReducer);

  function showCommission() {
    return ["/"].includes(window.location.pathname);
  }

  function getOptions(isAuth) {
    if (isAuth) {
      return [];
    }
    return [<Guide />];
  }

  useEffect(() => {
    setShowComm(showCommission());
  }, [path]);

  return (
    <React.Fragment>
      <div className="partials">
        <SideBar f_open={f_open_menu} handleClose={() => setOpenMenu(false)} />
      </div>
      <div
        className="col-12"
        style={{ position: "sticky", top: "0px", zIndex: "1000" }}
      >
        {show_comm && (
          <div className="bg-danger py-2 text-white w-100">
            Commission: 3% ◉ Referral: 2% For All Games
          </div>
        )}
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
        <div
          className="w-100 bg-white shadow-sm text-white py-2 pe-2 ps-2 d-flex d-sm-flex align-items-center align-items-sm-center justify-content-between justify-content-sm-between"
          style={{ zIndex: "100", height: "70px" }}
        >
          <div>
            <button
              onClick={() => setOpenMenu(true)}
              type="button"
              className="bg-white border-0 btn btn-light"
            >
              <img src={`${CDN_URL}svgs/ham.svg`} alt="Menu" />
            </button>
            <Link
              className="text-decoration-none text-white fw-semibold fs-4"
              to="/"
            >
              <span className="text-white">
                <img
                  src="https://ludo3.s3.ap-south-1.amazonaws.com/logo.webp"
                  alt="logo"
                  height="50"
                />
              </span>
            </Link>
          </div>
          {data?.isLoggedIn ? (
            <Guide></Guide>
          ) : (
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
                className="me-2"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
              </svg>
              <span className="text-capitalize">guide</span>
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
