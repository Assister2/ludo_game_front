import CircularLoading from './../components/atoms/CircularLoading'
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router/cjs/react-router.min";
import { CDN_URL } from "../../../config";
import { userSellChipsRequest } from "../../../redux/actions/wallet";
import { getUserProfileApi } from "../../../apis/user";
import Cookies from "js-cookie";
import AppLayout from '../layout/AppLayout';

export default function Sell() {
  const walletData1 = useSelector((state) => state.wallet1);
  const [wallet, setWallet] = useState({});
  const [ws, setWs] = useState(null);
  const userId = Cookies.get("userId");
  const { isLoading } = useSelector((state) => state.wallet);
  const { instance } = useSelector((state) => state.socketReducer);

  const userData = useSelector((state) => state.user);
  const [disableWithdraw, setDisableWithdraw] = useState(false);

  const initialState = {
    upiId: "",
    confirmUpiId: "",
    amount: 0,
  };

  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  // useEffect(() => {
  //   const client = instance.connect();
  //   setWs(client);
  //   client.emit(
  //     "getUserWallet",
  //     JSON.stringify({
  //       type: "getUserWallet",
  //       payload: {
  //         userId: userId,
  //       },
  //     })
  //   );
  //   return () => {
  //     // Disconnect the client or perform any necessary cleanup actions
  //     client.disconnect();
  //   };
  // }, []);
  const showToast = () => {
    toast.error("Complete or cancel active challenges to withdraw!");
  };

  useEffect(() => {
    (async () => {
      let userdata = await getUserProfileApi();
      // if (userdata.data.data) {
      //   setDisableWithdraw(userdata.data.data);
      // }
    })();
  }, []);
  useEffect(() => {
    setWallet(walletData1.data);
  }, [walletData1]);

  const sell = () => {
    try {
      const regexPattern = /@/;

      if (!state.upiId || state.upiId.trim() === "") {
        toast.error("UPI ID is required");
      } else if (!regexPattern.test(state.upiId)) {
        toast.error("UPI ID is not correct");
      } else if (state.upiId !== state.confirmUpiId) {
        toast.error("Please enter the same UPI ID");
      } else if (wallet?.winningCash < state.amount) {
        toast.error("Insufficient funds in wallet");
      } else {
        if (state.amount < 95) {
          toast.error("Amount should be greater than 95");
        } else if (state.amount > 10000) {
          toast.error("Amount should be less than 10000");
        } else {
          dispatch(
            userSellChipsRequest({
              upiId: state.upiId,
              amount: Number(state.amount),
              createdAt: new Date(),
            })
          );
          setState(initialState);
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <AppLayout>
      <div className="col-12 col-sm-10 col-md-7 col-lg-12 mx-auto p-3 g-0">
        <div className="mb-3 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center justify-content-start">
            <Link to={"/wallet"}>
              <button className="btn btn-primary border">
                <BsArrowLeftShort className="me-2" />
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
            Payment Mode
          </div>
          <div className=" bg-secondary py-1">
            <span className="text-white" style={{ fontSize: "0. 8rem" }}>
              Withdrawal Chips: <span>{wallet?.winningCash}</span>
            </span>
          </div>
          <div className="card-body">
            <div className="d-flex flex-row align-items-center justify-content-between mb-1">
              <span style={{ fontSize: "0.8rem" }}>Minimum: 95</span>
              <span style={{ fontSize: "0.8rem" }}>Maximum: 1,00,000</span>
            </div>
          </div>
        </div>
        <div className="mb-3 shadow card">
          <div className="bg-light text-dark text-capitalize card-header">
            Payment Details
          </div>

          <div className="card-body">
            <div className="vstack gap-3 minBreakpoint-xs">
              <div>
                <label className="text-capitalize text-start w-100 form-label">
                  UPI ID
                </label>
                <input
                  name="upiId"
                  onChange={handleChange}
                  placeholder="Your UPI ID"
                  className="form-control form-control"
                  value={state.upiId}
                ></input>
              </div>
              <div>
                <label className="text-capitalize text-start w-100 form-label">
                  Re Enter UPI ID{" "}
                </label>
                <input
                  name="confirmUpiId"
                  onChange={handleChange}
                  placeholder="Your UPI ID"
                  className="form-control form-control"
                  value={state.confirmUpiId}
                ></input>
              </div>
              <div>
                <label className="text-capitalize text-start w-100 form-label">
                  Chips{" "}
                </label>
                <input
                  name="amount"
                  onChange={handleChange}
                  placeholder="Chips"
                  type="number"
                  className="form-control form-control"
                  value={state.amount}
                ></input>
              </div>
              <p style={{ fontSize: "0.8rem" }}>
                By Continuing, you agree to our{" "}
                <a href="#/terms">Legal Terms</a> and you are 18 years or older.
              </p>

              <button
                disabled={isLoading}
                className="btn btn-primary"
                onClick={sell}
              >
                {isLoading ? (
                  <CircularLoading
                  height={'1.5rem'}
                  width={'1.5rem'}
                  color={'white'}
                  />
                ) : (
                  "Sell"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
