import axios from "axios";
import { orderActions } from "./OrderSlice";

export const fetchUserOrders = (token) => {
  return async (dispatch) => {
    dispatch(
      orderActions.getUserOrder({
        orders: [],
        isLoading: true,
        error: false,
      })
    );

    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .get(`${process.env.REACT_APP_API}/order`, config)
      .then((d) =>
        dispatch(
          orderActions.getUserOrder({
            orders: d.data.data,
            isLoading: false,
            error: false,
          })
        )
      )
      .catch((e) => {
        dispatch(
          orderActions.getUserOrder({
            orders: [],
            isLoading: false,
            error: true,
          })
        );
        console.log(e);
      });
  };
};
