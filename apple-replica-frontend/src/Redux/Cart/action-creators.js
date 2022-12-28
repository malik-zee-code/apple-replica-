import axios from "axios";
import { toast } from "react-toastify";
import { CartActions } from "./CartSlice";

export const fetchCartProducts = (token) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };

    const getCartItems = axios.get(
      `${process.env.REACT_APP_API}/cartItem`,
      config
    );

    getCartItems
      .then((d) => {
        dispatch(
          CartActions.getCartProducts({
            cartItems: d.data.data,
            isLoading: false,
            error: false,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          CartActions.getCartProducts({
            cartItems: [],
            isLoading: false,
            error: true,
          })
        );
        toast.error(`${err.response.data.error}!`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
};

export const addtoCart = (quantity, product_id, token) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    const Add = axios.post(
      `${process.env.REACT_APP_API}/cartItem`,
      { quantity, product_id },
      config
    );

    Add.then((d) => {
      dispatch(
        CartActions.addtoCart({
          cartItems: d.data.data,
          isLoading: false,
          error: false,
        })
      );
      toast.success("Added to Cart!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }).catch((err) => {
      dispatch(
        CartActions.addtoCart({
          cartItems: [],
          isLoading: false,
          error: false,
        })
      );
      toast.error(`${err.response.data.error}!`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };
};

export const resetCartProducts = (token) => {
  return async (dispatch) => {
    dispatch(
      CartActions.resetCartProduct({
        cartItems: [],
        isLoading: false,
        error: false,
      })
    );
  };
};

export const updateCartProduct = (quantity, product_id, token) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    const update = axios.put(
      `${process.env.REACT_APP_API}/cartitem/${product_id}`,
      { quantity },
      config
    );

    update
      .then((d) =>
        dispatch(
          CartActions.updateCartProduct({
            cartItems: d.data.data,
            isLoading: false,
            error: false,
          })
        )
      )
      .catch((err) => {
        dispatch(
          CartActions.updateCartProduct({
            cartItems: [],
            isLoading: false,
            error: true,
          })
        );
        toast.error(`${err.response.data.error}!`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
};

export const deleteCartProduct = (product_id, token) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    const Delete = axios.delete(
      `${process.env.REACT_APP_API}/cartitem/${product_id}`,
      config
    );

    Delete.then((d) =>
      dispatch(
        CartActions.deleteCartProduct({
          cartItems: d.data.data,
          isLoading: false,
          error: false,
        })
      )
    ).catch((err) => {
      dispatch(
        CartActions.deleteCartProduct({
          cartItems: [],
          isLoading: false,
          error: true,
        })
      );
      toast.error(`${err.response.data.error}!`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };
};

export const DeleteCartProducts = (token) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };

    const getCartItems = axios.patch(
      `${process.env.REACT_APP_API}/cartItem/cart`,{},
      config
    );

    getCartItems
      .then((d) => {
        dispatch(
          CartActions.deleteAllcartProduct({
            cartItems: d.data.data,
            isLoading: false,
            error: false,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          CartActions.deleteAllcartProduct({
            cartItems: [],
            isLoading: false,
            error: true,
          })
        );
      });
  };
};
