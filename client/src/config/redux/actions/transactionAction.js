import { API } from "../../api/api"
import * as transTypes from "../constant/transactionContants"

const getUserTrans = () => ({
    type:transTypes.GET_TRANSACTION_USER
})
const getUserTransSuccess = (payload) => ({
    type:transTypes.GET_TRANSACTION_USER_SUCCESS,
    payload:payload
})
const getUserTransFailed = (error) => ({
    type:transTypes.GET_TRANSACTION_USER_FAILED,
    payload:error
})

export const GetTransUser = (token) => {
    return function(dispatch){
        dispatch(getUserTrans())
        let config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        API.get("/transaction-user",config)
        .then((response) =>{
            dispatch(getUserTransSuccess(response?.data?.data))
        })
        .catch((error) => {
            dispatch(getUserTransFailed(error?.response?.data?.message))
        })
    }
}

const getPartnerTrans = () => ({
    type:transTypes.GET_TRANSACTION_USER
})
const getPartnerTransSuccess = (payload) => ({
    type:transTypes.GET_TRANSACTION_USER_SUCCESS,
    payload:payload
})
const getPartnerTransFailed = (error) => ({
    type:transTypes.GET_TRANSACTION_USER_FAILED,
    payload:error
})

export const GetTransPartner = (token) => {
    return function(dispatch){
        dispatch(getPartnerTrans())
        let config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        API.get("/transaction-partner",config)
        .then((response) =>{
            dispatch(getPartnerTransSuccess(response?.data?.data))
        })
        .catch((error) => {
            dispatch(getPartnerTransFailed(error?.response?.data?.message))
        })
    }
}