import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postFaq } from "../../Redux/Faq/action-creators";

const FaqAdd = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.User.token);

  const [data, setData] = useState({
    question: "",
    answer: "",
  });
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(postFaq(token, data));
  };
  return (
    <div className="w-[700px] min-h-[600px] bg-zinc-200 rounded-sm">
      <form className="p-3" onSubmit={submitHandler}>
        <h1 className="text-black font-semibold text-2xl">Add FAQ</h1>
        <div className="flex flex-col p-5">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Question"
            className="outline-none p-1 "
            required
            onChange={(e) => setData({ ...data, question: e.target.value })}
          ></textarea>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Answer"
            className="outline-none p-1 mt-3"
            required
            onChange={(e) => setData({ ...data, answer: e.target.value })}
          ></textarea>
          <button className="px-3 py-2 mt-4 text-white font-semibold rounded-md bg-slate-500">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FaqAdd;
