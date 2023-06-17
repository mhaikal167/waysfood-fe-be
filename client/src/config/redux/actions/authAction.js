import * as authTypes from "../constant/authContants";
import { API } from "../../api/api";
import Swal from "sweetalert2";

const login = () => ({
  type: authTypes.LOGIN,
});

const loginSuccess = (payload) => ({
  type: authTypes.LOGIN_SUCCESS,
  payload: payload,
});

const loginFailed = (error) => ({
  type: authTypes.LOGIN_FAILED,
  payload: error,
});

const logout = () => ({
  type: authTypes.LOGOUT,
});
export const LoginInitiate = ({ email, password}) => {
  return function (dispatch) {
    dispatch(login()); // loading login
    API.post("/login", { email, password })
      .then((response) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
        dispatch(loginSuccess(response?.data?.data?.token));
      })
      .catch((error) => {
        dispatch(loginFailed(error?.response?.data?.message));
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "warning",
          title: error?.response?.data?.message,
        });
      });
  };
};
const register = () => ({
  type: authTypes.REGISTER,
});

const registerSuccess = (payload) => ({
  type: authTypes.REGISTER_SUCCESS,
  payload: payload,
});

const registerFailed = (error) => ({
  type: authTypes.REGISTER_FAILED,
  payload: error,
});

export const registerInitiate = (data) => {
  return function (dispatch) {
    dispatch(register());
    API.post("/register", data)
      .then((response) => {
        setTimeout(() => {
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
            title: "Register successfully",
          });
          setTimeout(() => {
            let timerInterval;
            Swal.fire({
              title: "Auto login alert!",
              html: "I will login in <b></b> milliseconds.",
              timer: 2000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
                const b = Swal.getHtmlContainer().querySelector("b");
                timerInterval = setInterval(() => {
                  b.textContent = Swal.getTimerLeft();
                }, 100);
              },
              willClose: () => {
                clearInterval(timerInterval);
              },
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
                dispatch(registerSuccess(response?.data?.data?.token));
                window.location.reload();
              }
            });
          }, 2000);
        }, 500);
      })
      .catch((error) => {
        dispatch(registerFailed(error?.response?.data?.message));
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
          title: error.response.data.message,
        });
      });
  };
};
const updateUser = () => ({
  type: authTypes.UPDATE_USER,
});

const updateUserSuccess = (payload) => ({
  type: authTypes.UPDATE_USER_SUCCESS,
  payload: payload,
});

const updateUserFailed = (error) => ({
  type: authTypes.UPDATE_USER_FAILED,
  payload: error,
});

export const updateUserInitiate = (id, data, token) => {
  return function (dispatch) {
    dispatch(updateUser());
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(id,"ini id");
    console.log(data,"ini data");
    console.log(token,"ini token");
    API.patch(`/update-user/${id}`, data, config)
      .then((response) => {
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
          title: "updateUser successfully",
        });
        dispatch(updateUserSuccess(response.data.message));
      })
      .catch((error) => {
        dispatch(updateUserFailed(error?.response?.data?.message));
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
          title: error.response.data.message,
        });
      });
  };
};

export const Logout = () => {
  return function (dispatch) {
    dispatch(logout());
    const Toast = Swal.mixin({
      position: "center",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: "success",
      title: "Logout successfully",
    });
  };
};

const checkAuth = () => ({
  type: authTypes.CHECK_AUTH,
});

const checkAuthSuccess = (payload) => ({
  type: authTypes.CHECK_AUTH_SUCCESS,
  payload: payload,
});

const checkAuthFailed = (error) => ({
  type: authTypes.CHECK_AUTH_FAILED,
  payload: error,
});

export const CheckAuth = (token) => {
  return function (dispatch) {
    dispatch(checkAuth());
    API.get("/check-auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        dispatch(checkAuthSuccess(response?.data?.data));
      })
      .catch((error) => {
        dispatch(checkAuthFailed(error?.response?.data?.message));
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "warning",
          title: error?.response?.data?.message,
        });
        dispatch(logout());
      });
  };
};
