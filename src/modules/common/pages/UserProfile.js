import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileReq } from "../../../redux/actions/user";
import Metrics from "./profile/MetricsCard";
import ProfileDetails from "./profile/ProfileDetail";
import AppLayout from "../layout/AppLayout";

export default function UserProfile(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfileReq());
  }, []);
  return (
    <AppLayout>
      <ProfileDetails />
      <Metrics />
    </AppLayout>
  );
}
