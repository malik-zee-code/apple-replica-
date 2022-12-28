import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../UI/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Keyboard, Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

const EditProduct = () => {
  const [isLoading, setIsloading] = useState(false);
  const params = useParams();

  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  const fetchProduct = useCallback(() => {
    console.log(params.productId);
    axios
      .get(`${process.env.REACT_APP_API}/product/${params.productId}`)
      .then((d) => {
        setProduct(d.data.data);
        console.log(d.data.data);
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
  }, [params.productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const [state, setState] = useState({});

  const handleProductImages = (e) => {
    state.pictures = [];
    console.log(state.pictures);
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
      .patch(
        `${process.env.REACT_APP_API}/product/${params.productId}`,
        state,
        config
      )
      .then((d) => {
        console.log(d);
        setIsloading(false);
        navigate(-1);
      })
      .catch((d) => {
        console.log(d);
        setIsloading(false);
      });
  };

  return (
    <>
      {product ? (
        <div className="flex justify-center">
          <div className="w-[850px] min-h-[700px] shadow-lg my-20 rounded-md p-4 flex flex-col ">
            <h3 className="text-lg font-semibold text-black ">Edit Product</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 mt-16 gap-3">
              <div className="flex flex-col">
                <div className="flex flex-col mb-4">
                  <span className="text-slate-600 mb-2">Product Name</span>
                  <input
                    defaultValue={product.name}
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                    type="text"
                    className=" text-slate-800 p-2 outline-none focus:ring-[3px] bg-slate-100 ease-in-out duration-75 rounded-[4px]"
                  />
                </div>

                <div className="flex flex-col mb-4">
                  <span className="text-slate-600 mb-2">Description</span>
                  <textarea
                    defaultValue={product.description}
                    onChange={(e) =>
                      setState({ ...state, description: e.target.value })
                    }
                    className="p-2 text-slate-800  outline-none focus:ring-[3px] bg-slate-100 ease-in-out duration-75 rounded-[4px]"
                  />
                </div>

                <div className="flex flex-col mb-4">
                  <span className="text-slate-600 mb-2">Price</span>
                  <input
                    defaultValue={product.price}
                    onChange={(e) =>
                      setState({ ...state, price: e.target.value })
                    }
                    type="number"
                    className="p-2 outline-none text-slate-800  focus:ring-[3px] bg-slate-100 ease-in-out duration-75 rounded-[4px]"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <span className="text-slate-600 mb-2">Shipping Fees</span>
                  <input
                    defaultValue={product.shippingFees}
                    onChange={(e) =>
                      setState({ ...state, shippingFees: e.target.value })
                    }
                    type="number"
                    className="p-2 outline-none text-slate-800  focus:ring-[3px] bg-slate-100 ease-in-out duration-75 rounded-[4px]"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex flex-col ">
                  <span className="text-slate-600">
                    Add more product Images
                  </span>
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

                <Swiper
                  slidesPerView={1}
                  spaceBetween={30}
                  keyboard={{
                    enabled: true,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  modules={[Keyboard, Pagination, Navigation]}
                  className="mySwiper p-7 mt-4 !h-[250px] rounded-md"
                >
                  {product.pictures?.map((p, i) => (
                    <SwiperSlide key={i}>
                      <img src={p} alt="" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <button
              className={` ${
                isLoading && "loading"
              } btn no-animation px-3 py-2 bg-slate-800 w-full  rounded-md mt-4 md:my-auto text-white font-semibold `}
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default EditProduct;
