import axios from "axios";
import { toast } from "react-toastify";
import { UserActions } from "./UserSlice";

const api = process.env.REACT_APP_API;
export const RegisterUser = (Cradentials, navigate) => {
  return async (dispatch) => {
    const Register = async () => {
      dispatch(
        UserActions.registerUser({
          isLoggedin: false,
          userData: {},
          token: "",
          error: false,
        })
      );
      toast.promise(axios.post(`${api}/user/register`, Cradentials), {
        pending: "Registering...",
        success: {
          render({ data }) {
            console.log(data);
            dispatch(
              UserActions.registerUser({
                isLoggedin: true,
                userData: data.data.data.user,
                token: data.data.data.token,
                error: false,
              })
            );
            localStorage.setItem("token", data.data.data.token);
            navigate("/home");
            return "Success!";
          },
        },
        error: {
          render({ data }) {
            console.log(data);
            dispatch(
              UserActions.registerUser({
                isLoggedin: false,
                userData: {},
                token: "",
                error: true,
              })
            );
            return `${data.response.data.error}`;
          },
        },
      });
    };
    Register();
  };
};

export const LoginUser = (Cradentials, navigate) => {
  return async (dispatch) => {
    const Login = async () => {
      dispatch(
        UserActions.loginUser({
          isLoggedin: false,
          userData: {},
          token: "",
          error: false,
        })
      );
      toast.promise(axios.post(`${api}/user/login`, Cradentials), {
        pending: "Logging In...",
        success: {
          render({ data }) {
            dispatch(
              UserActions.loginUser({
                isLoggedin: true,
                userData: data.data.data.user,
                token: data.data.data.token,
                error: false,
              })
            );

            localStorage.setItem("token", data.data.data.token);
            navigate("/home");

            return `Welcome Back ${data.data.data.user.username}!`;
          },
        },
        error: {
          render({ data }) {
            console.log(data);
            dispatch(
              UserActions.loginUser({
                isLoggedin: false,
                userData: {},
                token: "",
                error: true,
              })
            );
            return `${data.response.data.error}`;
          },
        },
      });
    };
    Login();
  };
};

export const getUserByToken = (token) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    const getUser = axios.get(`${api}/user/getUser`, config);

    getUser
      .then((d) =>
        dispatch(
          UserActions.fetchUser({
            isLoggedin: true,
            userData: d.data.data.user,
            token: localStorage.getItem("token"),
            error: false,
          })
        )
      )
      .catch((d) =>
        dispatch(
          UserActions.fetchUser({
            isLoggedin: false,
            userData: {},
            token: "",
            error: true,
          })
        )
      );
  };
};

export const addBackgroundImage = (token, data) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "x-auth-token": token,
        },
      };

      const post = async () => {
        toast.promise(axios.post(`${api}/upload/image`, data, config), {
          pending: "Uploading Images...",
          success: {
            render({ data }) {
              return `Added Background Images!`;
            },
          },
          error: {
            render({ data }) {
              console.log(data);

              return `${data.response.data.error}`;
            },
          },
        });
      };

      post();
    } catch (error) {
      console.log(error);
    }
  };
};

export const getBackgroundImage = (token, data) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "x-auth-token": token,
        },
      };

      const res = await axios.get(`${api}/upload/image`, config);

      console.log(res);

      dispatch(UserActions.fetchImages(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const Reset = () => {
  return async (dispatch) => {
    dispatch(
      UserActions.fetchUser({
        isLoggedin: false,
        userData: {},
        token: "",
        error: false,
      })
    );
  };
};

export const getLogo = (token) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "x-auth-token": token,
        },
      };

      const res = await axios.get(`${api}/upload/logo`, config);

      console.log(res);

      dispatch(UserActions.fetchLogo(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addLogo = (token, data) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "x-auth-token": token,
        },
      };

      toast.promise(axios.post(`${api}/upload/logo`, data, config), {
        pending: "Uploading Logo...",
        success: {
          render({ data }) {
            return `Logo updated!`;
          },
        },
        error: {
          render({ data }) {
            console.log(data);

            return `${data.response.data.error}`;
          },
        },
      });

      dispatch(getLogo(token));
    } catch (error) {
      console.log(error);
    }
  };
};
