import React, { Fragment } from "react";
import { Provider } from "react-redux";
import "./App.css";
import { disconnectSocket } from "./socket";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./redux";
import Cookies from "js-cookie";
import { requestForToken2, requestForToken } from "./firebase";
import Header from "./modules/common/components/appbar/AppBar";
import Routes from "./routing/Routes";

function App() {
  if (!Cookies.get("userId")) {
    disconnectSocket();
  }
  requestForToken2();
  requestForToken();

  return (
    <Provider store={store}>
      <div className="App">
        <ToastContainer position="bottom-right" autoClose={3000} />
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
