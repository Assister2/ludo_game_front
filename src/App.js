import React, { Fragment, useEffect, useState, Suspense } from "react";
import { Provider, useSelector } from "react-redux";
import "./App.css";
import socketNew from "./socker";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./redux";
import Cookies from "js-cookie";
import { requestForToken2, requestForToken } from "./firebase";

// Lazy-loaded components
const Header = React.lazy(() =>
  import("./modules/common/components/appbar/AppBar")
);

const Routes = React.lazy(() => import("./routing/Routes"));

function App() {
  if (Cookies.get("userId") === undefined) {
    socketNew.disconnect();
  }
  requestForToken2();
  requestForToken();

  return (
    <Provider store={store}>
      <div className="App">
        <ToastContainer position="bottom-right" autoClose={3000} />
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <Fragment>
              <Routes />
            </Fragment>
          </Suspense>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
