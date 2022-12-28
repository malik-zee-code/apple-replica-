import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchUserOrders } from "../../Redux/Order/action-creator";

const OrderComp = () => {
  const Orders = useSelector((state) => state.Order.orders);

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const userType = useSelector((state) => state.User.userData.userType);
  const [status, setStatus] = useState();
  const navigate = useNavigate();

  const handleSubmit = (id) => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API}/order/${id}/status`,
        {
          status: status,
        },
        config
      )
      .then((d) => {
        toast.success(`Successfully Updated the Status`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        navigate(0);
      })
      .catch((e) => {
        toast.error(`${e.response.data.error}!`, {
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

  useEffect(() => {
    dispatch(fetchUserOrders(token));
  }, [dispatch, token]);

  return (
    <div className="w-full flex justify-center">
      {" "}
      <div className="w-[80%] flex flex-col ">
        <h2 className="text-3xl font-bold mt-10">
          {" "}
          {userType === "Admin" ? "All Users Orders" : "Your Orders."}{" "}
        </h2>
        <div className="overflow-x-auto w-full mt-10">
          {Orders?.length > 0 ? (
            <div className="overflow-x-auto mb-10 border-2 border-slate-800 rounded-xl">
              <table className="table  w-full">
                <thead className="">
                  <tr className="">
                    <th className="w-[200px]"></th>
                    <th className="w-[200px] text-white">Product Name</th>
                    <th align="left" className=" text-white w-[200px]">
                      Quantity
                    </th>
                    <th align="left" className=" text-white w-[200px]">
                      Price
                    </th>
                    <th className="w-[200px] text-white">Status</th>
                    {userType === "Admin" && (
                      <th className="w-[200px] text-white">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {Orders?.map((s, i) => (
                    <tr key={i}>
                      <th className="text-white">{i + 1}</th>
                      <td
                        // align="center"
                        className="text-white capitalize text-sm sm:text-[16px]"
                      >
                        {s.product.name}
                      </td>
                      <td className="text-white capitalize text-sm sm:text-[16px]">
                        {s.quantity}
                      </td>
                      <td className="text-white capitalize text-sm sm:text-[16px]">
                        ${s?.price}
                      </td>

                      <td>
                        {" "}
                        {s?.status === "pending" ? (
                          <label className="sm:btn  sm:text-white text-white  px-2 py-2 rounded-md text-[10px] !bg-error cursor-pointer border-none hover ml-auto ">
                            {s?.status}
                          </label>
                        ) : (
                          <label className="sm:btn  sm:text-white text-white  px-2 py-2 rounded-md text-[10px] !bg-success cursor-pointer border-none hover ml-auto ">
                            {s?.status}
                          </label>
                        )}
                      </td>
                      {userType === "Admin" && (
                        <td align="center">
                          <label
                            htmlFor={`my-modal-status-change-${i}`}
                            className="sm:btn sm:text-white text-white  px-2 py-2 rounded-md text-[10px] !bg-primary border-none hover ml-auto "
                          >
                            Change Status
                          </label>

                          <input
                            type="checkbox"
                            id={`my-modal-status-change-${i}`}
                            className="modal-toggle"
                          />
                          <div className="modal">
                            <div className="modal-box bg-white ">
                              <div className="mr-auto w-full flex flex-col">
                                <p className="font-bold text-lg mr-auto">
                                  Status
                                </p>
                                <span className="py-4 text-lg mt-4 text-black mr-auto">
                                  Current Status of the Product:{" "}
                                  <span className="font-semibold capitalize">
                                    {" "}
                                    {s.status}{" "}
                                  </span>
                                </span>

                                <FormControl className="m-auto">
                                  <InputLabel id="demo-simple-select-label">
                                    Status
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue={s.status}
                                    label="Status"
                                    value={status}
                                    className="w-[200px]"
                                    onChange={(e) => setStatus(e.target.value)}
                                  >
                                    <MenuItem
                                      className="hover:text-black"
                                      value={"pending"}
                                    >
                                      Pending
                                    </MenuItem>
                                    <MenuItem
                                      className="hover:text-black"
                                      value={"delivered"}
                                    >
                                      Delivered
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </div>
                              <div className="modal-action">
                                <label
                                  htmlFor={`my-modal-status-change-${i}`}
                                  href="#"
                                  className="btn"
                                >
                                  Cancel
                                </label>
                                <button
                                  className="btn"
                                  onClick={handleSubmit.bind(null, s._id)}
                                >
                                  Update Status
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <span className="w-full flex justify-center">
              {" "}
              You Have no Pending Orders
            </span>
          )}
        </div>
      </div>{" "}
    </div>
  );
};

export default OrderComp;
