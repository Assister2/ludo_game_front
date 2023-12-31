import React, { useEffect, useState } from "react";
import { getHistoryApi } from "../../../apis/history";
import AppLayout from "../layout/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import All from "./history/tabs/All";
import Wallet from "./history/tabs/Wallet";
import Classic from "./history/tabs/Classic";
import {
  getHistoryLoading,
  getHistorySuccess,
} from "../../../redux/actions/history";
import CircularLoading from "../components/atoms/CircularLoading";
import { centerDivStyle } from "../../../App";

const tabs = [
  {
    name: "All",
    value: "all",
  },
  {
    name: "Classic",
    value: "classic",
  },
  {
    name: "Wallet",
    value: "wallet",
  },
];
export default function History() {
  const dispatch = useDispatch();

  const [btn, setBtn] = useState("all");
  const isLoading = useSelector((state) => state.history.isLoading);

  useEffect(() => {
    const fetchHistory = async () => {
      dispatch(getHistoryLoading(true));
      let history = await getHistoryApi();

      if (history.data.status === 200) {
        dispatch(getHistorySuccess(history.data.data));
      }
      dispatch(getHistoryLoading(false));
    };
    fetchHistory();
  }, []);

  return (
    <AppLayout>
      <div className="col-12 col-sm-10 col-md-7 col-lg-12 mx-auto p-3 g-0">
        {isLoading ? (
          <div style={centerDivStyle}>
            <CircularLoading color="#0D6EFD" />
          </div>
        ) : (
          <div>
            <div className="d-flex align-items-center justify-content-start overflow-auto pt-3 px-0 container">
              {tabs?.map((tab) => (
                <span
                  key={tab.value}
                  onClick={() => {
                    setBtn(tab.value);
                  }}
                  className={`text-capitalize me-2 py-2 px-4 border text-dark badge rounded-pill ${
                    btn == tab.value ? "text-white bg-primary" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  {tab.name}
                </span>
              ))}
            </div>
            <div className="d-flex flex-column align-items-stretch px-0 py-3 overflow-auto container-fluid">
              {btn == "all" && <All />}
              {btn == "wallet" && <Wallet />}
              {btn == "classic" && <Classic />}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
