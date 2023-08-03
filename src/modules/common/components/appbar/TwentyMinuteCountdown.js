import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { BsClockFill } from "react-icons/bs";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const TwentyMinuteCountdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCountdownComplete = () => {
    // timerApiHoldReq(challengeObj);
    dispatch({ type: "display_timer", payload: false });
    navigate("/play");
    localStorage.removeItem("countdownEndTime");
    // Perform any actions you want to take after the countdown completes
    console.log("Countdown complete!");
  };

  const storedEndTime = localStorage.getItem("countdownEndTime");
  const initialEndTime = Date.now() + 4 * 60 * 1000; 
  const [endTime, setEndTime] = useState(storedEndTime || initialEndTime);

  useEffect(() => {
    localStorage.setItem("countdownEndTime", endTime.toString());
  }, [endTime]);

  return (
    <div className="py-1 bg-white border px-2 text-dark d-flex align-items-center rounded-2">
      <BsClockFill className="me-2" color="red" />
      <strong className="ml-2">
        <Countdown
          date={parseInt(endTime)}
          onComplete={handleCountdownComplete}
          renderer={({ minutes, seconds }) => (
            <span>
              {minutes}:{seconds}
            </span>
          )}
        />
      </strong>
    </div>
  );
};

export default TwentyMinuteCountdown;
