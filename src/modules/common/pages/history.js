import React, { useEffect, useState } from "react";
import { getHistoryApi } from "../../../apis/history";
import moment from "moment";

export default function History() {
  const [btn, setBtn] = useState("all");
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      let history = await getHistoryApi();

      if (history.data.status === 200) {
        setHistories(history.data.data);
      }
    };
    fetchHistory();
  }, []);


  return (
    <>
      <div className="col-12 col-sm-12 col-md-6 col-lg-4 mx-auto p-3 g-0">
        <div>
          <div className="d-flex align-items-center justify-content-start overflow-auto pt-3 px-0 container">
            <span
              onClick={() => {
                setBtn("all");
              }}
              className={`text-capitalize me-2 py-2 px-4 border text-dark badge rounded-pill ${
                btn == "all" ? "text-white bg-primary" : ""
              }`}
              style={{ cursor: "pointer" }}
            >
              All
            </span>
            <span
              onClick={() => {
                setBtn("classic");
              }}
              className={`text-capitalize me-2 py-2 px-4 border text-dark badge rounded-pill ${
                btn == "classic" ? "text-white bg-primary" : ""
              }`}
              style={{ cursor: "pointer" }}
            >
              classic
            </span>
            <span
              onClick={() => {
                setBtn("wallet");
              }}
              className={`text-capitalize me-2 py-2 px-4 border text-dark badge rounded-pill ${
                btn == "wallet" ? "text-white bg-primary" : ""
              }`}
              style={{ cursor: "pointer" }}
            >
              Wallet
            </span>
          </div>
          <div className="d-flex flex-column align-items-stretch px-0 py-3 overflow-auto container-fluid">
            {btn == "all" && (
              <ul className="list-group list-group-flush">
                {histories?.map((item) => {
                  return (
                    <div className="px-1 py-2 border-bottom">
                      <div className="d-flex align-items-stretch">
                        <div
                          className="d-flex flex-column align-items-start justify-content-center border-end "
                          style={{ width: "80px" }}
                        >
                          {item.type == "buy" && (
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACSVBMVEUAAADwSzbwSja2AAvvKTXvNzbSACDwSDb3qTv6qToNuJoA7P/wSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbrGjLvPTXwRjbwSDbwSTbwSDbwRzbvQDbtJzTwSDbwSTbwSDb3rjv3pTv1jTrzejjzdTj0gDn1lDr3pzv3rTv3qzv3qTv3pTv0fDn2lTr3qzv3qTv3qTv3qTv3qjv3qzv3qTv3qTv3qTv3qTv3qTv3qTv3qTv3qTv2pzr2pzr2pzr2pzr3qTv0nzfncyfndCjndCjndCjndCjznDbndCjndSjndSjndSjndSj6qTr7qTn9qTn7qTn4qTrznDbndCjndSjndSjndShJtII1tYoet5M2tYmrrlr7qTr4qTvndSjndSgNuJoNuJoMuJoMuJoNuJoJuJsLuJvhqkT4qTvndCjndCgNuJoNuJoNuJoNuJoGuJ3tqj73qTv3qTv2pjr2pjr2pjr2pjoNuJoNuJoNuJoNuJoMuJouto37qTkNuJoNuJoNuJoNuJoHuJz5qToNuJoNuJoNuJoNuJoNuJoNuJoHuJzsqkANuJoNuJoNuJoNuJoHuJ30qTz3qTv3qTv3qTsNuJoNuJoKuJv/pzH3qTv3qTv3qTsNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJr3qDv3qTv3qjvndSgNuJr///+r4Fh6AAAAvXRSTlMAAAAAAAAAAAAAAAAKNHe1siwPOnWmrYdJfIgCF0eDq6V2OxAxpwMdUIqnlV8nBharHQRPotrsu4hsZWZpbsmFXRw46/78/qJT/M7P/aN3entj+FqTtLWzkGLV+8Lrz0bAtMToYdfhJ6geTFdNRYTpweoJZ8/0/M1mU9+yjwV/+Pt8YPWbbG9wWkzt63zuTbWl+tU7jXTK8Gs+EmqtXLrLoy2dX/v6mnPiYCJUShUYudoUKLP5sScTYqnAYBFC3T/TAAAAAWJLR0TC/W++1AAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB+YMCgsrEMEWXbYAAAABb3JOVAHPoneaAAABW0lEQVQoz2NgQAaMjDy8fPwCgoxMqKJCwiKiYuISklKMjAhRaRlZOXkFRSVlRkYVVR6IBDOLmrqGppa2jq4eKxsDA7u+gSE7SJzDyNjE1MzcwtLK2gYMbO3sHRxBEk7Oe/e5uLrsg4P9+9zcQRIenvswgBcuCW/iJXx8/fz9/QMCMSSCgkNCw8LDIzAlIqOiY2IPxAElOOMTEpOS3WASKalp6RkgCS7uzKzsnNy8fISOgkKgBFdRcUlpWWl5RWUVzI7wsOrqGobauvqDBxsOHqxvbGoGu6qlta2trb2DobPr4MHunu6DB3v7+lH8MeHgwYmTJk+aePDglKkoEtMOTp8xc9bM2dMPzpnrgxxW8w5OnL9g4YL5Ew8uWrzEEwaWLmNYDrR4ReeKgwfLVq5a7QEDa9YyrFsPtGQD0Ir1G7lQEgbXps1bDgJdu3UbF5oE1/YdO3ft3L0HTRwA5ITtZ8Id6DEAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMTItMTBUMTE6NDM6MTQrMDA6MDCXK415AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTEyLTEwVDExOjQzOjE0KzAwOjAw5nY1xQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="></img>
                          )}
                          {item.type == "referal" && (
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACSVBMVEUAAADwSzbwSja2AAvvKTXvNzbSACDwSDb3qTv6qToNuJoA7P/wSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbrGjLvPTXwRjbwSDbwSTbwSDbwRzbvQDbtJzTwSDbwSTbwSDb3rjv3pTv1jTrzejjzdTj0gDn1lDr3pzv3rTv3qzv3qTv3pTv0fDn2lTr3qzv3qTv3qTv3qTv3qjv3qzv3qTv3qTv3qTv3qTv3qTv3qTv3qTv3qTv2pzr2pzr2pzr2pzr3qTv0nzfncyfndCjndCjndCjndCjznDbndCjndSjndSjndSjndSj6qTr7qTn9qTn7qTn4qTrznDbndCjndSjndSjndShJtII1tYoet5M2tYmrrlr7qTr4qTvndSjndSgNuJoNuJoMuJoMuJoNuJoJuJsLuJvhqkT4qTvndCjndCgNuJoNuJoNuJoNuJoGuJ3tqj73qTv3qTv2pjr2pjr2pjr2pjoNuJoNuJoNuJoNuJoMuJouto37qTkNuJoNuJoNuJoNuJoHuJz5qToNuJoNuJoNuJoNuJoNuJoNuJoHuJzsqkANuJoNuJoNuJoNuJoHuJ30qTz3qTv3qTv3qTsNuJoNuJoKuJv/pzH3qTv3qTv3qTsNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJr3qDv3qTv3qjvndSgNuJr///+r4Fh6AAAAvXRSTlMAAAAAAAAAAAAAAAAKNHe1siwPOnWmrYdJfIgCF0eDq6V2OxAxpwMdUIqnlV8nBharHQRPotrsu4hsZWZpbsmFXRw46/78/qJT/M7P/aN3entj+FqTtLWzkGLV+8Lrz0bAtMToYdfhJ6geTFdNRYTpweoJZ8/0/M1mU9+yjwV/+Pt8YPWbbG9wWkzt63zuTbWl+tU7jXTK8Gs+EmqtXLrLoy2dX/v6mnPiYCJUShUYudoUKLP5sScTYqnAYBFC3T/TAAAAAWJLR0TC/W++1AAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB+YMCgsrEMEWXbYAAAABb3JOVAHPoneaAAABW0lEQVQoz2NgQAaMjDy8fPwCgoxMqKJCwiKiYuISklKMjAhRaRlZOXkFRSVlRkYVVR6IBDOLmrqGppa2jq4eKxsDA7u+gSE7SJzDyNjE1MzcwtLK2gYMbO3sHRxBEk7Oe/e5uLrsg4P9+9zcQRIenvswgBcuCW/iJXx8/fz9/QMCMSSCgkNCw8LDIzAlIqOiY2IPxAElOOMTEpOS3WASKalp6RkgCS7uzKzsnNy8fISOgkKgBFdRcUlpWWl5RWUVzI7wsOrqGobauvqDBxsOHqxvbGoGu6qlta2trb2DobPr4MHunu6DB3v7+lH8MeHgwYmTJk+aePDglKkoEtMOTp8xc9bM2dMPzpnrgxxW8w5OnL9g4YL5Ew8uWrzEEwaWLmNYDrR4ReeKgwfLVq5a7QEDa9YyrFsPtGQD0Ir1G7lQEgbXps1bDgJdu3UbF5oE1/YdO3ft3L0HTRwA5ITtZ8Id6DEAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMTItMTBUMTE6NDM6MTQrMDA6MDCXK415AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTEyLTEwVDExOjQzOjE0KzAwOjAw5nY1xQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="></img>
                          )}
                          {(item.type === "won" ||
                            item.type === "lost" ||
                            item.type === "Game" ||
                            item.type === "cancelled") && (
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAC31BMVEUAAABkTZdfSJNSPIBTPoRhSZRPOHthSZVMNndJM3RYQJNUPoJHMXBgSJRGMG9POXw1IVdOOHtBKmk6KFg0IFc0IFZGMXBDKWZDLWo2IVgxHlNgSJNfR5JeRpFdRY9cRI1aQ4xZQopYQIhWP4ZVPoRTPYJSO4BiSpZgSJRfSJNeR5FdRZBUPYNSPIFROn9QOX1MNndiSpVgSJRgSJNOOHtNN3lLNXZiSpZhSZRgSJNMNndLNXVIM3JJM3RIMnJgSJRgSJNHMXBFMG5hSZREL2xCLWpfR5JeR5FDLWpCLGlAK2c/KmU9KWM8J2E7Jl9YQIg5JV5WP4Y4JFxVPoQ3I1pSPIE3Ilo2IllTPII2IVg0IFdQOX1OOHs1IVg1IVc1IVg1IVdNN3lLNXY1IFczH1VKNHVHMXA1IVhJM3RFMG5DLWpBLGg4JFs3Ilo2Ilg1IVczH1VDLms9KWM5JV43I1o1IVhcRI5aQ4xZQopYQYhWP4ZVPoReR5FdRZBUPYJSPIFRO39QOX1UPYNOOHtNN3ldRY9MNndLNHZSO4BROn9LNXZJM3RIMnJSOoFTPIFWQIJSPH9MNnlHMXBFMG5UPYRXQYWHd6e9tM/RzN3IwdaYi7JZRYJKNHVGMXBELmypnsD49/r5+fvi3unn5O38/P2pn71JNHRDLWpBLGjz8faPgaxZRIJeS4aWia9xYJJHMXFBLGlAK2dTPYG+tc////+9tM1LNXdJM3VIMXJCLWo/KmVYQ4TV0OCckLRJMnU9KGNROn5XQoLVz+BIMXM8J2FPOXy8tM29tc1KNHRFMG9DLm1DLWs7Jl9LNHeCcqD39vn08vaNgKdSPnlYRHyShapsXItAK2g5JV1OOXikmrr49/n5+Prf2+bl4uulm7c+KmU4JFtIMnNMNnV/cJy5scjOydnEvdCRhahPO3I+KWRGMHBDLWxEL21IM25EL2o+KGU+KGQ3IlpAK2Y4JFxLNXW0cFHeAAAAdnRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHO4vK7vz87suLOwcBMZ/q/v7qnzEBBmTi4mQGBXj09HgF9GQy4eEyBp8GPOnpO4rK7fz87e3KyoqK6ek7Bp8GMuHhMvRkBXh4BQXi4gEx6v7+6p8xAQfu7osHV73pggAAAAFiS0dEtEQJat0AAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAHdElNRQfmDAoLKQjgTKdiAAAAAW9yTlQBz6J3mgAAAcRJREFUKM9jYAACRiZpGVk5eQVFJWUVVTVmFgYoYFXX0NTSLiuvqKyq1tHV0zdgg4izGxoZ19RCxOvqGxpNTM04wOLmFpYw8SageHOLlbUNJ9AcLiPLmlZk8bZ2WztuHgZeeweYeF1HJ0i8q7vH0YmPwVkTZk5vX/+EiRNB4pMmu7gyuLlDxKdMnTZ9xsxZs+d098ydPM/Dk0EWqn7q/AULFy1esnQZUP285Su8GOSg5kxbsHLV6jVr160HiW/Y6M0gD7F30+YtW1u2bd+xHmjOzhUbd/kwKEDcs3vPlr37wPYCzdm4a78vgyLY/QcOHtqy9zBEfANQ/Igfgz/EX0ePbTl+Yv3JU6dB5uw/ciaAIRAcPs1nz52/cPHS5StXr4HFrwcxBEPCYduNm7du37m75N7G+yDxByEMqqHg8Ol6+Ojxk6fPnr94CRYPC2eI0IOGz6vXb96+e/8BLP4xMoqBPzqmBRI+QPd/Apv/+WNsnACDoJCp1Rdw+EDdAxSPTxAWYWDgSEyyhfsLbE58coooKAo5U+3SYP4CiacnQMQZGMQyMl2ysiHiObl5+QUisGQiLlHo6eVd5OtXHFQSXiopBRIDAFzvFot7h8bbAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTEyLTEwVDExOjQwOjQ2KzAwOjAwo2MpNwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0xMi0xMFQxMTo0MDo0NiswMDowMNI+kYsAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC"></img>
                          )}
                          {item.type == "withdraw" &&
                            item.status == "success" && (
                              <span
                                className="text-capitalize mb-1 badge rounded-pill bg-success"
                                style={{
                                  fontSize: "0.7rem",
                                  marginLeft: "-4px",
                                }}
                              >
                                SUCCESS
                              </span>
                            )}
                          {item.type == "withdraw" &&
                            item.status == "pending" && (
                              <span
                                className="text-capitalize mb-1 badge rounded-pill bg-primary"
                                style={{
                                  fontSize: "0.7rem",
                                  marginLeft: "-4px",
                                }}
                              >
                                PENDING
                              </span>
                            )}
                          {item.type == "withdraw" &&
                            item.status == "declined" && (
                              <span
                                className="text-capitalize mb-1 badge rounded-pill bg-danger"
                                style={{
                                  fontSize: "0.7rem",
                                  marginLeft: "-4px",
                                }}
                              >
                                DECLINED
                              </span>
                            )}
                          <span
                            className="text-start"
                            style={{ fontSize: "0.8rem" }}
                          >
                            {moment(item.createdAt).format("DD")}{" "}
                            {moment(item.createdAt).format("MMM")}
                          </span>
                          <span
                            className="text-start"
                            style={{ fontSize: "0.8rem" }}
                          >
                            {moment(item.createdAt).format("hh:mm a")}
                          </span>
                        </div>
                        <div className="d-flex flex-column align-items-stretch justify-content-center flex-1 w-100 px-2">
                          <div className="d-flex align-items-stretch justify-content-between">
                            <div className="d-flex flex-column">
                              <span
                                className="fw-semibold text-capitalize text-start"
                                style={{ fontSize: "0.9rem" }}
                              >
                                {item.historyText}
                              </span>
                            </div>
                            <div className="d-flex flex-column align-items-end justify-content-center">
                              {(item.type == "withdraw" ||
                                item.type === "Game" ||
                                item.type == "lost") && (
                                <span
                                  className="text-danger text-end fw-bold my-1"
                                  style={{ fontSize: "0.8rem" }}
                                >
                                  (-) {item.amount}
                                </span>
                              )}
                              {(item.type == "buy" ||
                                item.type == "won" ||
                                item.type == "referal") && (
                                <span
                                  className="text-success text-end fw-bold my-1"
                                  style={{ fontSize: "0.8rem" }}
                                >
                                  (+) {item.amount}
                                </span>
                              )}
                            </div>
                          </div>
                          {item.type === "lost" ||
                          item.type === "won" ||
                          item.type === "Game" ||
                          item.type === "cancelled" ? (
                            <div className="d-flex align-items-center justify-content-between">
                              <span
                                className="text-start text-capitalize"
                                style={{ fontSize: "0.7rem" }}
                              >
                                Room Code : {item.roomCode}
                              </span>
                              {item.type !== "cancelled" && (
                                <span
                                  className="text-start"
                                  style={{ fontSize: "0.7rem" }}
                                >
                                  Closing Balance: {item.closingBalance}
                                </span>
                              )}
                            </div>
                          ) : (
                            <div className="d-flex align-items-center justify-content-between">
                              <span
                                className="text-start text-capitalize"
                                style={{ fontSize: "0.7rem" }}
                              >
                                {/* UTR: 301342543352 */}
                              </span>
                              <span
                                className="text-start"
                                style={{ fontSize: "0.7rem" }}
                              >
                                Closing Balance: {item.closingBalance}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </ul>
            )}
            {btn == "wallet" && (
              <ul className="list-group list-group-flush">
                {histories?.map((item) => {
                  if (
                    item.type == "buy" ||
                    item.type == "withdraw" ||
                    item.type == "referal"
                  ) {
                    return (
                      <div className="px-1 py-2 border-bottom">
                        <div className="d-flex align-items-stretch">
                          <div
                            className="d-flex flex-column align-items-start justify-content-center border-end "
                            style={{ width: "80px" }}
                          >
                            {item.type == "buy" && (
                              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACSVBMVEUAAADwSzbwSja2AAvvKTXvNzbSACDwSDb3qTv6qToNuJoA7P/wSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbrGjLvPTXwRjbwSDbwSTbwSDbwRzbvQDbtJzTwSDbwSTbwSDb3rjv3pTv1jTrzejjzdTj0gDn1lDr3pzv3rTv3qzv3qTv3pTv0fDn2lTr3qzv3qTv3qTv3qTv3qjv3qzv3qTv3qTv3qTv3qTv3qTv3qTv3qTv3qTv2pzr2pzr2pzr2pzr3qTv0nzfncyfndCjndCjndCjndCjznDbndCjndSjndSjndSjndSj6qTr7qTn9qTn7qTn4qTrznDbndCjndSjndSjndShJtII1tYoet5M2tYmrrlr7qTr4qTvndSjndSgNuJoNuJoMuJoMuJoNuJoJuJsLuJvhqkT4qTvndCjndCgNuJoNuJoNuJoNuJoGuJ3tqj73qTv3qTv2pjr2pjr2pjr2pjoNuJoNuJoNuJoNuJoMuJouto37qTkNuJoNuJoNuJoNuJoHuJz5qToNuJoNuJoNuJoNuJoNuJoNuJoHuJzsqkANuJoNuJoNuJoNuJoHuJ30qTz3qTv3qTv3qTsNuJoNuJoKuJv/pzH3qTv3qTv3qTsNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJr3qDv3qTv3qjvndSgNuJr///+r4Fh6AAAAvXRSTlMAAAAAAAAAAAAAAAAKNHe1siwPOnWmrYdJfIgCF0eDq6V2OxAxpwMdUIqnlV8nBharHQRPotrsu4hsZWZpbsmFXRw46/78/qJT/M7P/aN3entj+FqTtLWzkGLV+8Lrz0bAtMToYdfhJ6geTFdNRYTpweoJZ8/0/M1mU9+yjwV/+Pt8YPWbbG9wWkzt63zuTbWl+tU7jXTK8Gs+EmqtXLrLoy2dX/v6mnPiYCJUShUYudoUKLP5sScTYqnAYBFC3T/TAAAAAWJLR0TC/W++1AAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB+YMCgsrEMEWXbYAAAABb3JOVAHPoneaAAABW0lEQVQoz2NgQAaMjDy8fPwCgoxMqKJCwiKiYuISklKMjAhRaRlZOXkFRSVlRkYVVR6IBDOLmrqGppa2jq4eKxsDA7u+gSE7SJzDyNjE1MzcwtLK2gYMbO3sHRxBEk7Oe/e5uLrsg4P9+9zcQRIenvswgBcuCW/iJXx8/fz9/QMCMSSCgkNCw8LDIzAlIqOiY2IPxAElOOMTEpOS3WASKalp6RkgCS7uzKzsnNy8fISOgkKgBFdRcUlpWWl5RWUVzI7wsOrqGobauvqDBxsOHqxvbGoGu6qlta2trb2DobPr4MHunu6DB3v7+lH8MeHgwYmTJk+aePDglKkoEtMOTp8xc9bM2dMPzpnrgxxW8w5OnL9g4YL5Ew8uWrzEEwaWLmNYDrR4ReeKgwfLVq5a7QEDa9YyrFsPtGQD0Ir1G7lQEgbXps1bDgJdu3UbF5oE1/YdO3ft3L0HTRwA5ITtZ8Id6DEAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMTItMTBUMTE6NDM6MTQrMDA6MDCXK415AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTEyLTEwVDExOjQzOjE0KzAwOjAw5nY1xQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="></img>
                            )}
                            {item.type == "referal" && (
                              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACSVBMVEUAAADwSzbwSja2AAvvKTXvNzbSACDwSDb3qTv6qToNuJoA7P/wSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbrGjLvPTXwRjbwSDbwSTbwSDbwRzbvQDbtJzTwSDbwSTbwSDb3rjv3pTv1jTrzejjzdTj0gDn1lDr3pzv3rTv3qzv3qTv3pTv0fDn2lTr3qzv3qTv3qTv3qTv3qjv3qzv3qTv3qTv3qTv3qTv3qTv3qTv3qTv3qTv2pzr2pzr2pzr2pzr3qTv0nzfncyfndCjndCjndCjndCjznDbndCjndSjndSjndSjndSj6qTr7qTn9qTn7qTn4qTrznDbndCjndSjndSjndShJtII1tYoet5M2tYmrrlr7qTr4qTvndSjndSgNuJoNuJoMuJoMuJoNuJoJuJsLuJvhqkT4qTvndCjndCgNuJoNuJoNuJoNuJoGuJ3tqj73qTv3qTv2pjr2pjr2pjr2pjoNuJoNuJoNuJoNuJoMuJouto37qTkNuJoNuJoNuJoNuJoHuJz5qToNuJoNuJoNuJoNuJoNuJoNuJoHuJzsqkANuJoNuJoNuJoNuJoHuJ30qTz3qTv3qTv3qTsNuJoNuJoKuJv/pzH3qTv3qTv3qTsNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJr3qDv3qTv3qjvndSgNuJr///+r4Fh6AAAAvXRSTlMAAAAAAAAAAAAAAAAKNHe1siwPOnWmrYdJfIgCF0eDq6V2OxAxpwMdUIqnlV8nBharHQRPotrsu4hsZWZpbsmFXRw46/78/qJT/M7P/aN3entj+FqTtLWzkGLV+8Lrz0bAtMToYdfhJ6geTFdNRYTpweoJZ8/0/M1mU9+yjwV/+Pt8YPWbbG9wWkzt63zuTbWl+tU7jXTK8Gs+EmqtXLrLoy2dX/v6mnPiYCJUShUYudoUKLP5sScTYqnAYBFC3T/TAAAAAWJLR0TC/W++1AAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB+YMCgsrEMEWXbYAAAABb3JOVAHPoneaAAABW0lEQVQoz2NgQAaMjDy8fPwCgoxMqKJCwiKiYuISklKMjAhRaRlZOXkFRSVlRkYVVR6IBDOLmrqGppa2jq4eKxsDA7u+gSE7SJzDyNjE1MzcwtLK2gYMbO3sHRxBEk7Oe/e5uLrsg4P9+9zcQRIenvswgBcuCW/iJXx8/fz9/QMCMSSCgkNCw8LDIzAlIqOiY2IPxAElOOMTEpOS3WASKalp6RkgCS7uzKzsnNy8fISOgkKgBFdRcUlpWWl5RWUVzI7wsOrqGobauvqDBxsOHqxvbGoGu6qlta2trb2DobPr4MHunu6DB3v7+lH8MeHgwYmTJk+aePDglKkoEtMOTp8xc9bM2dMPzpnrgxxW8w5OnL9g4YL5Ew8uWrzEEwaWLmNYDrR4ReeKgwfLVq5a7QEDa9YyrFsPtGQD0Ir1G7lQEgbXps1bDgJdu3UbF5oE1/YdO3ft3L0HTRwA5ITtZ8Id6DEAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMTItMTBUMTE6NDM6MTQrMDA6MDCXK415AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTEyLTEwVDExOjQzOjE0KzAwOjAw5nY1xQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="></img>
                            )}
                            {(item.type == "won" ||
                              item.type == "lost" ||
                              item.type == "cancelled") && (
                              <img src="data:image/png;base64,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"></img>
                            )}
                            {item.type == "withdraw" &&
                              item.status == "success" && (
                                <span
                                  className="text-capitalize mb-1 badge rounded-pill bg-success"
                                  style={{
                                    fontSize: "0.7rem",
                                    marginLeft: "-4px",
                                  }}
                                >
                                  SUCCESS
                                </span>
                              )}
                            {item.type == "withdraw" &&
                              item.status == "pending" && (
                                <span
                                  className="text-capitalize mb-1 badge rounded-pill bg-primary"
                                  style={{
                                    fontSize: "0.7rem",
                                    marginLeft: "-4px",
                                  }}
                                >
                                  pending
                                </span>
                              )}
                            <span
                              className="text-start"
                              style={{ fontSize: "0.8rem" }}
                            >
                              {moment(item.createdAt).format("DD")}{" "}
                              {moment(item.createdAt).format("MMM")}
                            </span>
                            <span
                              className="text-start"
                              style={{ fontSize: "0.8rem" }}
                            >
                              {moment(item.createdAt).format("hh:mm a")}
                            </span>
                          </div>
                          <div className="d-flex flex-column align-items-stretch justify-content-center flex-1 w-100 px-2">
                            <div className="d-flex align-items-stretch justify-content-between">
                              <div className="d-flex flex-column">
                                <span
                                  className="fw-semibold text-capitalize text-start"
                                  style={{ fontSize: "0.9rem" }}
                                >
                                  {item.historyText}
                                </span>
                              </div>
                              <div className="d-flex flex-column align-items-end justify-content-center">
                                {(item.type == "withdraw" ||
                                  item.type == "Game" ||
                                  item.type == "lost") && (
                                  <span
                                    className="text-danger text-end fw-bold my-1"
                                    style={{ fontSize: "0.8rem" }}
                                  >
                                    (-) {item.amount}
                                  </span>
                                )}
                                {(item.type == "buy" ||
                                  item.type == "referal") && (
                                  <span
                                    className="text-success text-end fw-bold my-1"
                                    style={{ fontSize: "0.8rem" }}
                                  >
                                    (+) {item.amount}
                                  </span>
                                )}
                              </div>
                            </div>
                            {item.type == "lost" ||
                            item.type == "won" ||
                            item.type == "cancelled" ? (
                              <div className="d-flex align-items-center justify-content-between">
                                <span
                                  className="text-start text-capitalize"
                                  style={{ fontSize: "0.7rem" }}
                                >
                                  Room Code : 090078601
                                </span>
                              </div>
                            ) : (
                              <div className="d-flex align-items-center justify-content-between">
                                <span
                                  className="text-start text-capitalize"
                                  style={{ fontSize: "0.7rem" }}
                                >
                                  UTR: 301342543352
                                </span>
                                <span
                                  className="text-start"
                                  style={{ fontSize: "0.7rem" }}
                                >
                                  Closing Balance: {item.closingBalance}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </ul>
            )}
            {btn == "classic" && (
              <ul className="list-group list-group-flush">
                {histories?.map((item) => {
                  if (
                    item.type == "cancelled" ||
                    item.type == "won" ||
                    item.type == "Game" ||
                    item.type == "lost"
                  ) {
                    return (
                      <div className="px-1 py-2 border-bottom">
                        <div className="d-flex align-items-stretch">
                          <div
                            className="d-flex flex-column align-items-start justify-content-center border-end "
                            style={{ width: "80px" }}
                          >
                            {item.type == "buy" && (
                              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACSVBMVEUAAADwSzbwSja2AAvvKTXvNzbSACDwSDb3qTv6qToNuJoA7P/wSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbwSzbrGjLvPTXwRjbwSDbwSTbwSDbwRzbvQDbtJzTwSDbwSTbwSDb3rjv3pTv1jTrzejjzdTj0gDn1lDr3pzv3rTv3qzv3qTv3pTv0fDn2lTr3qzv3qTv3qTv3qTv3qjv3qzv3qTv3qTv3qTv3qTv3qTv3qTv3qTv3qTv2pzr2pzr2pzr2pzr3qTv0nzfncyfndCjndCjndCjndCjznDbndCjndSjndSjndSjndSj6qTr7qTn9qTn7qTn4qTrznDbndCjndSjndSjndShJtII1tYoet5M2tYmrrlr7qTr4qTvndSjndSgNuJoNuJoMuJoMuJoNuJoJuJsLuJvhqkT4qTvndCjndCgNuJoNuJoNuJoNuJoGuJ3tqj73qTv3qTv2pjr2pjr2pjr2pjoNuJoNuJoNuJoNuJoMuJouto37qTkNuJoNuJoNuJoNuJoHuJz5qToNuJoNuJoNuJoNuJoNuJoNuJoHuJzsqkANuJoNuJoNuJoNuJoHuJ30qTz3qTv3qTv3qTsNuJoNuJoKuJv/pzH3qTv3qTv3qTsNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJoNuJr3qDv3qTv3qjvndSgNuJr///+r4Fh6AAAAvXRSTlMAAAAAAAAAAAAAAAAKNHe1siwPOnWmrYdJfIgCF0eDq6V2OxAxpwMdUIqnlV8nBharHQRPotrsu4hsZWZpbsmFXRw46/78/qJT/M7P/aN3entj+FqTtLWzkGLV+8Lrz0bAtMToYdfhJ6geTFdNRYTpweoJZ8/0/M1mU9+yjwV/+Pt8YPWbbG9wWkzt63zuTbWl+tU7jXTK8Gs+EmqtXLrLoy2dX/v6mnPiYCJUShUYudoUKLP5sScTYqnAYBFC3T/TAAAAAWJLR0TC/W++1AAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB+YMCgsrEMEWXbYAAAABb3JOVAHPoneaAAABW0lEQVQoz2NgQAaMjDy8fPwCgoxMqKJCwiKiYuISklKMjAhRaRlZOXkFRSVlRkYVVR6IBDOLmrqGppa2jq4eKxsDA7u+gSE7SJzDyNjE1MzcwtLK2gYMbO3sHRxBEk7Oe/e5uLrsg4P9+9zcQRIenvswgBcuCW/iJXx8/fz9/QMCMSSCgkNCw8LDIzAlIqOiY2IPxAElOOMTEpOS3WASKalp6RkgCS7uzKzsnNy8fISOgkKgBFdRcUlpWWl5RWUVzI7wsOrqGobauvqDBxsOHqxvbGoGu6qlta2trb2DobPr4MHunu6DB3v7+lH8MeHgwYmTJk+aePDglKkoEtMOTp8xc9bM2dMPzpnrgxxW8w5OnL9g4YL5Ew8uWrzEEwaWLmNYDrR4ReeKgwfLVq5a7QEDa9YyrFsPtGQD0Ir1G7lQEgbXps1bDgJdu3UbF5oE1/YdO3ft3L0HTRwA5ITtZ8Id6DEAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMTItMTBUMTE6NDM6MTQrMDA6MDCXK415AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTEyLTEwVDExOjQzOjE0KzAwOjAw5nY1xQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="></img>
                            )}
                            {(item.type == "won" ||
                              item.type == "lost" ||
                              item.type == "cancelled") && (
                              <img src="data:image/png;base64,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"></img>
                            )}
                            {item.type == "withdraw" && (
                              <span
                                className="text-capitalize mb-1 badge rounded-pill bg-success"
                                style={{
                                  fontSize: "0.7rem",
                                  marginLeft: "-4px",
                                }}
                              >
                                SUCCESS
                              </span>
                            )}
                            <span
                              className="text-start"
                              style={{ fontSize: "0.8rem" }}
                            >
                              {moment(item.createdAt).format("DD")}{" "}
                              {moment(item.createdAt).format("MMM")}
                            </span>
                            <span
                              className="text-start"
                              style={{ fontSize: "0.8rem" }}
                            >
                              {moment(item.createdAt).format("hh:mm a")}
                            </span>
                          </div>
                          <div className="d-flex flex-column align-items-stretch justify-content-center flex-1 w-100 px-2">
                            <div className="d-flex align-items-stretch justify-content-between">
                              <div className="d-flex flex-column">
                                <span
                                  className="fw-semibold text-capitalize text-start"
                                  style={{ fontSize: "0.9rem" }}
                                >
                                  {item.historyText}
                                </span>
                              </div>
                              <div className="d-flex flex-column align-items-end justify-content-center">
                                {(item.type == "withdraw" ||
                                  item.type == "Game" ||
                                  item.type == "lost") && (
                                  <span
                                    className="text-danger text-end fw-bold my-1"
                                    style={{ fontSize: "0.8rem" }}
                                  >
                                    (-) {item.amount}
                                  </span>
                                )}
                                {item.type == "buy" ||
                                  (item.type == "won" && (
                                    <span
                                      className="text-success text-end fw-bold my-1"
                                      style={{ fontSize: "0.8rem" }}
                                    >
                                      (+) {item.amount}
                                    </span>
                                  ))}
                              </div>
                            </div>
                            {item.type == "lost" ||
                            item.type == "won" ||
                            item.type == "Game" ||
                            item.type == "cancelled" ? (
                              <div className="d-flex align-items-center justify-content-between">
                                <span
                                  className="text-start text-capitalize"
                                  style={{ fontSize: "0.7rem" }}
                                >
                                  Room Code : 090078601
                                </span>

                                {item.type !== "cancelled" && (
                                  <span
                                    className="text-start"
                                    style={{ fontSize: "0.7rem" }}
                                  >
                                    Closing Balance: {item.closingBalance}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <div className="d-flex align-items-center justify-content-between">
                                <span
                                  className="text-start text-capitalize"
                                  style={{ fontSize: "0.7rem" }}
                                >
                                  UTR: 301342543352
                                </span>
                                <span
                                  className="text-start"
                                  style={{ fontSize: "0.7rem" }}
                                >
                                  Closing Balance: {item.closingBalance}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
