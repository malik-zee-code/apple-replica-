import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  addBackgroundImage,
  addLogo,
  getBackgroundImage,
  getLogo,
} from "../../Redux/User/action-creators";

const BackgroundImageComp = () => {
  const [isLoading, setIsloading] = useState(false);
  const [fileinfo, setFileInfo] = useState({
    images: [],
  });
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getBackgroundImage(token));
    dispatch(getLogo(token));
  }, [dispatch, token]);

  const handleProductImages = (e) => {
    fileinfo.images = [];
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
      fileinfo.images.push(reader.result);
    };
  };

  const handleSubmit = () => {
    console.log("on submit", fileinfo);

    if (fileinfo.images.length > 0)
      dispatch(addBackgroundImage(token, fileinfo));
    else {
      toast.error(`Please add at least one background Image and then Submit!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const [logo, setLogo] = useState({
    logo: "",
  });

  const handleLogo = (e) => {
    const file = e.target.files[0];

    console.log(file);
    const readFile = new FileReader();

    readFile.readAsDataURL(file);

    console.log(readFile);
    readFile.onloadend = () => {
      setLogo({ logo: readFile.result });
    };
  };

  const handleLogoSubmit = () => {
    if (logo.logo) {
      dispatch(addLogo(token, logo));
    } else {
      toast.error(`Please Add a Logo and then Submit!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="w-[850px] h-[700px] shadow-lg my-20 rounded-md p-4 flex flex-col">
      <h3 className="text-lg font-semibold text-black ">
        Add Background Images
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-16 gap-3">
        <div className="flex flex-col">
          <div className="w-full flex justify-center">
            <div className="w-full flex flex-col">
              <input
                type="file"
                name=""
                id=""
                accept="image/*"
                className="mt-2"
                multiple
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

      <h3 className="text-lg font-semibold text-black mt-16">Add Logo</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-7 gap-3">
        <div className="flex flex-col">
          <div className="w-full flex justify-center">
            <div className="w-full flex flex-col">
              <input
                type="file"
                name=""
                id=""
                accept="image/*"
                className="mt-2"
                onChange={handleLogo}
              />
            </div>
          </div>
        </div>
        <button
          className={` ${
            isLoading && "loading"
          } btn no-animation px-3 py-2 bg-slate-800 w-full  rounded-md my-auto text-white font-semibold `}
          onClick={handleLogoSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default BackgroundImageComp;
