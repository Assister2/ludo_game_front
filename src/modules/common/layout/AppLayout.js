import React from "react";
import Header from "../components/appbar/AppBar";

const AppLayout = ({ children }) => {
  return (
    <>
      <div className="AppLayout">
        <Header />
        {children}
      </div>
      <div
        className="d-lg-block d-none position-fixed top-0 bottom-0"
        style={{
          left: "480px",
          backgroundColor: "rgb(224, 224, 224)",
          width: "10px",
          zIndex: "5",
        }}
      ></div>
      <div className="position-fixed top-0 bottom-0 end-0 bg-white overflow-hidden rightContainer d-lg-block d-none">
        <div className="rcBanner d-flex align-items-center justify-content-center w-100 h-100 left-0 position-absolute">
          <picture className="rcBanner-img-container position-absolute">
            <img
              src="https://ludo3.s3.ap-south-1.amazonaws.com/logo.webp"
              alt="Logo"
            />
          </picture>
          <div className="rcBanner-text position-absolute text-uppercase">
            Play Ludo &amp;{" "}
            <span className="fw-bold">Win Real Cash!</span>
          </div>
          <div className="rcBanner-footer position-absolute text-center">
            For best experience, open&nbsp;<a href="/">gotiking.com</a>
            &nbsp;on&nbsp;&nbsp;chrome mobile
          </div>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
