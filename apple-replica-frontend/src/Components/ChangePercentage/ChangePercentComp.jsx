import React, { useEffect } from "react";
import { useCallback } from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChangePercentComp = () => {
  const [users, setUsers] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const navigate = useNavigate();

  const getAllPercentages = useCallback(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .get(`${process.env.REACT_APP_API}/user/getAllPercentages`, config)
      .then((d) => {
        setUsers(d.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const percentageHandler = (userId) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };

    const data = {
      percentage: percentage,
    };
    axios
      .post(
        `${process.env.REACT_APP_API}/user/changePercentage/${userId}`,
        data,
        config
      )
      .then((d) => {
        toast.success(`Successfully Changed percentage!`, {
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
      .catch((err) => {
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

  useEffect(() => {
    getAllPercentages();
  }, [getAllPercentages]);
  return (
    <div className="w-full flex justify-center">
      <div className="w-[80%] flex flex-col mt-20">
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold my-5">All Users Percentages</span>
        </div>
        <div className="w-full ">
          <div className="overflow-x-auto mb-10 border-2 border-slate-800 rounded-xl">
            <table className="table  w-full">
              <thead className="">
                <tr className="">
                  <th className="w-[200px]"></th>
                  <th className="text-white w-[200px]">Name</th>
                  <th className="text-white w-[200px]">Percentage</th>
                  <th className="text-white w-[400px]" align="center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.map((s, i) => (
                  <tr key={i}>
                    <th className="text-white">{i + 1}</th>
                    <td className="text-white capitalize text-sm sm:text-[16px]">
                      {s.username}
                    </td>
                    <td className="text-white text-sm sm:text-[16px]">
                      {s.percentage || 0}%
                    </td>
                    <td align="center">
                      {" "}
                      <label
                        htmlFor={`my-modal-${i}`}
                        className="sm:btn sm:text-white text-white  px-2 py-2 rounded-md text-[10px] !bg-primary border-none hover ml-auto "
                      >
                        Change Percentage
                      </label>
                      <input
                        type="checkbox"
                        id={`my-modal-${i}`}
                        className="modal-toggle"
                      />
                      <div className="modal">
                        <div className="modal-box bg-white ">
                          <div className="mr-auto w-full flex flex-col">
                            <span className="py-4 text-lg mt-4 text-black mr-auto">
                              Update Current Percentage
                            </span>

                            <input
                              onChange={(e) => setPercentage(e.target.value)}
                              min={1}
                              max={99}
                              defaultValue={s.percentage || 0}
                              type="number"
                              placeholder="Percentage"
                              className="input bg-white input-bordered w-full max-w-xs"
                            />
                          </div>
                          <div className="modal-action">
                            <button
                              disabled={
                                percentage === undefined || percentage === 0
                              }
                              className="btn"
                              onClick={percentageHandler.bind(null, s._id)}
                            >
                              Update
                            </button>

                            <label
                              htmlFor={`my-modal-${i}`}
                              className="btn btn-sm btn-circle absolute right-2 top-2"
                            >
                              X
                            </label>
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

export default ChangePercentComp;
