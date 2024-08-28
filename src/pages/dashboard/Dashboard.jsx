import React, { useEffect, useRef, useState } from "react";
import { FiHome } from "react-icons/fi";
import { Outlet, useLocation } from "react-router";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { IoCloseSharp } from "react-icons/io5";
import { MdPendingActions } from "react-icons/md";
import { FaBed, FaUserGraduate } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsBookmarkStarFill, BsPlayFill } from "react-icons/bs";
import { useNavigate } from "react-router";
import { ImSwitch } from "react-icons/im";
import { TbFileUpload } from "react-icons/tb";
import { AiOutlineFieldTime } from "react-icons/ai";
import CheckOnlineStatus from "../../components/CheckOnlineStatus";
import { showErrorToast } from "../../toast/Toast";
import Loader from "../../components/loaders/Loader";
// import AccountLocked from "../../components/notices/AccountLocked";
import cookie from "../../utils/cookie";
import { useGetActiveUser } from "../../components/brokers/apicalls";

const Dashboard = () => {
  const pageRef = useRef(null);
  const { pathname } = useLocation();
  const { auth, setAuth } = useAuth();
  const [show, setShow] = useState(true);
  const [mobileShow, setMobileShow] = useState(false);
  const {
    data: activeUser,
    isLoading: activeUserLoading,
    isError: isActiveUserError,
    error: activeUserError,
  } = useGetActiveUser();

  // const {
  //   isLoading: campusLoading,
  //   data: campusData,
  //   isError: isCampusError,
  //   error: campusError,
  // } = useGetSingleCampus(studentInfo?.[0]?.campus);

  const showSide = () => {
    setShow(!show);
  };

  const mobileShowSide = () => {
    setMobileShow(!mobileShow);
  };

  const scrollToTop = () => {
    // Use the scrollIntoView method to scroll to the top of the page
    if (pageRef.current) {
      pageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Scroll to the top of the page with a smooth scrolling effect
    if (window.scrollY > 100) {
      // scrollToTop()
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }
  }, [pathname]);

  const sideBarNav = [
    {
      link: "",
      icon: (className = "") => <FiHome className={className} size="25px" />,
      text: "Home",
      userType: ["ADMIN", "RESTAURANT", "COURIER", "SERVICE"],
    },
    {
      link: "",
      icon: (className = "") => <FaBed className={className} size="25px" />,
      text: "Users",
      userType: ["ADMIN", "SERVICE"],
    },
    {
      link: "restaurants",
      icon: (className = "") => (
        <BsBookmarkStarFill className={className} size="25px" />
      ),
      text: "Restaurants",
      userType: ["ADMIN", "SERVICE"],
    },
    {
      link: "coupons",
      icon: (className = "") => (
        <BsBookmarkStarFill className={className} size="25px" />
      ),
      text: "Coupons",
      userType: ["ADMIN", "RESTAURANT"],
    },
    {
      link: "services",
      icon: (className = "") => (
        <MdPendingActions className={className} size="25px" />
      ),
      text: "Services",
      userType: ["ADMIN", "RESTAURANT", "COURIER", "SERVICE"],
    },
    {
      link: "couriers",
      icon: (className = "") => (
        <AiOutlineFieldTime className={className} size="25px" />
      ),
      text: "Couriers",
      userType: ["ADMIN", "RESTAURANT", "COURIER", "SERVICE"],
    },
    {
      link: "tickets",
      icon: (className = "") => (
        <AiOutlineFieldTime className={className} size="25px" />
      ),
      text: "Couriers",
      userType: ["RESTAURANT", "SERVICE"],
    },
    {
      link: "menus",
      icon: (className = "") => (
        <TbFileUpload className={className} size="25px" />
      ),
      text: "Menus",
      userType: ["ADMIN", "RESTAURANT", "SERVICE"],
    },
    {
      link: "profile",
      icon: (className = "") => (
        <FaUserGraduate className={className} size="25px" />
      ),
      text: "Profile",
      userType: ["ADMIN", "RESTAURANT", "COURIER", "SERVICE"],
    },
  ];

  const orgNav = [
    {
      link: "",
      icon: (className = "") => <FiHome className={className} size="25px" />,
      text: "Home",
      new: false,
    },
    {
      link: "short-stay",
      icon: (className = "") => (
        <AiOutlineFieldTime className={className} size="25px" />
      ),
      text: "Short Stay",
      new: false,
    },
    {
      link: "profile",
      icon: (className = "") => (
        <FaUserGraduate className={className} size="25px" />
      ),
      text: "Profile",
      new: false,
    },
  ];

  const navigate = useNavigate();
  const navigateTo = (url) => {
    navigate(url);
  };

  const handleLogout = () => {
    setAuth({});
    localStorage.removeItem("ghlstud");
    localStorage.removeItem("loginTime");
    cookie.clearCipher();
    navigateTo("/");
  };

  // if (isStudentError || isCampusError || studentError || campusError) {
  //   return <AccountLocked hidden="hidden" message="Error Fetching Data" />;
  // }

  const renderContent = () => {
    if (activeUserLoading) {
      return <Loader />;
    }
    return (
      <div className="p-2">
        <Outlet context={[activeUserLoading]} />
      </div>
    );
  };

  // function to check elapsed time and trigger logout
  const checkLogoutTimeout = () => {
    const loginTime = parseInt(localStorage.getItem("loginTime"), 10);
    const currentTime = new Date().getTime();
    const elapsedSeconds = (currentTime - loginTime) / 1000; // Convert to seconds

    if (elapsedSeconds >= 3600) {
      showErrorToast("Unauthorized Access");
      handleLogout();
    }
  };

  // Periodically check the elapsed time
  setInterval(checkLogoutTimeout(), 60000); // 60000 milliseconds = 1 minute

  return (
    <div ref={pageRef}>
      <CheckOnlineStatus>
        <div className="grid grid-cols-5 h-screen">
          {show && (
            <div className="col-span-1 lg:flex-col lg:flex md:hidden sm:hidden xs:hidden ss:hidden xss:hidden">
              <div className="flex flex-col">
                <div className="p-5 flex items-center justify-center">
                  <p className="font-bold text-md text-[#0d1655] text-secular">
                    dzidzi
                  </p>
                </div>
              </div>
              <div className="">
                {sideBarNav
                  .filter((item) =>
                    item.userType.includes(activeUser?.currentUserRole)
                  )
                  .map((item, idx) => {
                    return (
                      <Link to={item.link} key={idx}>
                        <div
                          className={`flex items-center cursor-pointer ${
                            pathname == `/dashboard/${item.link}` ||
                            pathname == `/dashboard` + item.link
                              ? "bg-blue-50"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div
                            className={` ${
                              pathname == `/dashboard/${item.link}` ||
                              pathname == `/dashboard` + item.link
                                ? "border h-full w-[10px] py-7 bg-[#0d1655] rounded-r"
                                : "h-full w-[10px] py-7"
                            }`}
                          />
                          {item.icon(
                            `ml-5 mr-3  ${
                              pathname == `/dashboard/${item.link}` ||
                              pathname == `/dashboard` + item.link
                                ? "text-[#0d1655]"
                                : "text-slate-500"
                            }`
                          )}
                          <p
                            className={`text-xs ${
                              pathname == `/dashboard/${item.link}` ||
                              pathname == `/dashboard` + item.link
                                ? "text-[#0d1655] font-bold"
                                : "text-slate-500"
                            }`}
                          >
                            {item.text}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          )}
          {mobileShow && (
            <div
              className={`absolute z-10 col-span-2 border bg-white lg:hidden md:block top-0 bottom-0 w-full  h-screen ${
                mobileShow ? "block" : "hidden"
              }`}
            >
              <div className="flex flex-col justify-center">
                <div className="border-b p-5 flex items-center justify-between shadow-sm">
                  <div className="flex items-center">
                    <p className="font-bold text-md text-[#0d1655] text-secular">
                      Ghana Hostels Limited
                    </p>
                  </div>
                  <IoCloseSharp
                    className="text-[#0d1655]"
                    size="1.5rem"
                    onClick={() => {
                      setMobileShow(false);
                    }}
                  />
                </div>
              </div>
              <div className="">
                {sideBarNav
                  .filter((item) =>
                    item.userType.includes(activeUser?.currentUserRole)
                  )
                  .map((item, idx) => {
                    return (
                      <Link to={item.link} key={idx}>
                        <div
                          className={`flex items-center cursor-pointer  ${
                            pathname == `/${item.link}` ||
                            pathname == `` + item.link
                              ? "bg-blue-50"
                              : "hover:bg-gray-50"
                          }`}
                          onClick={() => {
                            setMobileShow(false);
                          }}
                        >
                          <div
                            className={` ${
                              pathname == `/${item.link}` ||
                              pathname == `` + item.link
                                ? "border h-full w-[10px] py-7 bg-[#0d1655] rounded-r"
                                : "h-full w-[10px] py-7"
                            }`}
                          />
                          {item.icon(
                            `ml-5 mr-3  ${
                              pathname == `/${item.link}` ||
                              pathname == `` + item.link
                                ? "text-[#0d1655]"
                                : "text-slate-500"
                            }`
                          )}
                          <p
                            className={`text-xs ${
                              pathname == `/dashboard/${item.link}`
                                ? "text-[#0d1655] font-bold"
                                : "text-slate-500"
                            }`}
                          >
                            {item.text}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          )}
          <div
            className={`${
              show
                ? "lg:col-span-4 md:col-span-5 sm:col-span-5 xs:col-span-5 ss:col-span-5 xss:col-span-5"
                : "lg:col-span-5 md:col-span-5 sm:col-span-5 xs:col-span-5 ss:col-span-5 xss:col-span-5"
            } flex flex-col `}
          >
            <div
              className={`${
                show
                  ? "lg:left-[20%] md:left-0 sm:left-0 ss:left-0 xss:left-0 xs:left-0"
                  : "left-0"
              } border-b p-5 flex items-center shadow-sm fixed right-0  bg-white z-[3]`}
            >
              <div className="flex items-center justify-between w-full cursor-pointer lg:hidden md:flex">
                <div
                  className="flex items-center border px-1 py-1 justify-between rounded bg-[#0d1655] cursor-pointer"
                  onClick={() => {
                    mobileShowSide();
                  }}
                >
                  <p className="font-bold text-sm mr-1 text-white"> Menu</p>
                  <GiHamburgerMenu
                    size="20px"
                    className="text-white cursor-pointer"
                  />
                </div>
                <div
                  className="rounded-full border py-2 px-5 bg-[#0d1655] flex items-center cursor-pointer"
                  onClick={handleLogout}
                >
                  <button>
                    <ImSwitch size="15px" className="text-white" />
                  </button>
                </div>
              </div>
              <div className="lg:flex w-full justify-between items-center cursor-pointer  md:hidden sm:hidden xs:hidden ss:hidden xxs:hidden">
                <GiHamburgerMenu
                  size="20px"
                  className="text-[#0d1655] mr-2 cursor-pointer"
                  onClick={() => {
                    showSide();
                  }}
                />
                <Link to={"/dashboard/profile"}>
                  <div className="flex w-full justify-end items-center">
                    <div className="rounded-full border py-2 px-5 bg-slate-100 mr-2">
                      <p className="text-xs font-bold">{auth?.name}</p>
                    </div>
                    <div
                      className="rounded-full border py-2 px-5 bg-slate-100 flex items-center cursor-pointer"
                      onClick={handleLogout}
                    >
                      <button>
                        <ImSwitch size="15px" />
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div
              className="mt-16"
              style={{ overflowY: "scroll", height: "calc(100vh - 64px)" }}
            >
              {renderContent()}
            </div>
          </div>
        </div>
      </CheckOnlineStatus>
    </div>
  );
};

export default Dashboard;
