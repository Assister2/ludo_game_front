import React, { useEffect, useState } from "react";
import { SwipeableDrawer } from "@material-ui/core";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BsWalletFill } from "react-icons/bs";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import { CDN_URL } from "../../../../config";
import { Guide } from "./components/Guide";
// import TwentyMinuteCountdown from "../components/appbar/TwentyMinuteCountdown";

import SideBar from "./components/SideBar";
import { Link, useHref } from "react-router-dom";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

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
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          position="sticky"
          style={{ background: "white", borderBottom: "1px solid lightgray" }}
          elevation={0}
        >
          {show_comm && (
            <div class="bg-danger py-2 text-white w-100">
              Commission: 3% ◉ Referral: 2% For All Games
            </div>
          )}
          <Toolbar style={{ padding: "4px" }}>
            <button
              onClick={() => setOpenMenu(true)}
              type="button"
              class="bg-white border-0 btn btn-light"
            >
              <img src={`${CDN_URL}svgs/ham.svg`} alt="Menu" />
            </button>
            <div>
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
                      className="btn-close"
                      aria-label="Close"
                    ></button>
                  </div>
                </div>
              </SwipeableDrawer>
            </div>{" "}
            <Link
              className="text-decoration-none text-white fw-semibold fs-4"
              to="/"
            >
              <span className="text-white">
                <img
                  src="https://ludo3.s3.ap-south-1.amazonaws.com/logo.webp"
                  alt="logo"
                  height="40"
                  width="40"
                />
              </span>
            </Link>
            <div style={{ marginLeft: "auto", marginRight: "10px" }}>
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
                    class="me-1"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                  </svg>
                  <span class="text-capitalize">guide</span>
                </button>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </React.Fragment>
  );
}
