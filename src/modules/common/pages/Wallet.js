import React, { useEffect } from "react"
import Deposit from "../components/appbar/components/Deposit"
import { BsArrowLeftShort } from "react-icons/bs"
import WithDraw from "../components/appbar/components/WithDraw"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getWalletReq } from "../../../redux/actions/wallet"

export default function Wallet() {
    const dispatch = useDispatch()
    useEffect(()=>{
        
        dispatch(getWalletReq())
    },[])
    // const navigation = useNavigation()
    return (
        <>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 mx-auto p-3 g-0">
                <div className="mb-3 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center justify-content-start">
                        <Link to="/">
                            <button className="btn btn-primary border">
                                <BsArrowLeftShort />
                                Back
                            </button>
                        </Link>
                    </div>
                    <Link to="/history" className="text-capitalize btn btn-outline-primary">
                        Wallet History
                    </Link>
                </div>
                <Deposit />
                <WithDraw/>
            </div>
        </>
    )
}