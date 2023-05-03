import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { API_URL } from "./url";
import { CDN_URL } from "../config";
import LoginDrawer from "./LoginDrawer";

export default function LandingPage() {
  const [activity, setActivity] = useState(0);
  const [f_open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleLogin = () => setOpen(true);

  const activities = [
    {
      text: "You Play! 🎲",
      color: "#007bff",
    },
    {
      text: "Win Cash! 💰",
      color: "#10e610",
    },
    {
      text: "Be a King! 👑",
      color: "#ffe769",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setActivity((activity + 1) % activities.length);
    }, 2000);
  }, [activity]);

  return (
    <div style={{ height: "100vh" }}>
      <div className="partials">
        <LoginDrawer f_open={f_open} handleClose={handleClose} />
      </div>
      <div
        style={{
          color: "white",
          position: "absolute",
          right: "0",
          padding: "14px 10px",
          background: "#007BFF",
          top: "1rem",
          borderTopLeftRadius: "8px",
          borderBottomLeftRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <i style={{ fontSize: "1.3rem" }} className="fas fa-puzzle-piece"></i>
      </div>
      <div
        style={{
          position: "absolute",
          margin: "auto",
          height: "fit-content",
          top: "-5rem",
          right: "0px",
          bottom: "0px",
          left: "0px",
        }}
      >
        <h4
          style={{
            color: "white",
            fontFamily: "Bangers, cursive",
            marginTop: "2rem",
          }}
        >
          Welcome to Ludo OFL KINGS
        </h4>
        <img
          style={{
            width: "100%",
            maxWidth: "35rem",
          }}
          className="img-fluid"
          src={`${CDN_URL}images/ludo-landing.png`}
          alt=""
        />
        <h2
          style={{
            color: activities[activity]?.color,
            fontFamily: "Bangers, cursive",
            marginTop: "2rem",
          }}
        >
          {activities[activity]?.text}
        </h2>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Button
          onClick={handleLogin}
          style={{ width: "90%", fontSize: "1rem", fontWeight: "600" }}
        >
          Play Now! 🎲
        </Button>
      </div>
    </div>
  );
}
