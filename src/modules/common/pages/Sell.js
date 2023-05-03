import { CircularProgress } from "@material-ui/core";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react"
import { BsArrowLeftShort } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router/cjs/react-router.min";
import { CDN_URL } from "../../../config";
import { userSellChipsRequest } from "../../../redux/actions/wallet";
import { getUserProfileApi } from "../../../apis/user";
import { toast } from "react-hot-toast";

export default function Sell() {
    const {isLoading} = useSelector(state=>state.wallet)
    const userData = useSelector(state=>state.user)
    const [disableWithdraw,setDisableWithdraw]=useState(false)

    const initialState = {
        upiId: "",
        confirmUpiId: "",
        amount: 0,
    }
    const [state, setState] = useState(initialState)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const showToast=()=>{
            toast.error('Complete or cancel active challenges to withdraw!')
    }

    useEffect(()=>{
        (async () => {
            let userdata=await getUserProfileApi();
            if(userdata.data.data.hasActiveChallenge){
                setDisableWithdraw(userdata.data.data.hasActiveChallenge)
            }   
        })();
    },[])

    const sell = () => {
        try {
            if (state.upiId !== state.confirmUpiId) {
                cogoToast.error("Please enter same upi id")
            }
            else {
                if (state.amount < 95) {
                    cogoToast.error("Amount should be greater than 95")
                }
                else if(state.amount > 10000){
                    cogoToast.error("Amount should be lesser than 10000")

                }
                else {
                    dispatch(userSellChipsRequest({ upiId: state.upiId, amount: Number(state.amount) ,createdAt:new Date()}))
                    console.log(`upi://pay?pa=8233622253@paytm&pn=${userData.data.user}&am=${Number(state.amount)}&tn=ludo%20pay`)
                    window.location.href = `upi://pay?pa=8233622253@paytm&pn=${userData.data.user}&am=${Number(state.amount)}&tn=ludo%20pay`
                }
            }
        } catch (error) {
            cogoToast.error("something went wrong")
        }
    }



    return (
        <>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 mx-auto p-3 g-0">
                <div className="mb-3 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center justify-content-start">
                        <Link to={"/wallet"}>
                            <button className="btn btn-primary border">
                                <BsArrowLeftShort />
                                Back
                            </button>
                        </Link>

                    </div>
                    <button
                        type="button"
                        className="btn btn-outline-primary d-flex align-items-center justify-content-center"
                    >
                        <img
                            style={{ marginRight: "4px" }}
                            src={`${CDN_URL}svgs/info.svg`}
                            alt="info"
                        />
                        <p className="m-0 p-0">Guide</p>
                    </button>
                </div>
                <div className="mb-3 shadow card">
                    <div className="bg-light text-dark text-capitalize card-header">
                        Payment Mode
                    </div>
                    <div className=" bg-secondary py-1">
                        <span className="text-white" style={{ fontSize: "0. 8rem" }}>
                            Withdrawal Chips: 0
                        </span>
                    </div>
                    <div className="card-body">
                        <div className="d-flex flex-row align-items-center justify-content-between mb-1">
                            <span style={{ fontSize: "0.8rem" }} >Minimum: 95</span>
                            <span style={{ fontSize: "0.8rem" }} >Maximum: 1,00,000</span>
                        </div>
                    </div>
                </div>
                <div className="mb-3 shadow card">
                    <div className="bg-light text-dark text-capitalize card-header">
                        Payment Details
                    </div>

                    <div className="card-body">
                            <div className="vstack gap-3 minBreakpoint-xs">
                                <div>
                                    <label className="text-capitalize text-start w-100 form-label" >
                                        UPI ID
                                    </label>
                                    <input name="upiId" onChange={handleChange} placeholder="Your UPI ID" className="form-control form-control" value={state.upiId}></input>
                                </div>
                                <div>
                                    <label className="text-capitalize text-start w-100 form-label" >
                                        Re Enter UPI ID                                    </label>
                                    <input name="confirmUpiId" onChange={handleChange} placeholder="Your UPI ID" className="form-control form-control" value={state.confirmUpiId}></input>
                                </div>
                                <div>
                                    <label className="text-capitalize text-start w-100 form-label" >
                                        Chips                                    </label>
                                    <input name="amount" onChange={handleChange} placeholder="Chips" type="number" className="form-control form-control" value={state.amount}></input>
                                </div>
                                <p style={{ fontSize: "0.8rem" }}>By Continuing, you agree to our <a href="#/terms">Legal Terms</a> and you are 18 years or older.</p>
                                {disableWithdraw?
                                    <button className="btn btn-primary" onClick={()=>showToast()}>Sell</button>
                                    :
                                    <button className="btn btn-primary" onClick={sell}>

                                        {isLoading?<CircularProgress
                                        style={{
                                            width: "1.5rem",
                                            height: "1.5rem",
                                            verticalAlign: "middle",
                                        }}
                                        color="white"
                                        />:"Sell"}

                                    </button>
                                }
                                
                            </div>
                    </div>
                </div>

            </div>
        </>
    )
}