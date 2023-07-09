import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "styled-components";
import { CDN_URL } from "../../../../../config";
import { updateUserProfileReq } from "../../../../../redux/actions/user";

export default function ProfileDetails() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [editButton, setEditButton] = useState(false);
  const [userName, setUserName] = useState();

  const handleSubmit = () => {
    try {
      dispatch(updateUserProfileReq({ username: userName }));
    } catch (error) {
      setEditButton(false);
    }
  };

  useEffect(() => {
    setEditButton(userData.isLoading);
    setUserName(userData?.data?.username);
  }, [userData]);
  console.log("userdata", userData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "userName" && value.length >= 2 && value.length <= 10) {
      setUserName(value);
    }
  };

  return (
    <div className=" col-12 col-sm-12 col-md-6 col-lg-4 mx-auto p-3 g-0">
      <div className="mb-3 shadow card">
        <div className="bg-light text-dark text-capitalize card-header">
          profile
        </div>
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-center">
            <div style={{ height: "80px", width: "80px" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundSize: "contain",
                  backgroundImage: `url(${CDN_URL}avatar/${userData?.data?.profileImage}`,
                }}
                className="bg-success rounded-circle position-relative"
              >
                {/* <div style={{ width: "24px", height: "24px", bottom: "0px", right: "0px", cursor: "pointer" }} className="position-absolute shadow rounded-circle bg-white">

                                </div> */}
              </div>
            </div>
          </div>
          <div className="d-flex flex-column align-items-start justify-content-center mb-3">
            <label className="form-label text-capitalize">username</label>
            <div className="align-self-stretch d-flex align-items-center">
              <input
                name="userName"
                type="text"
                className="form-control me-2"
                onChange={handleChange}
                value={userName}
                disabled={!editButton}
              ></input>
              {editButton ? (
                <button
                  className="btn btn-success text-capitalize btn-sm align-self-stretch "
                  onClick={handleSubmit}
                  style={{ width: "75px" }}
                >
                  {userData.isLoading ? (
                    <CircularProgress
                      style={{
                        width: "1.5rem",
                        height: "1.5rem",
                        verticalAlign: "middle",
                      }}
                      color="white"
                    />
                  ) : (
                    "Save"
                  )}
                </button>
              ) : (
                <button
                  className="btn btn-primary text-capitalize btn-sm align-self-stretch "
                  onClick={() => {
                    setEditButton(!editButton);
                  }}
                  style={{ width: "75px" }}
                >
                  edit
                </button>
              )}
            </div>
          </div>
          <div className="d-flex flex-column align-items-start justify-content-center mb-3">
            <label className="form-label text-capitalize">phone</label>
            <div className="align-self-stretch d-flex align-items-center">
              <input
                type="text"
                className="form-control me-2"
                maxLength={10}
                value={userData?.data?.phone}
                disabled
              ></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
