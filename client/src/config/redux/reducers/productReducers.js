import * as productTypes from "../constant/productConstant";

const INITIAL_STATE_PRODUCT = {
  message: null,
  product: [],
  loading: false,
};

export const productReducer = (state = INITIAL_STATE_PRODUCT, action) => {
  const { type, payload } = action;
  switch (type) {
    case productTypes.GET_PRODUCT:
      return {
        ...state,
        loading: true,
      };
    case productTypes.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: payload,
        message: null,
      };
    case productTypes.GET_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
      };
      case productTypes.GET_PRODUCT_SELLER:
        return {
          ...state,
          loading: true,
        };
      case productTypes.GET_PRODUCT_SELLER_SUCCESS:
        return {
          ...state,
          loading: false,
          product: payload,
          message: null,
        };
      case productTypes.GET_PRODUCT_SELLER_FAILED:
        return {
          ...state,
          loading: false,
          message: payload,
        };
    case productTypes.ADD_PRODUCT:
      return {
        ...state,
        loading: true,
      };
    case productTypes.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
      };
    case productTypes.ADD_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
      };
    default:
      return state;
  }
};
