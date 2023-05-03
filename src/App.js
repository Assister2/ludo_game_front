import React, { Fragment } from "react";
import {Provider} from "react-redux"
//setting up all the  css
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routing/Routes";
import Header from "./modules/common/components/appbar/AppBar";
import { Toaster } from "react-hot-toast";
import store from "./redux";

function App() {
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
