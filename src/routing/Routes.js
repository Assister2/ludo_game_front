import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Route, Routes as Switch, Navigate } from "react-router-dom";
const LandingPage = lazy(() => import("../modules/common/pages/LandingPage"));
const UserProfile = lazy(() => import("../modules/common/pages/UserProfile"));
const Wallet = lazy(() => import("../modules/common/pages/Wallet"));
const Buy = lazy(() => import("../modules/common/pages/Buy"));
const Sell = lazy(() => import("../modules/common/pages/Sell"));
const ReferAndEarning = lazy(() => import("../modules/common/pages/Referal"));
const Game = lazy(() => import("../modules/common/pages/Game"));
const History = lazy(() => import("../modules/common/pages/history"));
const LegalTerms = lazy(() => import("../modules/common/pages/LegalTerms"));
const Support = lazy(() => import("../modules/common/pages/Support"));
const Login = lazy(() => import("../modules/auth/pages/Login"));
const Register = lazy(() => import("../modules/auth/pages/Register"));
const OTPVerification = lazy(() => import("../modules/auth/pages/VerifyOtp"));
const Play = lazy(() => import("../modules/common/pages/play"));

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
