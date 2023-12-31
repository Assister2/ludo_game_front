import Cookies from "js-cookie";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../../../apis/auth";
import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../../../config";
import useCustumSearchParams from "../hooks/useCustumSearchParams";
import useNavigateSearch from "../hooks/useNavigateSearch";
import CircularLoading from "./../../common/components/atoms/CircularLoading";
import AppLayout from "../../common/layout/AppLayout";

export default function Login(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const phone = useCustumSearchParams()?.p;
  dispatch({ type: "ON_SIGNUPPAGE", payload: false });

  const [state, setState] = useState({
    phone: phone || "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const setValidationMsg = (msg) => {
    toast.error(msg);
  };

  const login = async () => {
    try {
      if (state.phone?.length < 10) {
        setValidationMsg("Atleast 10 Digits!");
        return;
      }

      setLoading(true);
      let userLogin = await loginAPI({ phone: state.phone });

      if (userLogin.status === 200) {
        setLoading(false);
        toast.success("OTP sent successfully!");
        navigate("/verify-otp", { state: { phone: state.phone } });
      } else {
        setLoading(false);
        toast.error(userLogin.error);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="col-12 col-sm-10 col-md-7 col-lg-12 mx-auto p-3 g-0">
        <div className="card">
          <div className="bg-light text-dark card-header">Login</div>
          <div className="card-body">
            <label htmlFor="phone" className="w-100 text-start form-label">
              Mobile Number
            </label>
            <div className="input-group">
              <span className="input-group-text bg-light text-dark">
                <img alt="mobile" src={`${CDN_URL}svgs/phone.svg`} />
              </span>
              <input
                type="number"
                name="phone"
                id="phone"
                className="form-control"
                aria-describedby="phone"
                maxLength="10"
                pattern="/^[6-9]{1}[0-9]{9}$/"
                onChange={handleChange}
                value={state.phone}
              />
            </div>
            <div className="d-grid py-3">
              <p style={{ fontSize: "0.8rem" }}>
                By Continuing, you agree to our <a href="/legal">Legal Terms</a>{" "}
                and you are 18 years or older.
              </p>
              <button
                onClick={login}
                disabled={loading}
                className="btn btn-primary text-uppercase"
              >
                {loading ? (
                  <CircularLoading
                    height={"1.5rem"}
                    width={"1.5rem"}
                    color={"white"}
                  />
                ) : (
                  "get otp"
                )}
              </button>
            </div>
            <div>
              <p style={{ fontSize: "0.9rem" }}>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
