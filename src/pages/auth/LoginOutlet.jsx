import { Outlet, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { GiHamburger } from "react-icons/gi";
import { FiUser } from "react-icons/fi";
import { TbCurrentLocation } from "react-icons/tb";
import { IoLogInOutline } from "react-icons/io5";
import rider from "../../assets/images/motorbike.png";
import PropTypes from "prop-types";

const LoginOutlet = ({ altsteps, active, altactive }) => {
  const { pathname } = useLocation();

  const steps = [
    {
      name: "Basic Info",
      subtext: "Provide your legal name",
      link: "",
      icon: (className) => <FiUser className={className} />,
    },
    {
      name: "Address Info",
      subtext: "Provide your address",
      link: "address",
      icon: (className) => <TbCurrentLocation className={className} />,
    },
    {
      name: "Login Info",
      subtext: "Choose a username and password for your account",
      link: "login-info",
      icon: (className) => <IoLogInOutline className={className} />,
    },
    {
      name: "Welcome to dzidzi!",
      subtext: "Verify email and login to enjoy!",
      link: "success",
      icon: (className) => <IoLogInOutline className={className} />,
    },
  ];

  const tabs = altsteps || steps;

  return (
    <div className="w-screen h-screen flex flex-col ">
      <div className="grid grid-cols-4">
        <div className="lg:block md:hidden sm:hidden xs:hidden ss:hidden xss:hidden col-span-1 h-screen p-2">
          <div className="min-h-full flex w-full items-center flex flex-col justify-center shadow-sm relative p-8 border border-blue-100 p-1 rounded-lg bg-blue-50">
            <div className="absolute top-8 left-8 flex flex-col">
              <Link to="/">
                <div className="flex items-center gap-4">
                  <GiHamburger
                    className="text-black cursor-pointer"
                    size="25px"
                  />
                  <p className="text-black font-logo font-extrabold text-3xl">
                    dzidzi
                  </p>
                </div>
              </Link>
            </div>

            {pathname.includes("register") && (
              <div className="flex flex-col w-full h-full p-2">
                {tabs.map((item, idx) => {
                  const isActive =
                    (item.name == "Basic Info" &&
                      (active
                        ? pathname == `/auth/register${active}`
                        : pathname == `/auth/register`)) ||
                    (altactive
                      ? pathname == `/auth/register/${altactive}/${item.link}`
                      : pathname == `/auth/register/${item.link}`);

                  return (
                    <div key={idx} className="flex gap-2">
                      <div className="flex flex-col items-center">
                        <div
                          className={`rounded-sm p-2 border ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "bg-white text-gray-400"
                          }`}
                        >
                          {item.icon("text-2xl")}
                        </div>
                        {idx < tabs.length - 1 && (
                          <div className="h-12 border-l-2 border-gray-300 my-1" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <p
                          className={` font-bold text-sm ${
                            isActive ? "font-bold text-black" : "text-gray-300"
                          }`}
                        >
                          {item.name}
                        </p>
                        <p
                          className={`text-xs font-light ${
                            isActive ? "" : "text-gray-300"
                          }`}
                        >
                          {item.subtext}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div>
              <div className="absolute bottom-6 left-0">
                <p className="font-fast text-yellow-500 text-4xl">
                  fast and accurate
                </p>
              </div>
              <img
                src={rider}
                alt=""
                width="240"
                className="absolute bottom-4 right-[-50px]"
              />
            </div>
          </div>
        </div>
        <div className="lg:col-span-3 md:col-span-5 sm:col-span-5 ss:col-span-5 xs:col-span-6 xss:col-span-6 h-screen p-8 flex flex-col">
          <div className="flex justify-between">
            <div className="flex items-center">
              <IoIosArrowRoundBack size="20px" />
              <Link to="/">
                <p className="text-blue-500 lg:text-base md:text-base xs:text-xs sm:text-xs ss:text-xs xss:text-xs">
                  Back to homepage
                </p>
              </Link>
            </div>

            <div className="flex items-center">
              <p className="lg:block md:block xs:hidden sm:hidden ss:hidden xss:hidden mr-1">
                {pathname.includes("register")
                  ? "Already have an account?"
                  : " No account yet?"}
              </p>
              <Link
                to={pathname.includes("register") ? "/auth" : "/auth/register"}
              >
                <p className="text-blue-500 underline lg:text-base md:text-base xs:text-xs sm:text-xs ss:text-xs xss:text-xs">
                  {pathname.includes("register")
                    ? "Login Now"
                    : " Register Now"}
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

LoginOutlet.propTypes = {
  altsteps: PropTypes.array,
  active: PropTypes.string,
  altactive: PropTypes.string,
};
