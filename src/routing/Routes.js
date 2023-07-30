import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes as Switch, Navigate } from "react-router-dom";
import LandingPage from "../modules/common/pages/LandingPage";
import UserProfile from "../modules/common/pages/UserProfile";
import Wallet from "../modules/common/pages/Wallet";
import Buy from "../modules/common/pages/Buy";
import Sell from "../modules/common/pages/Sell";
import ReferAndEarning from "../modules/common/pages/Referal";
import Play from "../modules/common/pages/play";
import Game from "../modules/common/pages/Game";
import History from "../modules/common/pages/history";
import LegalTerms from "../modules/common/pages/LegalTerms";
import Support from "../modules/common/pages/Support";
import Login from "../modules/auth/pages/Login";
import Register from "../modules/auth/pages/Register";
import OTPVerification from "../modules/auth/pages/VerifyOtp";

const Routes = (props) => {
  const { data } = useSelector((state) => state.loginReducer);

  return (
    <Switch>
      {data.isLoggedIn ? (
        <>
          <Route index path="/" element={<LandingPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/referal" element={<ReferAndEarning />} />
          <Route path="/play" element={<Play />} />
          <Route path="/game/:id" element={<Game />} />
          <Route path="/history" element={<History />} />
          <Route path="/legal" element={<LegalTerms />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route index path="/" element={<LandingPage />} />
          <Route path="/legal" element={<LegalTerms />} />
          <Route path="/support" element={<Support />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<OTPVerification />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Switch>
  );
};

export default Routes;
