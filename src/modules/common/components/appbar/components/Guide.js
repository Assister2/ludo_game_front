import { SwipeableDrawer } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { CDN_URL } from "../../../../../config";
import { BsWalletFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { getWalletReq } from "../../../../../redux/actions/wallet";
import { getUserProfileReq } from "../../../../../redux/actions/user";

let URL = `${process.env.REACT_APP_CLIENT_BASEURL_WS}/wallet`;

function Guide(props) {
  const dispatch = useDispatch();
  const [f_open, setOpen] = useState(false);
  const walletData = useSelector((state) => state.wallet);

  const { data } = useSelector((state) => state.loginReducer);
  const { data: userData } = useSelector((state) => state.user);

  const [wallet, setWallet] = useState({});

  // useEffect(() => {
  //   setWallet(walletData.data)
  // }, [walletData])
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(Cookies.get("userId"));
  let isLoggedIn = Cookies.get("isLoggedIn");
  useEffect(() => {
    if (!userData._id) {
      if (data.isLoggedIn && Cookies.get("token")) {
        let route = window.location.pathname;
        if (route === "/login" || route === "/register") {
          window.location.href = "/play";
          return null;
        }
        console.log("working", data);
        console.log("tokenwa", Cookies.get("token"));
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
    let client = null;
    let reconnectTimeout = null;
    const connect = () => {
      if (!clientRef.current) {
        client = new WebSocket(URL);
        clientRef.current = client;
        window.client = client;
        if (client) {
          client.onopen = () => {
            interval = setInterval(() => {
              client.send(
                JSON.stringify({
                  type: "getUserWallet",
                  payload: {
                    userId: userId,
                  },
                })
              );
            }, 1000);
            setIsOpen(true);
          };
          client.onmessage = (message) => {
            const data = JSON.parse(message.data);
            if (data.error) {
            } else if (data.data !== null || data.data !== undefined) {
              if (isMounted) {
                // Only update state if the component is still mounted

                if (data?.data) {
                  setWallet(data.data);
                }
              }
            }
          };
          client.onerror = (error) => {
            console.error("WebSocket error:", error);
            reconnect();
          };
          client.onclose = () => {
            console.log("WebSocket connection closed23");
            window.location.reload();
            reconnect();
          };
        }
      }
    };

    const reconnect = () => {
      clearInterval(interval);
      if (!reconnectTimeout) {
        reconnectTimeout = setTimeout(() => {
          clientRef.current = null;
          connect();
          reconnectTimeout = null;
        }, 1000);
      }
    };

    connect();

    return () => {
      isMounted = false;
      console.log("Cleaning up WebSocket...");
      clearInterval(interval);
      clearTimeout(reconnectTimeout);
      if (client) {
        client.close();
        clientRef.current = null;
      }
    };
  }, []);

  // Render your component here...

  // useEffect(() => {
  //   let sockets = new WebSocket(`${process.env.REACT_APP_CLIENT_BASEURL_WS}/wallet`);
  //   console.log("sockets working")
  //   setSocket(sockets)
  // }, [])

  // if (socket) {
  //   console.log("socket", socket)
  //   socket.onclose = () => {
  //     setTimeout(()=>{

  //       setSocket(new WebSocket(`${process.env.REACT_APP_CLIENT_BASEURL_WS}/wallet`))
  //     },10000)
  //     console.log("closed wallet socket")
  //   }

  //   socket.onopen = () => {
  //     setInterval(() => {
  //       if(socket){
  // socket.send(JSON.stringify({
  //   type: 'getUserWallet',
  //   payload: {
  //     userId: userId,
  //   }
  // }))
  //       }

  //     }, 1000)
  //   }
  // }

  // useEffect(()=>{
  //     let sockets = new WebSocket(`${process.env.REACT_APP_CLIENT_BASEURL_WS}/wallet`);
  //     setSocket(sockets)
  // sockets.onopen = ()=>{

  //   setInterval(()=>{
  //     if(!sockets){
  //       console.log("sockets",sockets)
  //        sockets = new WebSocket(`${process.env.REACT_APP_CLIENT_BASEURL_WS}/wallet`);
  //       setSocket(sockets)
  //     }
  // sockets.send(JSON.stringify({
  //   type: 'getUserWallet',
  //   payload: {
  //     userId: userId,
  //   }
  //     }));
  //   },1000)
  //       sockets.onclose = () =>{
  //         console.log("sockets wallet closed")
  //         sockets = new WebSocket(`${process.env.REACT_APP_CLIENT_BASEURL_WS}/wallet`);
  //       }
  //     }
  //     function sendMessage(){

  //     }
  //     sockets.onmessage = (event) =>{
  //  const data = JSON.parse(event.data);
  //  if(data.error){
  //   sockets = new WebSocket(`${process.env.REACT_APP_CLIENT_BASEURL_WS}/wallet`);
  //   console.log("error from wallet socket",data.error)
  //  }
  //  else if(data.data !== null || data.data !== undefined){
  //   setWallet(data.data)
  //   console.log("datasswaa", data)
  // }
  //     }
  // },[])
  // useEffect(()=>{
  //   if(socket){
  //     if(socket.readyState!=0){

  //     }
  //     }

  // },[socket])

  // const sockets = new WebSocket(`${process.env.REACT_APP_CLIENT_BASEURL_WS}/wallet`);
  // useEffect(() => {
  //   console.log("userData", userData)

  //   setSocket(sockets)
  //   // if(userData._id ){
  //   //   sockets.onopen = () => {
  // sockets.send(JSON.stringify({
  //   type: 'getUserWallet',
  //   payload: {
  //     userId: userId,
  //   }
  //   //     }));

  //   //   // };
  //   //   setSocket(sockets)
  //   // }

  //   sockets.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     console.log("datasswaa",data)

  //     if (data.error) {
  //       console.error("Error received from WebSocket:", data.error);
  //     } else {
  //       if(data.data!==null || data.data !== undefined){
  //           setWallet(data.data)
  //       }

  //       // setWallet(data.data);
  //     }
  //   };
  //   sockets.onclose = () => {
  //     console.log("WebSocket connection closedz");
  //   };
  //   // return () => {
  //   //   socket.close();
  //   // };
  // }, []);

  // useEffect(()=>{
  //   if(socket){
  //     console.log("cookies userId",Cookies.get("userId"))
  //     if(userId !== null){
  //       console.log("socketwa",socket)

  //     }
  //   }
  // },[data.isLoggedIn])

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
              {wallet?.wallet ? wallet.wallet : walletData.data.wallet}
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
