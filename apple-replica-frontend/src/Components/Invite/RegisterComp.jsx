import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterUser } from "../../Redux/User/action-creators";

const InviteRegisterComp = () => {
  const [cradentials, setCradentials] = useState({
    username: "",
    password: "",
    repassword: "",
  });

  const params = useParams();
  const [isValid, setIsvalid] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    if (cradentials.password !== cradentials.repassword) {
      toast.error("Password Doesn't matched!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    dispatch(
      RegisterUser(
        {
          username: cradentials.username,
          password: cradentials.password,
          refferedBy: params.userId,
        },
        navigate
      )
    );
  };

  const onChange = (value) => {
    console.log("Captcha value:", value);
    setIsvalid(true);
  };
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate(-1);
    }
  }, [token, navigate]);

  useEffect(() => {}, []);

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
            Create Your Apple ID
          </h1>

          <span className="text-black mt-3">
            One Apple ID is all you need to access all Apple services.
          </span>

          <div className="mt-10 w-full flex flex-col items-center min-h-[500px]">
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
            <input
              onChange={(e) =>
                setCradentials({ ...cradentials, repassword: e.target.value })
              }
              type="password"
              placeholder="Re-Enter Password"
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

export default InviteRegisterComp;
