import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { BsClockFill } from "react-icons/bs";
import { timerApiHoldReq } from "../../../apis/challenge";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const ClockTimer = ({ startingTime, challengeObj }) => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [ReqSent, setReqSent] = useState(false);
  const [remainingTime, setRemainingTime] = useState(() => {
    const storedRemainingTime = localStorage.getItem("remainingTime");
    return storedRemainingTime
      ? parseInt(storedRemainingTime, 10)
      : startingTime * 30;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setRemainingTime((prevTime) => {
        if (prevTime === 1 && !ReqSent) {
          timerApiHoldReq(challengeObj);
          dispatch({ type: "display_timer", payload: false });
          setReqSent(true);
          localStorage.removeItem("remainingTime");
          navigate("/play");
          return 0;
        }
        if (prevTime >= 0) {
          return prevTime - 1;
        }
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      localStorage.removeItem("remainingTime");
    };
  }, []);

  useEffect(() => {
    if (remainingTime !== undefined && remainingTime !== null) {
      localStorage.setItem("remainingTime", remainingTime.toString());
    }
  }, [remainingTime]);

  if (remainingTime === undefined || remainingTime === null) {
    return null; // or any fallback UI when remainingTime is not available
  }

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="py-1 bg-white border px-2 text-dark d-flex align-items-center rounded-2">
      <BsClockFill className="me-2" color="red" />
      <Typography component="div" style={{ color: "black" }}>
        <strong className="ml-2">{formattedTime}</strong>
      </Typography>
    </div>
  );
};

export { ClockTimer };
