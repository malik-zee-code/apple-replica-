import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchFaq } from "../../Redux/Faq/action-creators";

const FAQComp = () => {
  const userType = useSelector((state) => state.User.userData.userType);
  const qa = useSelector((state) => state.Faq.QnA);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFaq());
  }, [dispatch]);

  return (
    <div className="w-[950px]  my-3 p-10 flex flex-col ">
      <span className="text-[35px] text-black font-semibold">
        Frequently Asked Questions
      </span>

      <div className="ml-auto">
        {userType === "Admin" && (
          <Link
            to="/addfaq"
            className="mr-4 hover:bg-indigo-400 ease-in-out duration-150 rounded-md bg-indigo-300 px-2 py-1  font-semibold  text-white"
          >
            Add Faq
          </Link>
        )}
      </div>
      {qa.map((q, i) => (
        <div className="w-full mt-5" key={i}>
          <h2 className="text-[24px] font-medium text-black">{q.question}</h2>
          <p className="text-black">{q.answer}</p>
        </div>
      ))}

      <div className="mt-10 text-black">
        For more information or help,{" "}
        <a href="\#" className="text-indigo-600">
          {" "}
          visit Apple Support
        </a>
      </div>
    </div>
  );
};

export default FAQComp;
