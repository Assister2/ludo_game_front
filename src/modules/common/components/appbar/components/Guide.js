import { SwipeableDrawer } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { CDN_URL } from "../../../../../config";
import { BsWalletFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { getWalletReq } from "../../../../../redux/actions/wallet";
import { getUserProfileReq } from "../../../../../redux/actions/user";
import socketNew2 from "../../../../../socker";
import {
  getWalletError,
  getWalletLoading,
  getWalletSuccess,
} from "../../../../../redux/actions/wallet";
// let URL = `${process.env.REACT_APP_CLIENT_BASEURL_WS}/wallet`;

function Guide(props) {
  const dispatch = useDispatch();

  const socket2 = useSelector((state) => state.socketReducer);
  if (!socket2.instance) {
    dispatch({ type: "SOCKET_CONNECTED", payload: socketNew2 });
  }

  const [f_open, setOpen] = useState(false);
  const walletData = useSelector((state) => state.wallet);
  const { data } = useSelector((state) => state.loginReducer);
  const { data: userData } = useSelector((state) => state.user);

  const [wallet, setWallet] = useState({});

  const socket = useRef(null);
  const [userId, setUserId] = useState(Cookies.get("userId"));
  const isLoggedIn = Cookies.get("isLoggedIn");

  useEffect(() => {
    if (!userData?._id) {
      if (data.isLoggedIn && Cookies.get("token")) {
        let route = window.location.pathname;
        if (route === "/login" || route === "/register") {
          window.location.href = "/play";
          return null;
        }

        dispatch(getUserProfileReq());
        dispatch(getWalletReq());
      } else {
        let route = window.location.pathname;
        if (route !== "/login" && route !== "/register" && route !== "/") {
          window.location.href = "/login";
          return null;
        }
      }
    }
  }, [data.isLoggedIn]);

  const clientRef = useRef(null);
  const [waitingToReconnect, setWaitingToReconnect] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  let interval;
  let isMounted = true; // Add a variable to track if the component is mounted

  useEffect(() => {
    var socketNew = null;

    if (socket2) {
      const { instance } = socket2;
      socketNew = instance;
    }

    if (userId && socketNew) {
      socketNew.connect();

      let client = null;
      let reconnectTimeout = null;

      client = socketNew.connect();

      client.emit(
        "getUserWallet",
        JSON.stringify({
          type: "getUserWallet",
          payload: {
            userId: userId,
          },
        })
      );

      setIsOpen(true);

      client.on("getUserWallet", (message) => {
        const data = JSON.parse(message);

        if (data.error) {
          // Handle error
        } else if (data.data !== null || data.data !== undefined) {
          // Only update state if the component is still mounted

          setWallet(data.data);

          dispatch({ type: "GET_WALLET_REQUEST1", payload: data.data });
        }
      });
    }
  }, [socket2, userId]);
  // useEffect(() => {
  //   client.emit(
  //     "getUserWallet",
  //     JSON.stringify({
  //       type: "getUserWallet",
  //       payload: {
  //         userId: userId,
  //       },
  //     })
  //   );
  // }, []);

  const handleClose = () => setOpen(false);
  return (
    <div>
      <div className="partials">
        <SwipeableDrawer
          PaperProps={{
            style: { width: "100vw", minHeight: "50vh" },
          }}
          anchor="bottom"
          open={f_open}
          onClose={handleClose}
        >
          <div>
            <div
              style={{ padding: "1rem" }}
              className="bg-dark offcanvas-header"
            >
              <div className="text-white fw-bold offcanvas-title h5">
                How To Play Games & Earn?
              </div>
              <button
                onClick={handleClose}
                type="button"
                className="btn-close btn-close-white"
                aria-label="Close"
              ></button>
            </div>
          </div>
        </SwipeableDrawer>
      </div>
      {data.isLoggedIn ? (
        <Link className="text-decoration-none text-white " to="/wallet">
          <div className="py-1 bg-white border px-2 text-dark d-flex align-items-center rounded-2">
            <BsWalletFill className="me-2" color="red" />
            <strong className="ml-2">
              {/* {walletData.data.wallet == 0
                ? wallet.wallet
                : walletData.data.wallet} */}
              {wallet.wallet}
            </strong>
          </div>
        </Link>
      ) : (
        <button
          onClick={() => setOpen(true)}
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
      )}
      {/* <div aria-modal="true" style={{ visibility: "visible" }} role="dialogue" className="h-50 offcanvas offcanvas-bottom show">
        <div className="bg-dark p-4 text-white offcanvas-header">
          <div className="text-white fw-bold offcanvas-title h5">
            How To Play Games & Earn?
          </div>
          <button aria-label="Close" type="button" className="btn-close btn-close-white">

          </button>
        </div>
      </div> */}
    </div>
  );
}

export { Guide };
