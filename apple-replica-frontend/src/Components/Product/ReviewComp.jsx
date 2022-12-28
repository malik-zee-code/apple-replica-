import { Delete } from "@mui/icons-material";
import { IconButton, Rating } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ReviewComp = ({ reviews, productId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ rating: 0, body: "" });
  const navigate = useNavigate();
  const token = useSelector((state) => state.User.token);
  const userType = useSelector((state) => state.User.userData.userType);

  const SubmitHandler = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    setIsLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API}/product/${productId}/review`,
        data,
        config
      )
      .then((d) => {
        setIsLoading(false);
        navigate(0);
      })
      .catch((err) => {
        setIsLoading(false);
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

  const handleDelete = (id) => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .delete(
        `${process.env.REACT_APP_API}/product/${productId}/review/${id}`,
        config
      )
      .then((d) => {
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
  return (
    <div className="mt-52 flex lg:flex-row flex-col ">
      <div className="flex-1">
        <span className="text-2xl font-semibold">Add Review</span>

        {token ? (
          <form className="mt-10" onSubmit={SubmitHandler}>
            <Rating
              className="mt-1"
              name="read-only"
              value={data.rating}
              size="large"
              onChange={(e) => setData({ ...data, rating: e.target.value })}
            />
            <div className="flex flex-col">
              <textarea
                name=""
                id=""
                cols="10"
                rows="8"
                className="border outline-none p-2 max-w-[500px] mt-2"
                onChange={(e) => setData({ ...data, body: e.target.value })}
              ></textarea>
              <button
                className={`btn w-[200px] mt-10 ${isLoading && "loading"}`}
              >
                Submit Review
              </button>
            </div>
          </form>
        ) : (
          <div className="flex justify-center items-center mt-20 text-red-500">
            <span className="text-xl font-medium">
              Please login to add a Review.
            </span>
          </div>
        )}
      </div>
      <div className="flex-1 lg:ml-8 ml-0 lg:mt-0 mt-10">
        <span className="text-2xl font-semibold">Reviews</span>
        {reviews.map((r, i) => (
          <div className=" mt-10" key={i}>
            <div className="flex flex-col">
              <div className="font-medium capitalize flex text-lg items-center justify-between">
                {r.author.username}

                {userType === "Admin" && (
                  <IconButton
                    className=""
                    onClick={handleDelete.bind(null, r._id)}
                  >
                    <Delete />
                  </IconButton>
                )}
              </div>
              <Rating
                className="mt-1"
                name="read-only"
                value={r.rating}
                readOnly
                size=""
              />
              <p className="mt-1 font-sans">{r.body}</p>

              <div className="flex justify-center mt-4 w-full my-4 ">
                <span className="flex items-center text-slate-300">
                  &#8859;{" "}
                  <hr className="border border-slate-300 min-w-[12em] max-w-[25em] mx-4" />{" "}
                  &#8859;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewComp;
