import React, { useEffect } from "react";
import Cookies from "js-cookie";
import Deposit from "./wallet/Deposit";
import { BsArrowLeftShort } from "react-icons/bs";
import WithDraw from "./wallet/WithDraw";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getWalletReq } from "../../../redux/actions/wallet";
import { useNavigate } from "react-router-dom";
import { logoutSuccess } from "../../.././redux/actions/auth";
import AppLayout from "../layout/AppLayout";

export default function Wallet() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (Cookies.get("userId") === undefined) {
    dispatch(logoutSuccess());
    navigate("/login");
  }
  useEffect(() => {
    dispatch(getWalletReq());
  }, []);
  return (
    <AppLayout>
      <div className="col-12 col-sm-10 col-md-7 col-lg-12 mx-auto p-3 g-0">
        <div className="mb-3 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center justify-content-start">
            <Link to="/">
              <button className="btn btn-primary border">
                <BsArrowLeftShort className="me-2" />
                Back
              </button>
            </Link>
          </div>
          <Link
            to="/history"
            className="text-capitalize btn btn-outline-primary"
          >
            Wallet History
          </Link>
        </div>
        <Deposit />
        <WithDraw />
      </div>
    </AppLayout>
  );
}
