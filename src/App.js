import React, { Fragment, useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
//setting up all the  css
import "./App.css";
import socketNew from "./socker";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routing/Routes";
import Header from "./modules/common/components/appbar/AppBar";
import { Toaster } from "react-hot-toast";
import store from "./redux";

import Cookies from "js-cookie";

function App() {
  if (Cookies.get("userId") === undefined) {
    socketNew.disconnect();
  }

  return (
    <Provider store={store}>
      <div className="App">
        <Toaster
          gutter={1}
          position="bottom-center"
          containerStyle={{
            bottom: "10%",
          }}
          toastOptions={{ duration: 3000 }}
        />
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
