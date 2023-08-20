import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CDN_URL } from "../../../../../config";
import { BsWalletFill } from "react-icons/bs";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { getWalletReq } from "../../../../../redux/actions/wallet";
import { getUserProfileReq } from "../../../../../redux/actions/user";
import {
  logoutRequest,
  logoutSuccess,
} from "../../../../../redux/actions/auth";
import { connectSocket, disconnectSocket } from "../../../../../socket";
import { toast } from "react-toastify";
import Offcanvas from "react-bootstrap/Offcanvas";
import CircularLoading from "../../atoms/CircularLoading";

function Guide(props) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [f_open, setOpen] = useState(false);
  const { data } = useSelector((state) => state.loginReducer);
  const { data: userData } = useSelector((state) => state.user);
  const { data: wallet } = useSelector((state) => state.wallet1);

  const socket = useRef(null);
  const userId = Cookies.get("userId");

  useEffect(() => {
    socket.current = connectSocket();
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

      socket.current.on("logout", (message) => {
        dispatch(logoutSuccess());
        Cookies.remove("token");
        Cookies.remove("fullName");
        Cookies.remove("userId");
        window.location.href = "/login";

        toast.success("Logged out successfully");
      });

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
            disconnectSocket();

            dispatch(logoutSuccess());
            navigate("/login");
          }
          dispatch({ type: "GET_WALLET_REQUEST1", payload: data.data });
        }
      });

      return () => {
        // Clear the interval and disconnect the socket when the component is unmounted
        clearInterval(interval);
      };
    }
  }, []);
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
    <>
      <div className="partials">
        <Offcanvas
          className={"h-50"}
          show={f_open}
          onHide={handleClose}
          placement="bottom"
        >
          {/* Your drawer content */}
        </Offcanvas>
      </div>
      {data.isLoggedIn ? (
        <Link className="text-decoration-none text-white " to="/wallet">
          <div className="py-1 bg-white border px-2 text-dark d-flex align-items-center rounded-2">
            <BsWalletFill className="me-2" color="green" />
            {wallet?.wallet ? (
              <strong>
                {wallet?.wallet?.toFixed(wallet?.wallet % 1 !== 0 ? 2 : 0)}
              </strong>
            ) : (
              <CircularLoading width={20} height={20} color="#0D6EFD" />
            )}
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
    </>
  );
}

export { Guide };
