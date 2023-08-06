import { CircularProgress } from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

import React, { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CDN_URL } from "../../../config";

import { userBuyChipsRequest } from "../../../redux/actions/wallet";

export default function Buy() {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.wallet);

  const [amount, setAmount] = useState("");

  const pay = () => {
    if (amount <= 0) {
      toast.error("amount should be greater than 0");
    } else if (amount > 20000) {
      toast.error("Maximum amount limit is 20000");
    } else {
      dispatch(
        userBuyChipsRequest({ amount: Number(amount), createdAt: new Date() })
      );

      setAmount("");
    }
  };

  return (
    <>
      <div className="col-12 col-sm-12 col-md-6 col-lg-4 mx-auto p-3 g-0">
        <div className="mb-3 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center justify-content-start">
            <Link to="/wallet">
              <button className="btn btn-primary border">
                <BsArrowLeftShort />
                Back
              </button>
            </Link>
          </div>
          <button
            type="button"
            className="btn btn-outline-primary d-flex align-items-center justify-content-center"
          >
            <img
              style={{ marginRight: "4px" }}
              src={`${CDN_URL}svgs/info.svg`}
              alt="info"
            />
            <p className="m-0 p-0">Guide</p>
          </button>
        </div>
        <div className="mb-3 shadow card">
          <div className="bg-light text-dark text-capitalize card-header">
            Buy Chips
          </div>
          <div className="card-body">
            <label for="amount" className="form-label w-100 text-start">
              Enter Amount
            </label>
            <div className="input-group mb-4">
              <span className="input-group-text bg-light text-dark">₹</span>
              <input
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                className="form-control"
                type="number"
                placeholder="Amount"
              ></input>
            </div>
            <div className="d-grid">
              <button className="btn btn-primary" onClick={pay}>
                {isLoading ? (
                  <CircularProgress
                    style={{
                      width: "1.5rem",
                      height: "1.5rem",
                      verticalAlign: "middle",
                    }}
                    color="white"
                  />
                ) : (
                  "Pay"
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <p className="text-capitalize text-secondary">payments secured by</p>
          <div className="d-flex justify-content-center align-items-center">
            <div className="hstack gap-2 minBreakpoint-xs">
              <img
                src="https://ludo-players.s3.ap-south-1.amazonaws.com/cdn/lp/icons/logos/gpay.svg"
                alt="gpay logo"
                width={"48"}
              ></img>
              <img
                src="https://ludo-players.s3.ap-south-1.amazonaws.com/cdn/lp/icons/logos/paytm.svg"
                alt="paytm logo"
                width={"48"}
              ></img>
              <img
                src="https://ludo-players.s3.ap-south-1.amazonaws.com/cdn/lp/icons/logos/phonepe.svg"
                alt="phone logo"
                width={"48"}
              ></img>
              <img
                src="https://ludo-players.s3.ap-south-1.amazonaws.com/cdn/lp/icons/logos/upi.svg"
                alt="upi logo"
                width={"48"}
              ></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
