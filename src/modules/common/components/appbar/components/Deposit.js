import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function Deposit() {
    const walletData = useSelector(state=>state.wallet)
    const [wallet,setWallet] = useState({})
    useEffect(()=>{
      setWallet(walletData.data)
    },[walletData])
    return (
        <>
            {/* <div className="fade d-flex align-items-center justify-content-between alert alert-danger show">
            <span><b></b></span>
        </div> */}
            <div className="mb-3 shadow card">
                <div className="bg-light text-dark text-capitalize card-header">
                    deposit chips
                </div>
                <div className="card-body">
                    <div className="fade alert alert-primary show" style={{ fontSize: "0.8rem" }}>
                        यह चिप्स Spin & Win एवं Buy की गई चिप्स है इनसे सिर्फ़ गेम खेले जा सकते है ॥ Bank या UPI में निकाला नहीं जा सकता है
                    </div>
                    <div className="d-flex align-items-center justify-content-center px-2">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <span className="text-capitalize fw-bold" style={{ fontSize: "0.8rem" }}>Chips</span>
                            <span className="fs-4" >{wallet?.depositCash}</span>
                        </div>
                    </div>
                    <div className="d-flex flex-column align-items-stretch pt-4">
                        <a className="text-decoration-none">
                            <div className="d-grid">
                                <Link to="/buy" className="btn btn-primary btn-lg text-capitalize mb-2">
                                    Add
                                </Link>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}