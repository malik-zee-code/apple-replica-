import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../Redux/User/action-creators";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";

const LoginComp = () => {
  const [cradentials, setCradentials] = useState({
    username: "",
    password: "",
    userType: "",
  });

  const [isValid, setIsvalid] = useState(false);

  const onChange = (value) => {
    console.log("Captcha value:", value);
    setIsvalid(true);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginUser(cradentials, navigate));
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate(-1);
    }
  }, [token, navigate]);
  return (
    <div className="w-full min-h-full flex justify-center ">
      {" "}
      <form
        action=""
        onSubmit={onSubmit}
        className=" w-[500px] flex justify-center"
      >
        <div className="flex flex-col items-center w-full h-full mt-10">
          <h1 className="text-center text-4xl mt-5 font-semibold text-black">
            Apple ID
          </h1>
          <span className="text-black mt-3">
            Log In to your Apple account using your Cradentials.
          </span>

          <div className="mt-16 w-full flex flex-col items-center min-h-[500px]">
            <input
              onChange={(e) =>
                setCradentials({ ...cradentials, username: e.target.value })
              }
              type="text"
              placeholder="Username"
              className="input input-bordered input-info w-full max-w-xs bg-white mt-4 text-black"
            />
            <input
              onChange={(e) =>
                setCradentials({ ...cradentials, password: e.target.value })
              }
              type="password"
              placeholder="Password"
              className="input input-bordered input-info w-full max-w-xs bg-white mt-4 text-black"
            />

            <ReCAPTCHA
              sitekey={process.env.REACT_APP_SITE_KEY}
              onChange={onChange}
              className="mt-4"
            />

            <Button
              disabled={!isValid}
              type="submit"
              variant="contained"
              sx={{ marginTop: "50px", width: "55%", position: "unset" }}
            >
              Continue
            </Button>
          </div>
        </div>
      </form>{" "}
    </div>
  );
};

export default LoginComp;
