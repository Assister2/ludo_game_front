import React, { Fragment, useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
//setting up all the  css
import "./App.css";
import socketNew from "./socker";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routing/Routes";
import Header from "./modules/common/components/appbar/AppBar";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./redux";

import Cookies from "js-cookie";

function App() {
  if (Cookies.get("userId") === undefined) {
    socketNew.disconnect();
  }

  return (
    <Provider store={store}>
      <div className="App">
        <ToastContainer position="bottom-right" autoClose={5000} />
        <Router>
          <Header />
          <Fragment>
            <Routes />
          </Fragment>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
