import Swal from "sweetalert2"
import { API } from "../../api/api"
import * as productTypes from "../constant/productConstant"

const getProduct = () => ({
    type: productTypes.GET_PRODUCT
})
const getProductSuccess = (payload) => ({
    type: productTypes.GET_PRODUCT_SUCCESS,
    payload: payload
})
const getProductFailed = (error) => ({
    type: productTypes.GET_PRODUCT_FAILED,
    payload: error
})

export const getProducts = () => {
    return function(dispatch){
        dispatch(getProduct())
        API.get("/products")
        .then((response) => {
            dispatch(getProductSuccess(response?.data?.data))
        })
        .catch((error) => {
            dispatch(getProductFailed(error.response.data.message))
        })
    }
}

const getProductSeller = () => ({
    type: productTypes.GET_PRODUCT_SELLER,
})
const getProductSellerSuccess = (payload) => ({
    type: productTypes.GET_PRODUCT_SELLER_SUCCESS,
    payload: payload
})
const getProductSellerFailed = (error) => ({
    type: productTypes.GET_PRODUCT_SELLER_FAILED,
    payload: error
})

export const getProductP = (id) => {
    return function(dispatch){
        dispatch(getProductSeller())
        API.get(`/products-part/${id}`)
        .then((response) => {
            dispatch(getProductSellerSuccess(response?.data?.data))
        })
        .catch((error) => {
            dispatch(getProductSellerFailed(error?.response?.data.message))
        })
    }
}

const addProduct = () => ({
    type: productTypes.ADD_PRODUCT,
})
const addProductSuccess = (payload) => ({
    type: productTypes.ADD_PRODUCT_SUCCESS,
    payload: payload
})
const addProductFailed = (error) => ({
    type: productTypes.ADD_PRODUCT_FAILED,
    payload: error
})

export const addProducts = (data,token) => {
    return function(dispatch){
        dispatch(addProduct())
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
        }
        API.post("/product",data,config)
        .then((response) => {
            dispatch(addProductSuccess(response?.data?.data))
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
                title: response?.data?.data?.message,
              });
        })
        .catch((error) => {
            dispatch(addProductFailed(error?.response?.data.message))
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
                icon: "warning",
                title: error.response?.data?.message,
              });
        })
    }
}