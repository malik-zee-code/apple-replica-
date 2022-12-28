import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./Pages/Register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "./Components/Header/Header";
import Login from "./Pages/Login";
import FAQ from "./Pages/FAQ";
import AddFaq from "./Pages/AddFaq";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import ProductDetail from "./Pages/ProductDetail";
import AddProduct from "./Pages/AddProduct";
import EditProduct from "./Components/Product/EditProduct";
import Checkout from "./Pages/Checkout";
import Order from "./Pages/Order";
import AllWallets from "./Pages/AllWallets";
import Wallet from "./Pages/Wallet";
import Invite from "./Pages/Invite";
import InviteRegisterComp from "./Components/Invite/RegisterComp";
import ChangePercentage from "./Pages/ChangePercentage";
import ChangeLinkStatus from "./Pages/ChangeLinkStatus";
import BackgroundImage from "./Pages/BackgroundImage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBackgroundImage, getLogo } from "./Redux/User/action-creators";

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getBackgroundImage(token));
    dispatch(getLogo(token));
  }, [dispatch, token]);
  return (
    <div className="App min-h-screen bg-white flex flex-col ">
      <ToastContainer />
      <Header />
      <Routes>
        <Route
          path="/register"
          element={
            <>
              <Register />
            </>
          }
        />
        <Route
          path="/signin"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/addfaq" element={<AddFaq />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/products/:productId/edit" element={<EditProduct />} />
        <Route path="/products/addProduct" element={<AddProduct />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order" element={<Order />} />
        <Route path="/allWallet" element={<AllWallets />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/invite" element={<Invite />} />
        <Route path="/changePercent" element={<ChangePercentage />} />
        <Route path="/changeLinkStatus" element={<ChangeLinkStatus />} />
        <Route path="/backgroundImage" element={<BackgroundImage />} />

        <Route
          path="/invite/:username/:userId"
          element={<InviteRegisterComp />}
        />
      </Routes>

      {/* <Footer /> */}
    </div>
  );
};

export default App;
