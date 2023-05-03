import { CircularProgress } from "@material-ui/core";
import { PanoramaRounded } from "@material-ui/icons";
import cogoToast from "cogo-toast";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resendOTP, verifyOTP } from "../../../apis/auth";
import { loginRequest } from "../../../redux/actions/auth";
import useCustumSearchParams from "../hooks/useCustumSearchParams";
import useNavigateSearch from "../hooks/useNavigateSearch";
export default function VeridyOtp({ route }) {

  const location = useLocation();
  const history = useNavigate()
  const dispatch = useDispatch()
  const { state: data } = location;
  const navigate = useNavigateSearch(true);
  const { data :loginData} = useSelector((state) => state.loginReducer)
  
  const phone = useCustumSearchParams()?.p;
  const [state, setState] = useState({
    digits: ["", "", "", "", "", ""],
    isPaste: false
  });
  const [timer, setTimer] = useState(60);

  const [loading, setLoading] = useState(false);
  const [r_loading, setRLoading] = useState(false);

  const setValidationMsg = (msg) => {
    toast.error(msg);
  };





  const handleChange = (evt) => {
    if(state.isPaste===false){
      const resIdx = Number(evt.target.id);
      const arr = [...state.digits];

      arr[resIdx] =
        evt.target.value === "" || isNaN(evt.target.value)
          ? ""
          : Number(evt.target.value[evt.target.value?.length - 1]);

      setState({
        ...state,
        digits: [...arr],
      });

      if (evt.target.value?.length > 0 && evt.target?.nextSibling && resIdx < 5) {
        evt.target.nextSibling.focus();
      }
    }

  };
  const handleKeyDown = (evt) => {
    const resIdx = Number(evt.target.id);
    const oldArr = [...state.digits];

    if (
      evt.target?.previousSibling &&
      !Boolean(oldArr[resIdx] + "") &&
      resIdx > 0 &&
      (evt.which === 8 || evt.which === 46)
    ) {
      evt.target.previousSibling.focus();
    } else if (oldArr.every((d) => Boolean(d + "")) && evt.which === 13) {
      alert("Requested Mock");
    }
  };

  const handlePaste = (evt) => {
    const clipboardData = evt.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData("text/plain");
    const digits = pastedData.split("");
  
    // remove non-digit characters
    const filteredDigits = digits.filter((digit) => /^\d+$/.test(digit));
  
    // take only the first 6 digits
    const otpDigits = filteredDigits.slice(0, 6);
  
    // update the state
    setState({
      ...state,
      digits: otpDigits.map((digit) => parseInt(digit)),
    });
  };
  

  // setLoading(false);

  const verify = async () => {
    if (state.digits?.join("")?.length < 6) {
      setValidationMsg("All 6 digits Required!");
      return;
    }
    setLoading(true)
    
    // let verifyOTPData = await verifyOTP()
    dispatch(loginRequest({ phone: phone, otp: state.digits?.join("") },history))
    // console.log("verifyOTPData", verifyOTPData)
    // if (verifyOTPData.status !== 200) {
    //   setLoading(false)
    //   toast.error(verifyOTPData.error);
    // }
    // else {
    //   setLoading(false)
    //   Cookies.set("token", verifyOTPData?.data?.jwtToken?.jwtToken)
    //   Cookies.set("fullName", verifyOTPData?.data?.fullName)
    //   Cookies.set("userId", verifyOTPData?.data?._id)
    //   Cookies.set("isLoggedIn", true)
    //   cogoToast.success("Logged in successfully")
    //   // window.location.pathname = "/play"
    //   // // setTimeout(()=>{
    //   // //   history("/play")
    //   // // },1000)

    //   navigate("/play/home");
    // }

    // setTimeout(() => {
    //   setLoading(false);
    //   toast.success("[DEBUG]: OTP is " + state.digits?.join(""));
    //   navigate("/play/home");
    // }, 1500);
  };

  const resend = async () => {
    try {
      setRLoading(true);
      let res = await resendOTP({phone:phone})
      if (res.status == 200) {
        cogoToast.success("OTP Sent")
      }
      else {
        cogoToast.error(res.error)
      }
      setRLoading(false);

    } catch (error) {
      setRLoading(false);

    }



  };

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [timer]);

  return (
    <div>
      <div className=" col-12 col-sm-12 col-md-6 col-lg-4 mx-auto p-3 g-0">
        <div className="card">
          <div className="bg-light text-dark text-capitalize card-header">
            Verify Otp
          </div>
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-start py-3">
              <button
                onClick={() => navigate("/login", { p: phone || "" })}
                className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  className="me-1"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                  ></path>
                </svg>
                <span className="text-capitalize">change number</span>
              </button>
            </div>
            <div>
              <div
                className="py-6 justify-content-between mx-2"
                style={{ display: "flex" }}
                onPaste={handlePaste}
              >
                <input
                  aria-label="Please enter verification code. Digit 1"
                  autocomplete="off"
                  className="  form-control"
                  required={true}
                  id="0"
                  type="tel"
                  maxLength={1}
                  value={state.digits[0]}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  style={{
                    flex: "1 1 0%",
                    textAlign: "center",
                    marginRight: "4px",
                  }}
                />
                <input
                  aria-label="Digit 2"
                  autocomplete="off"
                  className="  form-control"
                  required={true}
                  id="1"
                  type="tel"
                  maxLength={1}
                  value={state.digits[1]}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  style={{
                    flex: "1 1 0%",
                    textAlign: "center",
                    marginRight: "4px",
                  }}
                />
                <input
                  aria-label="Digit 3"
                  autocomplete="off"
                  className="  form-control"
                  required={true}
                  id="2"
                  type="tel"
                  maxLength={1}
                  value={state.digits[2]}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  style={{
                    flex: "1 1 0%",
                    textAlign: "center",
                    marginRight: "4px",
                  }}
                />
                <input
                  aria-label="Digit 4"
                  autocomplete="off"
                  className="  form-control"
                  required={true}
                  id="3"
                  type="tel"
                  maxLength={1}
                  value={state.digits[3]}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  style={{
                    flex: "1 1 0%",
                    textAlign: "center",
                    marginRight: "4px",
                  }}
                />
                <input
                  aria-label="Digit 5"
                  autocomplete="off"
                  className="  form-control"
                  required={true}
                  id="4"
                  type="tel"
                  maxLength={1}
                  value={state.digits[4]}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  style={{
                    flex: "1 1 0%",
                    textAlign: "center",
                    marginRight: "4px",
                  }}
                />
                <input
                  aria-label="Digit 6"
                  autocomplete="off"
                  className="  form-control"
                  required={true}
                  id="5"
                  type="tel"
                  maxLength={1}
                  value={state.digits[5]}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  style={{
                    flex: "1 1 0%",
                    textAlign: "center",
                    marginRight: "4px",
                  }}
                />
              </div>
            </div>
            <div
              className={`d-flex align-items-center ${timer > 0 ? "justify-content-between" : "justify-content-end"
                } mt-3`}
            >
              {timer > 0 && (
                <span style={{ fontSize: "0.8rem" }}>
                  Resend in 00:{timer} s
                </span>
              )}
              <button
                onClick={resend}
                style={{ minWidth: "6rem" }}
                className="btn btn-outline-dark btn-sm"
                disabled={timer > 0}
              >
                {r_loading ? (
                  <CircularProgress
                    style={{
                      width: "1.5rem",
                      height: "1.5rem",
                      verticalAlign: "middle",
                    }}
                    color="white"
                  />
                ) : (
                  "Resend OTP"
                )}
              </button>
            </div>
            <div className="d-grid py-3">
              <p style={{ fontSize: "0.8rem" }}>
                By Continuing, you agree to our{" "}
                <a href="#/terms">Legal Terms</a> and you are 18 years or older.
              </p>
              <button
                onClick={verify}
                className="btn btn-primary text-uppercase"
              >
                {loginData.isLoading ? (
                  <CircularProgress
                    style={{
                      width: "1.5rem",
                      height: "1.5rem",
                      verticalAlign: "middle",
                    }}
                    color="white"
                  />
                ) : (
                  "verify"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
