import CircularLoading from "./../../common/components/atoms/CircularLoading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { resendOTP, verifyOTP2 } from "../../../apis/auth";
import { loginRequest } from "../../../redux/actions/auth";
import useCustumSearchParams from "../hooks/useCustumSearchParams";
import useNavigateSearch from "../hooks/useNavigateSearch";
import AppLayout from "../../common/layout/AppLayout";

export default function OTPVerification({ route }) {
  const history = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const navigate = useNavigateSearch(true);
  const { signUpPage } = useSelector((state) => state.signupPage1);
  const phone = location.state.phone;
  const fromRegister = location.state.registerUser;

  const [state, setState] = useState({
    digits: ["", "", "", "", "", ""],
    isPaste: false,
    isVerified: false,
  });

  const [timer, setTimer] = useState(60);

  const [loading, setLoading] = useState(false);
  const [r_loading, setRLoading] = useState(false);

  const setValidationMsg = (msg) => {
    toast.error(msg);
  };

  const handleChange = (evt) => {
    if (state.isPaste === false) {
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

      if (
        evt.target.value?.length > 0 &&
        evt.target?.nextSibling &&
        resIdx < 5
      ) {
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
    if (state.digits.join("").length < 6) {
      setValidationMsg("All 6 digits Required!");
      return;
    }

    setLoading(true);

    const otp = state.digits.join("");

    try {
      if (signUpPage) {
        const data = await verifyOTP2({ phone, otp });
        dispatch(loginRequest({ data, register: true }, history));
      } else {
        dispatch(loginRequest({ phone, otp }, history));
      }

      setLoading(false);
    } catch (error) {
      console.error("Error while verifying:", error);
      setLoading(false);
    }

    setState({
      digits: ["", "", "", "", "", ""],
      isPaste: false,
      isVerified: false,
    });
  };

  const resend = async () => {
    try {
      setRLoading(true);
      setTimer(60);
      let res = await resendOTP({ phone: phone, register: fromRegister });
      if (res.status == 200) {
        toast.success("OTP Sent");
      } else {
        toast.error(res.error);
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
    <AppLayout>
      <div className="col-12 col-sm-10 col-md-7 col-lg-12 mx-auto p-3 g-0">
        <div className="card">
          <div className="bg-light text-dark text-capitalize card-header">
            Verify Otp
          </div>
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-start py-3">
              <button
                onClick={() => navigate("/register", { p: phone || "" })}
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
              className={`d-flex align-items-center ${
                timer > 0 ? "justify-content-between" : "justify-content-end"
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
                disabled={false}
              >
                {r_loading ? (
                  <CircularLoading
                    height={"1.5rem"}
                    width={"1.5rem"}
                    color={"white"}
                  />
                ) : (
                  "Resend OTP"
                )}
              </button>
            </div>
            <div className="d-grid py-3">
              <p style={{ fontSize: "0.8rem" }}>
                By Continuing, you agree to our <a href="/legal">Legal Terms</a>{" "}
                and you are 18 years or older.
              </p>
              <button
                onClick={verify}
                disabled={loading}
                className="btn btn-primary text-uppercase"
              >
                {loading ? (
                  <CircularLoading
                    height={"1.5rem"}
                    width={"1.5rem"}
                    color={"white"}
                  />
                ) : (
                  "verify"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
