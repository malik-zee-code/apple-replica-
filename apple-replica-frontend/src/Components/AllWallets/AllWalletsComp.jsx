import { FormControl, Input, InputAdornment, InputLabel } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";

const AllWalletsComp = () => {
  const [user, setUsers] = useState();
  const [dmyuser, setDumyUsers] = useState();
  const [wallet, setWallet] = useState();

  const userType = useSelector((state) => state.User.userData.userType);
  const navigate = useNavigate();

  const getAllWallets = useCallback(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };

    axios
      .get(`${process.env.REACT_APP_API}/user/getAllWallet`, config)
      .then((d) => {
        console.log(d.data.data);
        setUsers(d.data.data);
        setDumyUsers(d.data.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const walletHandler = (wall, id) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .patch(
        `${process.env.REACT_APP_API}/user/updateWallet/${id}`,
        { wallet: +wall + +wallet },
        config
      )
      .then((d) => {
        navigate(0);
        console.log();
      })
      .catch((e) => console.log(e));
  };

  const searchHandler = (e) => {
    console.log(e.target.value);
    const users = user.filter((s) => s.username?.includes(e.target.value));
    console.log(users);
    setDumyUsers(users);
  };

  useEffect(() => {
    if (userType && userType !== "Admin") {
      navigate(-1);
    } else {
      getAllWallets();
    }
  }, [navigate, userType, getAllWallets]);

  console.log(user);
  return (
    <div className="w-full flex justify-center">
      <div className="w-[80%] flex flex-col mt-20">
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold my-5">All User Wallets</span>

          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">
              Search By Name
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
              endAdornment={
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              }
              onChange={searchHandler}
            />
          </FormControl>
        </div>
        <div className="w-full ">
          <div className="overflow-x-auto mb-10 border-2 border-slate-800 rounded-xl">
            <table className="table  w-full">
              <thead className="">
                <tr className="">
                  <th className="w-[200px]"></th>
                  <th className="text-white w-[200px]">Name</th>
                  <th className="text-white w-[200px]">Wallet</th>
                  <th className="text-white w-[400px]" align="center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {dmyuser?.map((s, i) => (
                  <tr key={i}>
                    <th className="text-white">{i + 1}</th>
                    <td className="text-white capitalize text-sm sm:text-[16px]">
                      {s.username}
                    </td>
                    <td className="text-white text-sm sm:text-[16px]">
                      $ {s.wallet?.balance || 0}
                    </td>
                    <td align="center">
                      {" "}
                      <label
                        htmlFor={`my-modal-${i}`}
                        className="sm:btn sm:text-white text-white  px-2 py-2 rounded-md text-[10px] !bg-primary border-none hover ml-auto "
                      >
                        Update Wallet
                      </label>
                      <input
                        type="checkbox"
                        id={`my-modal-${i}`}
                        className="modal-toggle"
                      />
                      <div className="modal">
                        <div className="modal-box bg-white ">
                          <div className="mr-auto w-full flex flex-col">
                            <p className="font-bold text-lg mr-auto">Wallet</p>
                            <span className="py-4 text-lg mt-4 text-black mr-auto">
                              Current Wallet Balance: {s.wallet?.balance || 0}
                            </span>

                            <input
                              onChange={(e) => setWallet(e.target.value)}
                              // min={s.wallet?.balance}
                              type="number"
                              placeholder="Wallet"
                              className="input bg-white input-bordered w-full max-w-xs"
                            />
                          </div>
                          <div className="modal-action">
                            <button
                              disabled={wallet === undefined || wallet === 0}
                              className="btn"
                              onClick={walletHandler.bind(
                                null,
                                s.wallet?.balance || 0,
                                s._id
                              )}
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllWalletsComp;
