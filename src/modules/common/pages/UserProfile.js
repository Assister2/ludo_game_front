import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileReq } from "../../../redux/actions/user";
import Metrics from "../components/appbar/components/MetricsCard";
import ProfileDetails from "../components/appbar/components/ProfileDetail";

export default function UserProfile(props) {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getUserProfileReq())
    },[])
    return (
        <div>
            <ProfileDetails />
            <Metrics />
        </div>
    );
}