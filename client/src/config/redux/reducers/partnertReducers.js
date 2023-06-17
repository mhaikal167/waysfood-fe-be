import * as partnerTypes from "../constant/partnertConstants"

const INITIAL_STATE_PARTNER = {
    loading:false,
    partner:null,
    error:null,
}

export const partnerReducer = (state = INITIAL_STATE_PARTNER,action) => {
    const {type,payload} = action
    switch (type) {
        case partnerTypes.GET_PARTNER:
            return{
                ...state,
                loading:true
            }
        case partnerTypes.GET_PARTNER_SUCCESS:
            return{
                ...state,
                loading:false,
                partner:payload,
                error:null
            }
        case partnerTypes.GET_PARTNER_FAILED:
            return{
                ...state,
                loading:false,
                error:payload,
            }
    
        default:
            return state;
    }
}