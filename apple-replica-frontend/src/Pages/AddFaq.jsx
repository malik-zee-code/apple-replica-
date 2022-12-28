import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FaqAdd from "../Components/FAQ/FaqAdd";

const AddFaq = () => {
  const navigate = useNavigate();
  const userType = useSelector((state) => state.User.userData.userType);

  useEffect(() => {
    if (userType !== "Admin") {
      navigate(-1);
    }
  }, [userType, navigate]);
  return (
    <div className="flex justify-center p-10">
      {" "}
      <FaqAdd />{" "}
    </div>
  );
};

export default AddFaq;
