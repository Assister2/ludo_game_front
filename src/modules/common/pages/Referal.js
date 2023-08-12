import React from "react";

import { useSelector } from "react-redux";
import { FaTelegram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { TelegramShareButton, WhatsappShareButton } from "react-share";

export default function ReferAndEarning() {
  let userData = useSelector((state) => state.user);
  const showToast = () => {
    toast.success("Text copied!");
  };

  const shareMessage =
    "Play Ludo and earn Rs10000 daily.\nCommission Charge - 3% Only\nReferral - 2% On All Games\n24x7 Live Chat Support\nInstant Withdrawal Via UPI/Bank\nRegister Now, My refer code is " +
    userData.data.referCode +
    "\n👇👇\n" +
    window.location.origin +
    "/register?refer=" +
    userData.data.referCode;
  const share = async () => {
    try {
      await navigator.share({
        title: "Share via",
        text: shareMessage,
        url: window.location.origin,
      });
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  const handleClick = () => {
    if (navigator.share) {
      share();
    } else {
      const url = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
      window.open(url, "_blank");
    }
  };

  return (
    <>
      <div className="col-12 col-sm-12 col-md-6 col-lg-4 mx-auto p-3 g-0">
        <div className="mb-3 shadow card">
          <div className="bg-light text-dark text-capitalize card-header">
            Your Referral Earnings
          </div>

          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex flex-column border-end flex-grow-1 align-items-center justify-content-center">
                <span className="text-capitalize fw-bold">
                  referred players
                </span>
                <span>
                  {userData?.data?.totalRefer ? userData?.data?.totalRefer : 0}
                </span>
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
                <span className="text-capitalize fw-bold">
                  Referral Earning
                </span>
                <span>₹{userData?.data?.account?.referelBalance}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3 shadow card">
          <div className="bg-light text-dark text-capitalize card-header">
            Referral Code
          </div>

          <div className="card-body">
            <div>
              <div>
                <img
                  src="	https://ludo-players.s3.ap-south-1.amazonaws.com/cdn/lp/illustrations/refer.webp "
                  alt="refer"
                  className="w-75"
                ></img>
              </div>
              <div>
                <div>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control p-2"
                      disabled
                      value={userData.data.referCode}
                    />
                    <CopyToClipboard onCopy={showToast} options={shareMessage}>
                      <button className="btn btn-primary text-uppercase">
                        copy
                      </button>
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
              <p className="text-uppercase fw-bold fs-3 p-0 m-0 my-3">or</p>

              <div className="d-grid">
                <button
                  className="btn btn-primary btn-md w-100"
                  style={{ backgroundColor: "green", borderColor: "green" }}
                >
                  <WhatsappShareButton url={shareMessage} quote={shareMessage}>
                    <FaWhatsapp
                      style={{ paddingRight: "5px" }}
                      size={25}
                      round
                    />
                    <span className="text-capitalize">Share to Whatsapp</span>
                  </WhatsappShareButton>
                </button>
              </div>
              <div className="d-grid mt-2">
                <button
                  className="btn btn-primary btn-md w-100"
                  style={{ height: "38px" }}
                >
                  <TelegramShareButton url={shareMessage} quote={shareMessage}>
                    <FaTelegram
                      style={{ paddingRight: "8px" }}
                      size={25}
                      round
                    />
                    <span className="text-capitalize">Share to Telegram</span>
                  </TelegramShareButton>
                </button>
              </div>
              <div className="d-grid mt-2">
                <a href="#">
                  <CopyToClipboard text={shareMessage} onCopy={showToast}>
                    <button className="btn btn-secondary btn-md w-100">
                      <span className="text-capitalize">copy to clipboard</span>
                    </button>
                  </CopyToClipboard>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3  card">
          <div className="bg-light text-dark text-capitalize card-header">
            How It Works
          </div>

          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item">
                You can refer and <b>Earn 2%</b> of your referral winning, every
                time
              </li>
              <li className="list-group-item">
                Like if your player plays for <b>₹10000</b> and wins, You will
                get <b style={{ color: "green" }}>₹200</b> as referral amount.
              </li>{" "}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
