import Cookies from "js-cookie"
import { axiosConfig } from "./axiosConfig";


const token = localStorage.getItem("token")

export const getChallengeByIdApi = async (challengeId) => {
    // console.log("payload",payload)
    try {
        const token = (Cookies.get("token") !== undefined || Cookies.get("token") !== null) ? Cookies.get("token") : ""

        const res = await axiosConfig.get(`/challenges/getChallengeByChallengeId/${challengeId}`, {
            headers: {
                Authorization: token,
            },
        });
        return res
    } catch (error) {
        return error.response.data
    }
}

export const winChallengeApi = async (challengeObject) => {
    challengeObject.createdAt = new Date()
    try {
        const token = (Cookies.get("token") !== undefined || Cookies.get("token") !== null) ? Cookies.get("token") : ""

        const res = await axiosConfig.post(`/challenges/win/${challengeObject.id}`, challengeObject, {
            headers: {
                Authorization: token,
            },
        });
        return res
    } catch (error) {
        return error.response.data
    }


}

export const cancelChallengeApi = async (challengeObject) => {
    try {
        const token = (Cookies.get("token") !== undefined || Cookies.get("token") !== null) ? Cookies.get("token") : ""

        challengeObject.createdAt = new Date()
        const res = await axiosConfig.post(`/challenges/cancel/${challengeObject._id}`, challengeObject, {
            headers: {
                Authorization: token,
            },
        });
        return res
    } catch (error) {
        return error.response.data
    }


}
export const looseChallengeApi = async (challengeId) => {
    // console.log("payload",payload)
    try {
        const token = (Cookies.get("token") !== undefined || Cookies.get("token") !== null) ? Cookies.get("token") : ""

        const res = await axiosConfig.post(`/challenges/loose/${challengeId}`, { createdAt: new Date() }, {
            headers: {
                Authorization: token,
            },
        });
        return res
    } catch (error) {
        return error.response.data
    }


}






