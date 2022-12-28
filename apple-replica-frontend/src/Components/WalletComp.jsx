import React from "react";
import { useSelector } from "react-redux";

const WalletComp = () => {
  const wallet = useSelector((state) => state.User.userData?.wallet?.balance);

  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="h-[400px] w-[500px] bg-slate-800 p-10 mt-40 rounded-xl text-whie flex flex-col items-center">
        <h1 className="text-3xl font-semibold text-white mt-10">
          Wallet :{" "}
          <span className="tracking-wider font-extralight">
            ${wallet || 0}{" "}
          </span>
        </h1>

        <div className="w-full flex justify-center mt-auto ">
          <button className="btn w-full hover:text-white border-b !border-white">
            Add Money
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletComp;
