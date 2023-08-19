import React from "react";
import CircularLoading from "./../../atoms/CircularLoading";
import { BiDollarCircle } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";
import { AiFillWarning } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../../../../../redux/actions/auth";


export default function Metrics() {
  const { isLoading } = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutRequest());

    // cogoToast.success("Logged out")
  };

  let { data } = useSelector((state) => state.user);

  return (
    <div className="col-12 col-sm-10 col-md-7 col-lg-12 mx-auto p-3 g-0">
      <div className="mb-3 shadow card">
        <div className="bg-light text-dark text-capitalize card-header">
          Metrics
        </div>
        <div className="card-body">
          <div className="g-0 gx-2 mb-2 row">
            <div className="col">
              <div className="d-flex flex-column align-items-stretch justify-content-start h-100 w-100 card">
                <div
                  style={{ fontSize: "0.9rem" }}
                  className="text-capitalize text-start px-2 card-header"
                >
                  <div className="hstack gap-1 minBreakpoint-xs">
                    <img
                      alt="icon"
                      width={"16px"}
                      src="https://ludoplayers.com/static/media/sword.9cc91e4925dc62491c20.webp"
                    />
                    <span>games played</span>
                  </div>
                </div>
                <div className="fs-5 fw-semibold text-start py-1 px-2 card-body">
                  {data?.gamesPlayed}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex flex-column align-items-stretch justify-content-start h-100 w-100 card">
                <div
                  style={{ fontSize: "0.9rem" }}
                  className="text-capitalize text-start px-2 card-header"
                >
                  <div className="hstack gap-1 minBreakpoint-xs">
                    <BiDollarCircle />
                    <span>Chips won</span>
                  </div>
                </div>
                <div className="fs-5 fw-semibold text-start py-1 px-2 card-body">
                  {data?.account?.totalWin.toFixed(
                    data?.account?.totalWin % 1 !== 0 ? 2 : 0
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="g-0 gx-2 mb-2 row">
            <div className="col">
              <div className="d-flex flex-column align-items-stretch justify-content-start h-100 w-100 card">
                <div
                  style={{ fontSize: "0.9rem" }}
                  className="text-capitalize text-start px-2 card-header"
                >
                  <div className="hstack gap-1 minBreakpoint-xs">
                    <HiUsers />
                    <span>Referal Earning</span>
                  </div>
                </div>
                <div className="fs-5 fw-semibold text-start py-1 px-2 card-body">
                  {data?.account?.referelBalance?.toFixed(
                    data?.account?.referelBalance % 1 !== 0 ? 2 : 0
                  )}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex flex-column align-items-stretch justify-content-start h-100 w-100 card">
                <div
                  style={{ fontSize: "0.9rem" }}
                  className="text-capitalize text-start px-2 card-header"
                >
                  <div className="hstack gap-1 minBreakpoint-xs">
                    <AiFillWarning />
                    <span>Penalty</span>
                  </div>
                </div>
                <div className="fs-5 fw-semibold text-start py-1 px-2 card-body">
                  {data?.account?.totalPenalty?.toFixed(
                    data?.account?.totalPenalty % 1 !== 0 ? 2 : 0
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-grid py-2">
        <button
          type="button"
          onClick={logout}
          className="text-capitalize btn btn-outline-danger"
        >
          {isLoading ? (
            <CircularLoading
              height={"1.5rem"}
              width={"1.5rem"}
              color={"white"}
            />
          ) : (
            "LOG OUT"
          )}
        </button>
      </div>
    </div>
  );
}
