import React, { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
// import Header from "./modules/common/components/appbar/AppBar";
import Routes from "./routing/Routes";
import { automaticLogoutRequest } from "./redux/actions/auth";
import store from "./redux";
// import DailogModal from "./modules/common/components/atoms/DailogModal";
function App() {
  const dispatch = useDispatch();
  const checkCookies = (isLoggedIn) => {
    if (isLoggedIn) {
      if (!Cookies.get("userId") || !Cookies.get("token"))
        dispatch(automaticLogoutRequest());
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const { data } = store.getState().loginReducer;
      checkCookies(data.isLoggedIn);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App" style={{ height: "100vh" }}>
      {/* <DailogModal/> */}
      <ToastContainer position="bottom-right" autoClose={3000} />
      <Router>
        {/* <Header /> */}
        <Fragment>
          <Routes />
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
