import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes as Switch } from "react-router-dom";
import Login from "../modules/auth/pages/Login";
import Register from "../modules/auth/pages/Register";
import VeridyOtp from "../modules/auth/pages/VerifyOtp";
import Buy from "../modules/common/pages/Buy";
import Game from "../modules/common/pages/Game";
import History from "../modules/common/pages/history";
import { LandingPage } from "../modules/common/pages/LandingPage";
import LegalTerms from "../modules/common/pages/LegalTerms";
import Play from "../modules/common/pages/play";
import ReferAndEarning from "../modules/common/pages/Referal";
import Sell from "../modules/common/pages/Sell";
import Support from "../modules/common/pages/Support";
import UserProfile from "../modules/common/pages/UserProfile";
import Wallet from "../modules/common/pages/Wallet";
import Home from "../modules/playground/pages/Home";

const isLoggedIn = Cookies.get("isLoggedIn")
console.log("islogged in", isLoggedIn)
const Routes = (props) => {

  const { data } = useSelector((state) => state.loginReducer)


  const [isLoggedIn, setIsloggedIn] = useState(Cookies.get("isLoggedIn"))


  // useEffect(()=>{
  //   console.log("isLoggedIn",isLoggedIn)
  //   setIsloggedIn(Cookies.get("isLoggedIn"))
  // },[isLoggedIn])

  return (
    <Switch>
      <Route path="/legal" element={<LegalTerms />} />
      <Route path="/support" element={<Support />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VeridyOtp />} />

      {
        data.isLoggedIn ? <>
          <Route path="/profile" element={<UserProfile />} />

          {/* <Route path="/verify-otp" element={<VeridyOtp />} /> */}
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/referal" element={<ReferAndEarning />} />
          <Route  path="/play" element={<Play />} />
          <Route path="/game/:id" element={<Game />} />
          <Route path="/history" element={<History />} />

        </> :
          <>
          </>
      }

    </Switch>
  );
};

export default Routes;
