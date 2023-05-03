import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import getHeader from "../components/session";
import {API_URL} from "../components/url";

export default function HistoryComponent({ user }) {
  const [historys, setHistorys] = useState([]);

  useEffect(async () => {
    const response = await fetch(`${API_URL}/user/history`, {
      headers: getHeader(),
    });
    const responseBody = await response.json();
    console.log(responseBody);
    setHistorys(responseBody);
  }, []);

  function Won({ history }) {
    return (
      <span className="text-success">
        <b>+₹{history.amount}</b>
      </span>
    );
  }
  function Lost({ history }) {
    return (
      <span className="text-danger">
        <b>-₹{history.amount}</b>
      </span>
    );
  }
  function Canceled() {
    return (
      <span className="text-danger">
        <b>Cancelled</b>
      </span>
    );
  }

  return (
    <main className="py-4">
      <ul className="list-group text-center">
        <li>
          <div>
            <b>Referral Earning:</b> {user.referBallance} | <b>Penalty:</b>{" "}
            {user?.playerInfo?.totalPenalty} | <b>Referred:</b>{" "}
            {user.totalRefer}
          </div>
        </li>
        {historys.map((history) => {
          const date = new Date(history.createdAt);
          return (
            <li className="list-group-item history-list">
              <div>
                <small className="text-muted">
                  {date.getFullYear() +
                    "-" +
                    (date.getMonth() + 1) +
                    "-" +
                    date.getDate() +
                    "  " +
                    date.getHours() +
                    ":" +
                    date.getMinutes() +
                    ":" +
                    date.getSeconds()}
                </small>
                <br />
                <div className="challengeText">{history.naration}</div>
                <div className="challengeHistory">
                  {history.historyType === "win" ||
                  history.historyType == "buy" ||
                  history.historyType == "refer" ? (
                    <Won history={history} />
                  ) : history.historyType === "lose" ||
                    history.historyType == "sell" ||
                    history.historyType == "penalty" ? (
                    <Lost history={history} />
                  ) : (
                    <Canceled />
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
