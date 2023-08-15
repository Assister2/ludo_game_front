import CircularLoading from './../../common/components/atoms/CircularLoading'
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUpRequest } from "../../../redux/actions/auth";
import Cookies from "js-cookie";
import AppLayout from '../../common/layout/AppLayout';

export default function Register(props) {
  const { data } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const history = useNavigate();
  const navigate = useNavigate();

  if (data.isLoggedIn) {
    navigate("/");
  } else {
    localStorage.clear();
    sessionStorage.clear();
    window.localStorage.clear();
    localStorage.removeItem("wallet");
    Cookies.remove("token");
    Cookies.remove("fullName");
    Cookies.remove("userId");
  }

  const { isLoading } = useSelector((state) => state.signUpReducer);

  const initialState = {
    name: "",
    phoneNumber: "",
    referalCode: "",
  };
  const [state, setState] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "referalCode") {
      // Remove any non-digit characters from the input
      const numericValue = value.replace(/\D/g, "");

      // Limit the input to a maximum of 10 digits
      const truncatedValue = numericValue.slice(0, 10);

      setState((prev) => ({ ...prev, [name]: truncatedValue }));
    } else if (name === "name") {
      // Remove any special characters except spaces from the input
      const alphanumericValue = value.replace(/[^a-zA-Z0-9\s]/g, "");

      setState((prev) => ({ ...prev, [name]: alphanumericValue }));
    } else {
      setState((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const referParam = queryParams.get("refer");
    
    if (referParam) {
      setState((prev) => ({ ...prev, referalCode: referParam }));
    }
  }, []);

  const onSubmit = () => {
    let signupData = {
      fullName: state.name,
      phone: state.phoneNumber,
    };
    if (state.name[0] == " ") {
      toast.error("First letter of name cannot be empty");
      return;
    }
    if (state.name.length < 3) {
      toast.error("name should be at least 3 characters");
      return;
    }
    if (state.referalCode != "") {
      if (state.referalCode.length < 10) {
        toast.error("referal code must be at least 10 digits");
        return;
      } else {
        signupData.referCode = state.referalCode;
      }
    }
    if (state.phoneNumber.length < 10) {
      toast.error("Phone number must be at least 10 digits");
    } else {
      dispatch(signUpRequest(signupData, history));
    }
  };

  return (
    <AppLayout>
      <div className="col-12 col-sm-10 col-md-7 col-lg-12 mx-auto p-3 g-0">
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
                    Name
                  </label>
                  <input
                    required
                    name="name"
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={state.name}
                  />
                </div>
                <div
                  className="d-flex flex-column align-items-start"
                >
                  <label className="text-capitalize form-label">
                    Phone Number
                  </label>
                  <input
                    required
                    name="phoneNumber"
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      const phoneNumber = event.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);

                      setState((prevState) => ({
                        ...prevState,
                        phoneNumber,
                      }));
                    }}
                    value={state.phoneNumber}
                  />
                </div>
                <div
                  className="d-flex flex-column align-items-start"
                >
                  <label className="text-capitalize form-label">
                    Refer Code (optional)
                  </label>
                  <input
                    required=""
                    name="referalCode"
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={state.referalCode}
                  />
                </div>
                <div>
                  <p style={{ fontSize: "0.8rem", textAlign: "start" }}>
                    By Continuing, you agree to our{" "}
                    <a href="/legal">Legal Terms</a> and you are 18 years or
                    older.
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="text-capitalize btn btn-primary"
                >
                  {isLoading ? (
                    <CircularLoading
                    height={'1.5rem'}
                    width={'1.5rem'}
                    color={'white'}
                    />
                  ) : (
                    "Submit"
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
    </AppLayout>
  );
}
