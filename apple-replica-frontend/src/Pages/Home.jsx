import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeComp from "../Components/Home/HomeComp";

const Home = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate(-1);
    }
  }, [token, navigate]);

  return (
    <div>
      {" "}
      <HomeComp />{" "}
    </div>
  );
};

export default Home;
