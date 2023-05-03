import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-hot-toast";
import { getUserProfileApi } from "../../../../../apis/user";
export default function WithDraw() {
    
    const [disableWithdraw,setDisableWithdraw]=useState(false)
    const walletData = useSelector(state=>state.wallet)
    const [wallet,setWallet] = useState({})
    
    const showToast=()=>{
        toast.error('Complete or cancel active challenges to withdraw!')
    }
    useEffect(()=>{
        (async () => {
            let userdata=await getUserProfileApi();
            console.log(userdata);
            setDisableWithdraw(userdata.data.data.hasActiveChallenge)
        })();
    },[])
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
                    winning chips
                </div>
                <div className="card-body">
                    <div className="fade alert alert-primary show" style={{ fontSize: "0.8rem" }}>
                    यह चिप्स गेम से जीती हुई एवं रेफरल से कमाई हुई है इन्हें Bank या UPI में निकाला जा सकता है ॥ इन चिप्स से गेम भी खेला जा सकता है
                    </div>
                    <div className="d-flex align-items-center justify-content-center px-2">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <span className="text-capitalize fw-bold" style={{ fontSize: "0.8rem" }}>Chips</span>
                            <span className="fs-4" >{wallet?.winningCash}</span>
                        </div>
                    </div>
                    <div className="d-flex flex-column align-items-stretch pt-4">
                        <a className="text-decoration-none">
                            <div className="d-grid">
                                {disableWithdraw?
                                    <Link  className="btn btn-primary btn-lg text-capitalize mb-2" onClick={()=>showToast()}>
                                    withdraw
                                    </Link>
                                    :
                                    <Link  to="/sell" className="btn btn-primary btn-lg text-capitalize mb-2">
                                    withdraw
                                    </Link>
                                }
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}