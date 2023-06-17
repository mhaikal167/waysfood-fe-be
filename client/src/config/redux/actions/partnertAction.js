import { API } from "../../api/api"
import * as partnerTypes from "../constant/partnertConstants"

const getPartner = () => ({
    type: partnerTypes.GET_PARTNER,
})

const getPartnerSuccess = (payload) => ({
    type: partnerTypes.GET_PARTNER_SUCCESS,
    payload: payload
})

const getPartnerFailed = (error) => ({
    type: partnerTypes.GET_PARTNER_FAILED,
    payload:error
})

export const getPartners = () => {
    return function(dispatch){
        dispatch(getPartner())
        API.get("/partners")
        .then((response) => {
            dispatch(getPartnerSuccess(response?.data?.data))
        })
        .catch((error) => {
            dispatch(getPartnerFailed(error?.response?.data?.message))
        })
    }
}