import { CircularProgress } from "@material-ui/core";
// import cogoToast from "cogo-toast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import {
  buyWalletApi,
  getWalletApi,
  sellWalletApi,
  getUPILink,
} from "../../../apis/wallet";
import React, { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CDN_URL } from "../../../config";
import socketNew2 from "../../../socker";
import { userBuyChipsRequest } from "../../../redux/actions/wallet";

export default function Buy() {
  const dispatch = useDispatch();
  const socket2 = useSelector((state) => state.socketReducer);
  console.log("socket2buy", socket2);
  if (!socket2.instance) {
    console.log("working232");
    dispatch({ type: "SOCKET_CONNECTED", payload: socketNew2 });
  }
  const { instance } = socket2;
  var socketNew = instance;

  const [amount, setAmount] = useState("");
  const { isLoading } = useSelector((state) => state.wallet);
  let userId = Cookies.get("userId");
  const [ws, setWs] = useState(socketNew.connect());
  const [wallet, setWallet] = useState({});
  console.log("sockett", socketNew);
  useEffect(() => {
    const wss = socketNew.connect();
    console.log("34343dssss", wss);
    setWs(wss);
    wss.on("connect", (e) => {
      wss.send(
        JSON.stringify({
          type: "getUserWallet",
          payload: {
            userId,
          },
        })
      );
    });
    wss.onclose = () => {
      console.log("WebSocket connection closed233");
      // wss.close();
      // window.location.reload();
    };
  }, []);
  const pay = () => {
    if (amount <= 0) {
      toast.error("amount should be greater than 0");
    } else if (amount > 20000) {
      toast.error("Maximum amount limit is 20000");
    } else {
      dispatch(
        userBuyChipsRequest({ amount: Number(amount), createdAt: new Date() })
      );

      console.log("paying", ws);
      ws.emit(
        "getUserWallet",
        JSON.stringify({
          type: "getUserWallet",
          payload: {
            userId,
          },
        })
      );
      setAmount("");
    }
  };

  ws.on("getUserWallet", (event) => {
    // console.log("event", event);
    event = JSON.parse(event);
    if (event.status == 200) {
      localStorage.setItem("wallet", event.data.wallet);
      // setWallet(event.data)
      // console.log("event", event);
    }
    // setChallenges(event)
  });

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
                {false ? (
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
