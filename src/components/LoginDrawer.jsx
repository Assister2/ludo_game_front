import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  SwipeableDrawer,
  Typography,
} from "@material-ui/core";
import { optionsDrawerStyles } from "../styles/optionsDrawerStyles";
import { Button } from "react-bootstrap";
import PermPhoneMsgIcon from "@material-ui/icons/PermPhoneMsg";
import PersonIcon from "@material-ui/icons/Person";
import EditIcon from "@material-ui/icons/Edit";

export default function LoginDrawer({ f_open, handleClose }) {
  const classes = optionsDrawerStyles();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isVerifyMode, setVerifyMode] = useState(false);
  const [state, setState] = useState({
    name: "",
    phone: "",
    digits: ["", "", "", ""],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (evt) => {
    let resIdx = Number(evt.target.id);
    let arr = [...state.digits];

    arr = arr.map((e, idx) => {
      if (idx === resIdx) {
        return evt.target.value === "" || isNaN(evt.target.value)
          ? ""
          : Number(evt.target.value);
      }
      return e;
    });

    setState({
      ...state,
      digits: [...arr],
    });

    if (evt.target.value?.length > 0 && evt.target?.nextSibling && resIdx < 3) {
      evt.target.nextSibling.focus();
    }
  };
  const handleKeyDown = (evt) => {
    let resIdx = Number(evt.target.id);
    let oldArr = [...state.digits];

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

  const getOtp = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setVerifyMode(true);
    }, 1000);
  };

  useEffect(() => {
    let inp1 = document.getElementById("0");
    isLoginMode && isVerifyMode && inp1.focus();
  }, [isLoginMode, isVerifyMode]);

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <SwipeableDrawer
      PaperProps={{
        className: classes.drawerPaper,
      }}
      anchor="bottom"
      open={f_open}
      onClose={handleClose}
    >
      <div>
        <div className={classes.pascodeTxt}>
          {isLoginMode ? (isVerifyMode ? "Verify Otp" : "Login") : "Register"}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          {isLoginMode && isVerifyMode && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "18px",
              }}
            >
              <input
                className={classes.focusBorder}
                id="0"
                type="number"
                maxLength={1}
                value={state.digits[0]}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              <input
                className={classes.focusBorder}
                id="1"
                type="number"
                maxLength={1}
                value={state.digits[1]}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              <input
                className={classes.focusBorder}
                id="2"
                type="number"
                maxLength={1}
                value={state.digits[2]}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              <input
                className={classes.focusBorder}
                id="3"
                type="number"
                maxLength={1}
                value={state.digits[3]}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          )}
          {!isLoginMode && (
            <div
              style={{
                width: isLoginMode ? "55%" : "85%",
                display: "flex",
                justifyContent: "space-around",
                margin: "auto auto 1rem",
                padding: "8px",
                border: "1px solid lightgray",
                borderRadius: "7px",
                alignItems: "center",
                minWidth: "300px",
              }}
            >
              <PersonIcon
                style={{
                  width: "1rem",
                  color: "rgb(0 123 255)",
                  background: "rgba(0, 123, 255, 0.2)",
                  height: "1rem",
                  boxSizing: "content-box",
                  padding: "6px",
                  borderRadius: "50%",
                }}
              />
              <input
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: "0.9rem",
                  flexBasis: "84%",
                  letterSpacing: "1px",
                }}
                placeholder="Full Name"
                type="text"
              />
            </div>
          )}
          {(!isVerifyMode || !isLoginMode) && (
            <div
              style={{
                width: isLoginMode ? "55%" : "85%",
                display: "flex",
                justifyContent: "space-around",
                margin: "auto auto 1rem",
                padding: "8px",
                border: "1px solid lightgray",
                borderRadius: "7px",
                alignItems: "center",
                minWidth: "300px",
              }}
            >
              <PermPhoneMsgIcon
                style={{
                  width: "1rem",
                  color: "rgb(0 123 255)",
                  background: "rgba(0, 123, 255, 0.2)",
                  height: "1rem",
                  boxSizing: "content-box",
                  padding: "6px",
                  borderRadius: "50%",
                }}
              />
              <input
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: "0.9rem",
                  flexBasis: "84%",
                  letterSpacing: "1px",
                }}
                placeholder="Mobile No."
                type="number"
              />
            </div>
          )}
          {isLoginMode && isVerifyMode && (
            <div className={classes.resendCntr}>
              <Typography
                onClick={() => setVerifyMode(false)}
                style={{
                  fontSize: "12px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <EditIcon className={classes.resendEdtIcn} /> Change Number
              </Typography>
              <Typography style={{ fontSize: "12px" }}>Resend OTP</Typography>
            </div>
          )}
        </div>
        <div className={classes.checkoutCntr}>
          <Typography
            style={{
              padding: "0px 1rem",
              fontSize: "0.8rem",
              textAlign: "center",
              margin: "auto",
              marginBottom: "5px",
            }}
          >
            By Continuing, you agree to our Legal Terms and you are 18 years or
            older.
          </Typography>
          <Button onClick={getOtp} className={classes.checkoutBtn}>
            {loading ? (
              <CircularProgress
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  verticalAlign: "middle",
                }}
                color="white"
              />
            ) : isLoginMode ? (
              isVerifyMode ? (
                "Verify"
              ) : (
                "Get Otp"
              )
            ) : (
              "Submit"
            )}
          </Button>
          <Typography style={{ padding: "1rem", fontSize: "0.8rem" }}>
            {isLoginMode
              ? "Don't have an Account?"
              : "Already have an Account?"}{" "}
            <span
              style={{
                color: "rgb(0, 123, 255)",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={toggleMode}
            >
              {isLoginMode ? "Register" : "Login"}
            </span>
          </Typography>
        </div>
      </div>
    </SwipeableDrawer>
  );
}
