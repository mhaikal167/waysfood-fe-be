import * as authTypes from "../constant/authContants";

const INITIAL_STATE_AUTH = {
  error: null,
  user: [],
  token: null,
  loading: false,
};

export const authReducer = (state = INITIAL_STATE_AUTH, action) => {
  const { type, payload } = action;
  switch (type) {
    case authTypes.LOGIN:
      return {
        ...state,
        loading: true,
      };
    case authTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: payload,
        error: null,
      };
    case authTypes.LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
      case authTypes.REGISTER:
        return {
          ...state,
          loading: true,
        };
      case authTypes.REGISTER_SUCCESS:
        return {
          ...state,
          loading: false,
          token: payload,
          error: null,
        };
      case authTypes.REGISTER_FAILED:
        return {
          ...state,
          loading: false,
          error: payload,
        };
        case authTypes.UPDATE_USER:
          return {
            ...state,
            loading: true,
          };
        case authTypes.UPDATE_USER_SUCCESS:
          return {
            ...state,
            loading: false,
            message: payload,
            error: null,
          };
        case authTypes.UPDATE_USER_FAILED:
          return {
            ...state,
            loading: false,
            error: payload,
          };
    case authTypes.CHECK_AUTH:
      return {
        ...state,
        loading: true,
      };
    case authTypes.CHECK_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
        error: null,
      };
    case authTypes.CHECK_AUTH_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case authTypes.LOGOUT:
      return {
        ...state,
        loading: false,
        error: null,
        user:null,
        token:null
      };
    default:
      return state;
  }
};
