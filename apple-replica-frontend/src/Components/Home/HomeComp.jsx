import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCartProducts } from "../../Redux/Cart/action-creators";
import { getUserByToken } from "../../Redux/User/action-creators";

const HomeComp = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(getUserByToken(token));
      dispatch(fetchCartProducts(token));
    }
  }, [dispatch, token]);

  return <div className="">WELCOME HOME!!</div>;
};

export default HomeComp;
