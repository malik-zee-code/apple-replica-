import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full h-[100px] bg-zinc-100 flex justify-center p-7 mt-auto">
      <div className="flex flex-col w-[50%]">
        <span className="text-xs">
          More ways to shop:
          <a href="/#" className="text-indigo-500 mx-2">
            Find an Apple Store
          </a>
          or
          <a href="/#" className="text-indigo-500 mx-2">
            other retailer
          </a>
          near you. Or call 1-800-MY-APPLE.
        </span>
        <div className="flex text-xs justify-between">
          <span>Copyright © 2022 Apple Inc. All rights reserved.</span>
          <ul className="my-[1px] ml-2 flex">
            <li>
              <Link
                to="#"
                className="text-slate-500  hover:underline border-r-[1px] px-2 border-slate-300"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-slate-500  hover:underline border-r-[1px] px-2 border-slate-300"
              >
                Term of Use
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-slate-500  hover:underline border-r-[1px] px-2 border-slate-300"
              >
                Sales and Refunds
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-slate-500  hover:underline border-r-[1px] px-2 border-slate-300"
              >
                Legals
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-slate-500  hover:underline border-r-[1px] px-2 "
              >
                Site Map
              </Link>
            </li>
          </ul>

          <span className="text-slate-600">United States</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
