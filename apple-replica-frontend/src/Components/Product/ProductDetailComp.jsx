import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Rating } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
// import Carousel from "react-elastic-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Lazy, Pagination, Navigation } from "swiper";
import { addtoCart, updateCartProduct } from "../../Redux/Cart/action-creators";
import Spinner from "../../UI/Spinner";
import ReviewComp from "./ReviewComp";
import placeholder from "../Assets/image-placeholder-base.webp";

const ProductDetailComp = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const refferedBy = useSelector((state) => state.User.userData.refferedBy);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const token = localStorage.getItem("token");
  const userType = useSelector((state) => state.User.userData.userType);

  const config = {
    headers: {
      "x-auth-token": token,
    },
  };
  const deleteHandler = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API}/product/${params.productId}`,
        config
      )
      .then((d) => {
        navigate("/products");
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
  };

  const calcAverageReview = () => {
    const totalLength = product?.reviews?.length;
    let total = 0;
    for (let i of product.reviews) {
      total += i.rating;
    }
    return total / totalLength;
  };

  const fetchProduct = useCallback(() => {
    console.log(params.productId);
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API}/product/${params.productId}`)
      .then((d) => {
        setProduct(d.data.data);
        console.log(d.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
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

  const cartItems = useSelector((state) => state.Cart.cartItems);

  const handleAddtoCart = () => {
    const product = cartItems.find((p) => p.product._id === params.productId);

    console.log(product);
    if (token) {
      if (product) {
        dispatch(updateCartProduct(+quantity, params.productId, token));
      } else {
        dispatch(addtoCart(quantity, params.productId, token));
      }
    } else {
      toast.error(`Please Login and then Add Products to Cart!`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-[80%] min-h-full bg-white mt-20 text-black flex flex-col ">
          <div className="w-full  flex flex-col md:flex-row ">
            <div className="min-w-400px  sm:max-w-[600px] md:min-w-[700px] lg:min-w-[1000px]  ">
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
                modules={[Keyboard, Lazy, Pagination, Navigation]}
                className="mySwiper p-7 mt-4 !h-[250px] rounded-md md:mb-0 mb-10   md:!h-[500px]"
              >
                {product.pictures?.length > 0 ? (
                  product.pictures?.map((p, i) => (
                    <SwiperSlide key={i}>
                      <img src={p || placeholder} alt="" />
                    </SwiperSlide>
                  ))
                ) : (
                  <SwiperSlide>
                    <img src={placeholder} alt="" />
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
            <div className="bg-white h-full w-full flex-1 md:ml-14 ml-0 flex flex-col">
              <div className="w-ful flex flex-col ">
                <div className="flex justify-between">
                  <h3 className="font-sans text-3xl">{product.name}</h3>
                  {userType === "Admin" && (
                    <div className="">
                      <IconButton className="" onClick={() => navigate("edit")}>
                        <Edit className="text-green-400" />
                      </IconButton>
                      <IconButton onClick={deleteHandler}>
                        <Delete className="text-red-600" />
                      </IconButton>
                    </div>
                  )}
                </div>
                <hr className="w-[3em] border-2 border-slate-800 rounded-full" />
                <div className="mt-6">
                  <span className={`text-2xl font-medium `}>
                    ${product.price}
                  </span>
                </div>
                <span className="mt-5 flex items-center">
                  <Rating
                    name="read-only"
                    value={product?.reviews && calcAverageReview()}
                    readOnly
                    size=""
                  />
                  <span className=" ml-3">
                    {product?.reviews?.length} Reviews
                  </span>
                </span>
              </div>
              <p className="mt-10 text-slate-600">{product.description}</p>

              <div className="mt-3 flex justify-between items-center">
                <span className="text-2xl">Quantity</span>
                <input
                  type="number"
                  className="border-slate-200 border px-1 outline-none ml-auto w-[40px]"
                  defaultValue={1}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <button
                onClick={handleAddtoCart}
                className=" mt-20 px-3 py-3 font-medium text-white rounded-sm hover:bg-white hover:text-black hover:border-2 hover:border-slate-600 ease-out duration-100 bg-slate-600"
              >
                Add to Cart
              </button>
            </div>
          </div>

          {product.reviews ? (
            <ReviewComp
              reviews={product.reviews}
              productId={params.productId}
            />
          ) : (
            <Spinner />
          )}
        </div>
      )}
    </>
  );
};

export default ProductDetailComp;
