import * as orderTypes from "../constant/orderConstant";

const INITIAL_STATE_ORDER = {
  loading: false,
  order: [],
  error: null,
  message: null,
};

export const orderReducers = (state = INITIAL_STATE_ORDER, action) => {
  const { type, payload } = action;
  switch (type) {
    case orderTypes.GET_ORDER:
      return {
        ...state,
        loading: true,
      };
    case orderTypes.GET_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order:payload,
      };
    case orderTypes.GET_ORDER_FAILED:
      return {
        ...state,
        loading:false ,
        error:payload
      };
     case orderTypes.DELETE_ORDER:
      return {
        ...state,
        loading: true,
      };
    case orderTypes.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        message:payload,
      };
    case orderTypes.DELETE_ORDER_FAILED:
      return {
        ...state,
        loading:false,
        error:payload
      };
    default:
      return state;
  }
};
