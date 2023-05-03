//importing librarys and stuffs
import { Switch, Route, HashRouter, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import firebase from "firebase";

//setting up all the  css
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

//importing components
import LandingPage from "./components/landingPage";
import Header from "./components/header";
import Login from "./components/login";
import Register from "./components/register.jsx";
import Forgot from "./components/forgot.jsx";
import Play from "./components/play";
import Otp from "./components/otp";
import Term from "./components/term";
import Help from "./components/help";
import getHeader from "./components/session";
import { API_URL } from "./components/url";
import Refer from "./components/refer";
import RecoverPassword from "./components/recoverpassword";
import Closed from "./components/closed";
import Buy from "./pages/buy";
import Sell from "./pages/sell";
import Setting from "./pages/setting";
import ChangePassword from "./pages/changepassword";
import HistoryComponent from "./pages/history";
import Room from "./pages/room";
import { useLayoutEffect } from "react";

function App() {
  //state of some components rendering
  const [headerEnabled, setHeaderEnabled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  //states the are received from the api
  const [user, setUser] = useState({});

  //siteStatus state
  const [siteStatus, setSiteStaus] = useState({
    playPage: true,
    buyChips: true,
    sellChips: true,
    registerPage: true,
  });

  //normal useEffect

  useEffect(() => {
    //firebase shits
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
      apiKey: "AIzaSyDmW4KdeyqswFEOEkA_BxKXSqMH9MHQkLA",
      authDomain: "push-a9188.firebaseapp.com",
      projectId: "push-a9188",
      storageBucket: "push-a9188.appspot.com",
      messagingSenderId: "969903150706",
      appId: "1:969903150706:web:8f88b536999f83550894eb",
      measurementId: "G-HTQX43VPR4",
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebase.analytics();

    (async () => {
      const response = await fetch(`${API_URL}/site/status`);
      const responseBody = await response.json();
      //get page status

      setSiteStaus(responseBody);
      console.log(responseBody);
    })();
  }, []);

  //get the user if its loggedIn
  useEffect(() => {
    if (!loggedIn) {
      return;
    }
    (async () => {
      const response = await fetch(`${API_URL}/user/me`, {
        headers: getHeader(),
      });
      const responseBody = await response.json();
      if (responseBody.isBlocked) {
        localStorage.clear();
        setLoggedIn(false);
        return;
      }
      localStorage.setItem("otpConfirmed", responseBody.otpConfirmed);
      setUser(responseBody);
    })();
  }, [loggedIn]);
  return (
    <div style={{ backgroundColor: "#262626" }} className="App">
      <div>
        <HashRouter>
          {/*displaying the header based on headerEnabled*/}
          {headerEnabled && <Header loggedIn={loggedIn} user={user} />}
          <Switch>
            <Route
              path="/"
              exact
              component={
                loggedIn ? () => <Play currentUser={user} /> : LandingPage
              }
            />

            {/*Authentication Routes*/}
            <Route
              path="/register/:code"
              component={
                siteStatus.registerPage
                  ? (props) => <Register {...props} setLoggedIn={setLoggedIn} />
                  : (props) => (
                      <Closed
                        {...props}
                        title="Registration Closed"
                        description="Registration of New Accounts is Currently Closed. Please Come Back Soon. Thank You!"
                      />
                    )
              }
            />
            <Route
              path="/register"
              component={
                siteStatus.registerPage
                  ? (props) => (
                      <Register exact {...props} setLoggedIn={setLoggedIn} />
                    )
                  : (props) => (
                      <Closed
                        {...props}
                        title="Registration Closed"
                        description="Registration of New Accounts is Currently Closed. Please Come Back Soon. Thank You!"
                      />
                    )
              }
            />
            <Route
              path="/otp"
              component={(props) => (
                <Otp {...props} setLoggedIn={setLoggedIn} />
              )}
            />
            <Route path="/forgot" component={Forgot} />
            <Route
              path="/recoveryotp"
              component={() => (
                <Otp type="recovery" redirection="/recoverpassword" />
              )}
            />
            <Route path="/recoverpassword" component={RecoverPassword} />
            <Route
              path="/login"
              component={() => (
                <Login setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
              )}
            />
            <Route
              path="/logout"
              component={function Logout() {
                //states
                useLayoutEffect(() => {
                  if (window.confirm("Are you sure you want to Log Out?")) {
                    localStorage.clear();
                    setLoggedIn(false);
                  }
                });
                return <Redirect to="/" />;
              }}
            />

            {/*routes that requires authentication*/}
            <Route
              path="/game/:id"
              component={(props) => (
                <Room
                  {...props}
                  setHeaderEnabled={setHeaderEnabled}
                  headerEnabled={headerEnabled}
                  user={user}
                />
              )}
            />
            <Route path="/refer" component={Refer} />
            <Route
              path="/buy"
              component={
                siteStatus.buyChips
                  ? Buy
                  : (props) => (
                      <Closed
                        {...props}
                        title="Buy Chips Closed"
                        description="Buying Chips is Currently Unavailable because of Security Reasons. Please Come Back Later. It will be Available Soon"
                      />
                    )
              }
            />
            <Route
              path="/sell"
              component={
                siteStatus.sellChips
                  ? Sell
                  : (props) => (
                      <Closed
                        {...props}
                        title="Sell Chips Page Closed"
                        description="Selling Chips is Currently Disable because of Security Reasons. Please Come Back Later. It will be Available Soon"
                      />
                    )
              }
            />
            <Route path="/setting" component={() => <Setting user={user} />} />
            <Route
              path="/history"
              component={() => <HistoryComponent user={user} />}
            />
            <Route
              path="/changepassword"
              component={() => (
                <ChangePassword user={user} setLoggedIn={setLoggedIn} />
              )}
            />

            {/*other routes*/}
            <Route path="/term" component={Term} />
            <Route path="/help" component={Help} />
          </Switch>
        </HashRouter>
      </div>
    </div>
  );
}

export default App;
