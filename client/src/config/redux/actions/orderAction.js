import Swal from "sweetalert2"
import { API } from "../../api/api"
import * as orderTypes from "../constant/orderConstant"

const getOrder = () => ({
    type:orderTypes.GET_ORDER,
})

const getOrderSuccess = (payload) => ({
    type: orderTypes.GET_ORDER_SUCCESS,
    payload:payload
})

const getOrderFailed = (error) => ({
    type: orderTypes.GET_ORDER_FAILED,
    payload:error
})

export const GetOrder = (token) => {
    return function(dispatch){
        dispatch(getOrder)
        let config = {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        API.get("/order-user",config)
        .then((response) => {
            dispatch(getOrderSuccess(response?.data?.data))
        })
        .catch((error) => {
            dispatch(getOrderFailed(error?.response?.data.message))
        })
    }
}

const addOrderSuccess = (payload) => ({
    type: orderTypes.ADD_ORDER_SUCCESS,
    payload:payload
})

const addOrderFailed = (error) => ({
    type: orderTypes.ADD_ORDER_FAILED,
    payload:error
})

export const AddOrder = (data,token) => {
    return function(dispatch){
        let config = {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        API.post("/create-order",data,config)
        .then((response)=> {
            dispatch(addOrderSuccess(response.data.message))
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });
      
              Toast.fire({
                icon: "success",
                title: "Product has been added in cart",
              });
        })
        .catch((error) => {
            dispatch(addOrderFailed(error?.response?.data?.message))
        })
    }
}