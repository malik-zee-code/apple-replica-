import { Add, Remove } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteCartProduct,
  DeleteCartProducts,
  fetchCartProducts,
  updateCartProduct,
} from "../../Redux/Cart/action-creators";

const CheckoutComp = () => {
  const [wallet, setWallet] = useState(0);
  const userId = useSelector((state) => state.User.userData._id);
  const refferedBy = useSelector((state) => state.User.userData.refferedBy);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const CartItems = useSelector((state) => state.Cart.cartItems);

  const calcTotalAmount = () => {
    let total = 0;

    // if (refferedBy?.percentage) {
    //   for (let c of CartItems) {
    //     total += c.product.price * c.quantity;
    //   }
    // } else {
    for (let c of CartItems) {
      total += c.product.price * c.quantity;
    }
    // }

    return total;
  };

  const config = {
    headers: {
      "x-auth-token": token,
    },
  };

  const orderHandler = () => {
    const data = {
      orders: [],
    };

    for (let c of CartItems) {
      // if (refferedBy?.percentage) {
      //   let d = {
      //     product: c.product._id,
      //     price: c.product.price * c.product.price,
      //     quantity: c.quantity,
      //     user: userId,
      //   };
      //   data.orders.push(d);
      // } else {
      let d = {
        product: c.product._id,
        price: c.product.price,
        quantity: c.quantity,
        user: userId,
      };
      data.orders.push(d);
      // }
    }

    console.log(data.orders);
    axios
      .post(`${process.env.REACT_APP_API}/order`, data, config)
      .then((d) => {
        console.log(d.data.data);

        // currently logged in user
        axios.patch(
          `${process.env.REACT_APP_API}/user/updateWallet/${userId}`,
          {
            wallet: Math.abs(wallet - calcTotalAmount()),
          },
          config
        );
        if (refferedBy)
          axios.patch(
            `${process.env.REACT_APP_API}/user/updateWallet/${refferedBy._id}`,
            {
              wallet: Math.abs(
                refferedBy?.wallet.balance +
                  (refferedBy?.percentage * calcTotalAmount()) / 100
              ),
            },
            config
          );

        axios.patch(
          `${process.env.REACT_APP_API}/user/updateWallet/admin/change`,
          {
            wallet: Math.abs(
              ((100 - refferedBy?.percentage) * calcTotalAmount()) / 100
            ),
          },
          config
        );
        // currently logged in user

        dispatch(DeleteCartProducts(token));

        toast("🦄 Thank You for placing the Order!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => console.log(err));
  };

  const walletHandler = useCallback(() => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };

    axios
      .get(`${process.env.REACT_APP_API}/user/getWallet`, config)
      .then((d) => {
        console.log(d.data.data.balance);
        setWallet(d.data.data.balance);
      })
      .catch((e) => console.log(e));
  }, [token]);

  useEffect(() => {
    dispatch(fetchCartProducts(token));
    walletHandler();
  }, [token, dispatch, walletHandler]);

  return (
    <div className="mt-20 w-[80%] flex flex-col ">
      <div className="overflow-x-auto w-full min-h-[450px] flex justify-center items-center ">
        {CartItems.length > 0 ? (
          <table className=" w-full border-separate border-spacing-3 ">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th align="center">Price</th>
                <th align="right">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {CartItems?.map((c, i) => (
                <tr key={i}>
                  <td align="center">
                    <img
                      src={c.product?.pictures[0]}
                      className="w-[280px] h-[200px] bg-cover"
                      alt=""
                    />
                  </td>
                  <td align="center">{c.product.name}</td>
                  <td align="center">${c.product.price}</td>
                  <td align="right">
                    {" "}
                    <IconButton
                      onClick={() => {
                        if (c.quantity === 1) {
                          dispatch(deleteCartProduct(c.product._id, token));
                        } else {
                          dispatch(updateCartProduct(-1, c.product._id, token));
                        }
                      }}
                    >
                      <Remove />
                    </IconButton>{" "}
                    {c.quantity}
                    <IconButton
                      className="ml-2"
                      onClick={() =>
                        dispatch(updateCartProduct(1, c.product._id, token))
                      }
                    >
                      <Add />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <span className="text-3xl text-black text-center">
            Your Cart is Empty
          </span>
        )}
      </div>

      <div className="ml-auto text-base sm:text-lg md:text-xl flex flex-col md:flex-row  ">
        <span className=" font-semibold text-black mr-8">
          Wallet Balance:{" "}
          <span className="text-slate-700 ml-5 font-extralight tracking-wider">
            ${wallet || 0}
          </span>
        </span>

        <span className=" font-semibold text-black">
          Total Amount:{" "}
          <span className="text-slate-700 ml-5 font-extralight tracking-wider">
            ${calcTotalAmount()}
          </span>
        </span>
      </div>

      {wallet < calcTotalAmount() ? (
        <span className="text-center w-full flex justify-end mt-5 text-medium ">
          You Don't have Enough Wallet balance to purchase it
        </span>
      ) : (
        <label
          htmlFor="my-modal"
          className="btn my-10 text-white !bg-primary border-none hover ml-auto "
        >
          Proceed
        </label>
      )}

      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg">Checkout</h3>
          {console.log(wallet)}
          <p className="py-4">You have ${wallet || 0} Wallet Balance</p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Cancel
            </label>

            <label className="btn" onClick={orderHandler}>
              Order Now
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutComp;
