import * as transTypes from "../constant/transactionContants"

const INITIAL_STATE_TRANSACTION ={
    loading:false,
    transaction:[],
    error:null,
}

export const transReducers = (state = INITIAL_STATE_TRANSACTION,action) => {
    const {type,payload} = action
    switch (type) {
        case transTypes.GET_TRANSACTION_USER:
            return{
                ...state,
                loading:true
            }
    
        case transTypes.GET_TRANSACTION_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                transaction:payload,
                error:null,
            }
    
        case transTypes.GET_TRANSACTION_USER_FAILED:
            return{
                ...state,
                loading:false,
                error:payload
            }
        case transTypes.GET_TRANSACTION_PARTNER:
            return{
                ...state,
                loading:true
            }
    
        case transTypes.GET_TRANSACTION_PARTNER_SUCCESS:
            return{
                ...state,
                loading:false,
                transaction:payload,
                error:null,
            }
    
        case transTypes.GET_TRANSACTION_PARTNER_FAILED:
            return{
                ...state,
                loading:false,
                error:payload
            }
    
        default:
            return state;
    }
}