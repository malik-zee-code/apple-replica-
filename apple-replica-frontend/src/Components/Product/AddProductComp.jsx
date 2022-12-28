import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProductComp = () => {
  const [state, setState] = useState({
    name: "",
    price: 0,
    description: "",
    shippingFees: 0,
    pictures: [],
  });

  const [isLoading, setIsloading] = useState(false);

  const navigate = useNavigate();

  const handleProductImages = (e) => {
    state.pictures = [];
    const file = e.target.files;
    for (let f of file) {
      console.log(f);
      setFiletoBase(f);
    }
  };

  const setFiletoBase = (file) => {
    console.log(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    console.log("as Data URL", reader);

    reader.onloadend = () => {
      state.pictures.push(reader.result);
    };
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    console.log(state);
    setIsloading(true);
    axios
      .post(`${process.env.REACT_APP_API}/product`, state, config)
      .then((d) => {
        console.log(d);
        setIsloading(false);
        navigate("/products");
      })
      .catch((d) => {
        console.log(d);
        setIsloading(false);
      });
  };
  return (
    <div className="w-[850px] h-[700px] shadow-lg my-20 rounded-md p-4 flex flex-col">
      <h3 className="text-lg font-semibold text-black ">Add Product</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-16 gap-3">
        <div className="flex flex-col">
          <div className="flex flex-col mb-4">
            <span className="text-slate-600 mb-2">Product Name</span>
            <input
              onChange={(e) => setState({ ...state, name: e.target.value })}
              type="text"
              className=" text-slate-800 p-2 outline-none focus:ring-[3px] bg-slate-100 ease-in-out duration-75 rounded-[4px]"
            />
          </div>

          <div className="flex flex-col mb-4">
            <span className="text-slate-600 mb-2">Description</span>
            <textarea
              onChange={(e) =>
                setState({ ...state, description: e.target.value })
              }
              className="p-2 text-slate-800  outline-none focus:ring-[3px] bg-slate-100 ease-in-out duration-75 rounded-[4px]"
            />
          </div>

          <div className="flex flex-col mb-4">
            <span className="text-slate-600 mb-2">Price</span>
            <input
              onChange={(e) => setState({ ...state, price: e.target.value })}
              type="number"
              className="p-2 outline-none text-slate-800  focus:ring-[3px] bg-slate-100 ease-in-out duration-75 rounded-[4px]"
            />
          </div>
          <div className="flex flex-col mb-4">
            <span className="text-slate-600 mb-2">Shipping Fees</span>
            <input
              onChange={(e) =>
                setState({ ...state, shippingFees: e.target.value })
              }
              type="number"
              className="p-2 outline-none text-slate-800  focus:ring-[3px] bg-slate-100 ease-in-out duration-75 rounded-[4px]"
            />
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div className="w-full flex flex-col">
            <span className="text-slate-600">Add Product Images</span>
            <input
              type="file"
              name=""
              id=""
              multiple
              accept="image/*"
              className="mt-2"
              onChange={handleProductImages}
            />
          </div>
        </div>
      </div>
      <button
        className={` ${
          isLoading && "loading"
        } btn no-animation px-3 py-2 bg-slate-800 w-full  rounded-md my-auto text-white font-semibold `}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default AddProductComp;
