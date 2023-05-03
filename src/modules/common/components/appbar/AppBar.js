import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import { CDN_URL } from "../../../../config";
import {Guide} from "./components/Guide";
import SideBar from "./components/SideBar";
import { Link, useHref } from "react-router-dom";
import Cookies from "js-cookie"
import {withRouter} from 'react-router-dom';

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
  const [f_open_menu, setOpenMenu] = useState(false);
  const [show_comm, setShowComm] = useState(false);
  const path = useHref(window?.location);

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
            <Link to="/">
            <img
              src={`${CDN_URL}/avatar/logo.png`}
              alt="logo"
              height="50"
            />
            </Link>
            <div style={{ marginLeft: "auto", marginRight: "10px" }}>
              {getOptions(false)}
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </React.Fragment>
  );
}
