import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUpRequest } from "../../../redux/actions/auth";

export default function Register(props) {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { isLoading } = useSelector((state) => state.signUpReducer);
  console.log("is loading user", isLoading);

  const inititalState = {
    name: "",
    phoneNumber: "",
    referalCode: "",
  };
  const [state, setState] = useState(inititalState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const referParam = queryParams.get("refer");
    console.log(referParam);
    if (referParam) {
      setState((prev) => ({ ...prev, referalCode: referParam }));
    }
  }, []);

  const onSubmit = () => {
    let signupData = {
      fullName: state.name,
      phone: state.phoneNumber,
    };
    if (state.referalCode != "") {
      signupData.referelCode = state.referalCode;
    }
    dispatch(signUpRequest(signupData, history));
  };

  return (
    <div>
      <div className=" col-12 col-sm-12 col-md-6 col-lg-4 mx-auto p-3 g-0">
        <div className="card">
          <div className="bg-light text-dark text-capitalize card-header">
            register
          </div>
          <div className="card-body">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              style={{ marginBottom: "1rem" }}
            >
              <div className="vstack gap-4 minBreakpoint-xs">
                <div className="d-flex flex-column align-items-start">
                  <label className="text-capitalize form-label">
                    Name (as per aadhaar card)
                  </label>
                  <input
                    required=""
                    name="name"
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={state.name}
                  />
                </div>
                <div
                  style={{ marginTop: "1rem" }}
                  className="d-flex flex-column align-items-start"
                >
                  <label className="text-capitalize form-label">
                    phone number
                  </label>
                  <input
                    required=""
                    name="phoneNumber"
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={state.phoneNumber}
                  />
                </div>
                <div
                  style={{ marginTop: "1rem" }}
                  className="d-flex flex-column align-items-start"
                >
                  <label className="text-capitalize form-label">
                    refer code (optional)
                  </label>
                  <input
                    // disabled={isLoading || state.referalCode != ""}
                    required=""
                    name="referalCode"
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={state.referalCode}
                  />
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <p style={{ fontSize: "0.8rem", textAlign: "start" }}>
                    By Continuing, you agree to our{" "}
                    <a href="#/terms">Legal Terms</a> and you are 18 years or
                    older.
                  </p>
                </div>
                <button
                  style={{ fontSize: "0.8rem", width: "100%" }}
                  type="submit"
                  disabled={isLoading}
                  className="text-capitalize btn btn-primary"
                >
                  {isLoading ? (
                    <CircularProgress
                      style={{
                        width: "1.5rem",
                        height: "1.5rem",
                        verticalAlign: "middle",
                      }}
                      color="white"
                    ></CircularProgress>
                  ) : (
                    "submit"
                  )}
                </button>
              </div>
            </form>
            <p style={{ fontSize: "0.8rem" }}>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
