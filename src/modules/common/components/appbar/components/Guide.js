import React, { useEffect, useRef, useState } from "react";
import { SwipeableDrawer } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CDN_URL } from "../../../../../config";
import { BsWalletFill } from "react-icons/bs";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { getWalletReq } from "../../../../../redux/actions/wallet";
import { getUserProfileReq } from "../../../../../redux/actions/user";
import { logoutSuccess } from "../../../../../redux/actions/auth";
import socketNew from "../../../../../socket";
function Guide(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [f_open, setOpen] = useState(false);
  const { data } = useSelector((state) => state.loginReducer);
  const { instance } = useSelector((state) => state.socketReducer);
  const { data: userData } = useSelector((state) => state.user);
  const [wallet, setWallet] = useState({});
  const socket = useRef(null);
  const userId = Cookies.get("userId");
  useEffect(() => {
    if (instance) {
      socket.current = instance.connect();
    } else {
      socket.current = socketNew.connect();
    }

    if (!userId || userData?.isBlocked) {
      dispatch(logoutSuccess());
      navigate("/login");
      return;
    }

    if (userId && socket.current) {
      const interval = setInterval(() => {
        socket.current.emit(
          "getUserWallet",
          JSON.stringify({
            type: "getUserWallet",
            payload: {
              userId: userId,
            },
          })
        );
      }, 2000);

      // Handle "getUserWallet" event received from the socket
      socket.current.on("getUserWallet", (message) => {
        const data = JSON.parse(message);

        if (data.error) {
          // Handle error
        } else if (data.data !== null || data.data !== undefined) {
          if (data?.data?.isBlocked) {
            Cookies.remove("token");
            Cookies.remove("fullName");
            Cookies.remove("userId");
            socketNew.disconnect();

            dispatch(logoutSuccess());
            navigate("/login");
          }

          setWallet(data.data);
          dispatch({ type: "GET_WALLET_REQUEST1", payload: data.data });
        }
      });

      return () => {
        // Clear the interval and disconnect the socket when the component is unmounted
        clearInterval(interval);
      };
    }
  }, [instance]);
  useEffect(() => {
    if (!userData?._id) {
      if (data.isLoggedIn && Cookies.get("token")) {
        let route = window.location.pathname;
        if (route === "/login" || route === "/register") {
          window.location.href = "/";
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
          {/* Your drawer content */}
        </SwipeableDrawer>
      </div>
      {data.isLoggedIn ? (
        <Link className="text-decoration-none text-white " to="/wallet">
          <div className="py-1 bg-white border px-2 text-dark d-flex align-items-center rounded-2">
            <BsWalletFill className="me-2" color="green" />

            <strong style={{ fontWeight: "900" }}>{wallet.wallet}</strong>
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
    </div>
  );
}

export { Guide };
