import React, { useState, Fragment, useEffect, Suspense } from "react";
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
import CircularLoading from "./modules/common/components/atoms/CircularLoading";
// import DailogModal from "./modules/common/components/atoms/DailogModal";
export const centerDivStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};
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
    <Suspense
      fallback={
        <div style={centerDivStyle}>
          <CircularLoading width={64} height={64} color="#7E6FE6" />
        </div>
      }
    >
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
    </Suspense>
  );
}

export default App;
