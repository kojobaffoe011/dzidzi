import React from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { GiHamburger } from "react-icons/gi";

const LoginOutlet = () => {
  return (
    <div className="w-screen h-screen flex flex-col ">
      <div className="grid grid-cols-6">
        <div className="lg:block md:hidden sm:hidden xs:hidden ss:hidden xss:hidden col-span-2 h-screen bg-login-bg bg-cover">
          <div className="min-h-screen bg-[#0c0a09] bg-opacity-70 flex w-full items-center flex flex-col justify-center relative shadow-2xl">
            <div className="absolute top-2 left-4 flex flex-col">
              <Link to="/">
                <div className="flex items-center gap-4">
                  <GiHamburger
                    className="text-white cursor-pointer"
                    size="25px"
                  />
                  <p className="text-white font-logo font-extrabold text-3xl">
                    dzidzi
                  </p>
                </div>
              </Link>
            </div>
            {/* <div className="absolute top-50 right-50">
              <p className="font-bold text-3xl text-center text-white">
                Your #1 Trusted Hostels Booking Platform in Ghana.
              </p>
            </div> */}
          </div>
        </div>
        <div className="lg:col-span-4 md:col-span-6 sm:col-span-6 ss:col-span-6 xs:col-span-6 xss:col-span-6 h-screen p-8 flex flex-col">
          <div className="flex justify-between">
            <div className="flex items-center">
              <IoIosArrowRoundBack size="20px" />
              <Link to="/">
                <p className="text-red-500 lg:text-base md:text-base xs:text-xs sm:text-xs ss:text-xs xss:text-xs">
                  Back to homepage
                </p>
              </Link>
            </div>
            <div className="flex items-center">
              <p className="lg:block md:block xs:hidden sm:hidden ss:hidden xss:hidden mr-1">
                No account yet?
              </p>
              <Link to="/auth/register">
                <p className="text-red-500 underline lg:text-base md:text-base xs:text-xs sm:text-xs ss:text-xs xss:text-xs">
                  Register Now!
                </p>
              </Link>
            </div>
          </div>
          <div className="flex flex-col h-full items-center justify-center w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginOutlet;
