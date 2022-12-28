import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WalletComp from "../Components/WalletComp";

const Wallet = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate(-1);
    }
  }, [navigate, token]);
  return (
    <div className="mt-20">
      <WalletComp />
    </div>
  );
};

export default Wallet;
