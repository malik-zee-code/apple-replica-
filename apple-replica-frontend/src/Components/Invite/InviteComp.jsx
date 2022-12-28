import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const InviteComp = () => {
  const [link, setLink] = useState("");
  const token = localStorage.getItem("token");
  const config = useMemo(() => {
    return {
      headers: {
        "x-auth-token": token,
      },
    };
  }, [token]);
  const GenerateLink = () => {
    axios
      .get(`${process.env.REACT_APP_API}/user/generateLink`, config)
      .then((d) => setLink(d.data))
      .catch((err) =>
        toast.error(`${err.response.data.error || err.response.data}!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
  };

  const id = useSelector((state) => state.User.userData._id);
  const getLink = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API}/user/getLink/${id}`, config)
      .then((d) => setLink(d.data))
      .catch((err) => console.log(err));
  }, [config, id]);

  console.log();

  useEffect(() => {
    getLink();
  }, [getLink]);
  return (
    <div className=" w-full min-h-full  flex justify-center mt-24 ">
      <div className="w-[600px] min-h-[300px] bg-slate-700 rounded-md p-10 text-center mx-5">
        <input
          type="text"
          readonly
          value={
            link.status !== "pending"
              ? `${window.location.protocol}//${window.location.hostname}:${
                  window.location.port ? window.location.port : ""
                }/invite/${link?.url}`
              : "Your Link is on Pending."
          }
          onClick={() => {
            link.status !== "pending" &&
              navigator.clipboard.writeText(
                `${window.location.protocol}//${window.location.hostname}:${
                  window.location.port ? window.location.port : ""
                }/invite/${link?.url}`
              );
            toast.info(`Link copied to Clipboard!`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            console.log("copied");
          }}
          className="input font-semibold  mt-10 w-full max-w-xs !bg-white cursor-pointer "
        />
        {!link && (
          <button
            className=" ml-5 btn bg-green-400 hover:bg-green-500 text-white"
            onClick={GenerateLink}
          >
            Generate
          </button>
        )}

        {!link ? (
          <h1 className="text-center text-3xl mt-16 font-medium text-white">
            No Link Generated Yet :(
          </h1>
        ) : (
          <div className="text-center mt-10">
            <span className="text-center font-semibold text-white text-2xl">
              Link Status:{" "}
              <span
                className={`capitalize ${
                  link?.status === "pending" ? "text-red-500" : "text-green-500"
                }`}
              >
                {link?.status}
              </span>
            </span>
            {link?.status === "pending" && (
              <p className="text-white">
                We have let the Admin know that this link is on pending. We
                really appreciate your patiance...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InviteComp;
