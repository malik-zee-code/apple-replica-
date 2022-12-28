import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addtoCart, updateCartProduct } from "../../Redux/Cart/action-creators";
import {
  fetchProducts,
  filteredProducts,
} from "../../Redux/Products/action-creator";
import { InputAdornment, Rating, TextField } from "@mui/material";
import placeholder from "../Assets/image-placeholder-base.webp";
import { Search } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Lazy, Pagination, Navigation } from "swiper";
import { getBackgroundImage } from "../../Redux/User/action-creators";

const ProductComp = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.Product.products);
  const filterProducts = useSelector((state) => state.Product.filteredProducts);
  const token = useSelector((state) => state.User.token);
  const cartItems = useSelector((state) => state.Cart.cartItems);
  const refferedBy = useSelector((state) => state.User.userData.refferedBy);
  const backgroundImage = useSelector((state) => state.User.backgroundImages);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBackgroundImage(token));
  }, [dispatch, token]);

  const handleAddtoCart = (productId, e) => {
    e.stopPropagation();
    const product = cartItems.find((p) => p.product._id === productId);

    console.log(product);
    if (token) {
      if (product) {
        dispatch(updateCartProduct(1, productId, token));
      } else {
        dispatch(addtoCart(1, productId, token));
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
    dispatch(fetchProducts());
  }, [dispatch]);

  const calcAverageReview = (p) => {
    const totalLength = p?.reviews?.length;
    let total = 0;
    for (let i of p.reviews) {
      total += i.rating;
    }
    return total / totalLength;
  };

  const searchHandler = (e) => {
    dispatch(filteredProducts(products, e.target.value));
  };

  return (
    <>
      <>
        <div className=" w-full   ">
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
            className="mySwiper p-7 mt-4  !h-[450px] rounded-md  md:mb-0 mb-10   md:!h-[500px]"
          >
            {backgroundImage.length > 0 ? (
              backgroundImage.map((p, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={p || placeholder}
                    alt=""
                    className=" object-contain  "
                  />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <img src={placeholder} alt="" />
              </SwiperSlide>
            )}
          </Swiper>
        </div>
        <div className="mt-20">
          <TextField
            id="input-with-icon-textfield"
            label="Search by title"
            onChange={searchHandler}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </div>
        <div className="w-[80%] my-20 min-h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-20 gap-3 ">
          {filterProducts &&
            filterProducts.map((p, i) => (
              <div
                onClick={() => navigate(`${p._id}`)}
                className="w-[300px] cursor-pointer my-3 hover:scale-105 ease-in duration-100 h-[400px] bg-white shadow-lg hover:shadow-2xl rounded-lg flex flex-col"
                key={i}
              >
                <img
                  src={p.pictures[0] || placeholder}
                  alt=""
                  className="w-full h-[200px] object-contain"
                />
                <div className=" w-full flex flex-col items-center justify-center mt-auto">
                  <span className="text-black text-xl font-bold ">
                    {p.name}
                  </span>
                  <span className="">{p.description.slice(0, 28)}...</span>

                  <span className=" text-black font-semibold text-2xl mt-3">
                    ${p.price}
                  </span>

                  <Rating
                    name="read-only"
                    value={p?.reviews && calcAverageReview(p)}
                    readOnly
                    size=""
                  />
                </div>
                <button
                  className="mt-auto px-3 py-3  bg-zinc-500 rounded-b-lg text-white font-semibold hover:bg-zinc-600 ease-in duration-100  "
                  onClick={handleAddtoCart.bind(null, p._id)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
        </div>
      </>
    </>
  );
};

export default ProductComp;
