import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { Link } from "react-router-dom";
import {
  IoCloseSharp,
  IoFastFoodOutline,
  IoRestaurantOutline,
} from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCoupon2Line } from "react-icons/ri";
import { ImSwitch } from "react-icons/im";
import { TbUsersGroup } from "react-icons/tb";
import CheckOnlineStatus from "../../components/CheckOnlineStatus";
import Loader from "../../components/loaders/Loader";
import { GrRestaurant } from "react-icons/gr";
import { useGetActiveUser } from "../../components/brokers/apicalls";
import { useLogoutUser } from "../../hooks/useLogoutUser";
import {
  MdOutlineDeliveryDining,
  MdOutlineExposurePlus2,
  MdOutlineHome,
} from "react-icons/md";
import { TiTicket } from "react-icons/ti";

const Dashboard = () => {
  const pageRef = useRef(null);
  const { pathname } = useLocation();
  const [show, setShow] = useState(true);
  const [mobileShow, setMobileShow] = useState(false);
  const { mutate, isPending } = useLogoutUser();

  const {
    data: activeUser,
    isLoading: activeUserLoading,
    // isError: isActiveUserError,
    // error: activeUserError,
  } = useGetActiveUser();

  const showSide = () => {
    setShow(!show);
  };

  const mobileShowSide = () => {
    setMobileShow(!mobileShow);
  };

  // const scrollToTop = () => {
  //   // Use the scrollIntoView method to scroll to the top of the page
  //   if (pageRef.current) {
  //     pageRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

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
      icon: (className = "") => (
        <MdOutlineHome className={className} size="25px" />
      ),
      text: "Home",
      userType: [
        "ADMIN",
        "RESTAURANT_ADMIN",
        "COURIER",
        "SERVICE",
        "RESTAURANT_BRANCH",
      ],
    },
    {
      link: "users",
      icon: (className = "") => (
        <TbUsersGroup className={className} size="25px" />
      ),
      text: "Users",
      userType: ["ADMIN", "SERVICE"],
    },
    {
      link: "restaurants",
      icon: (className = "") => (
        <GrRestaurant className={className} size="25px" />
      ),
      text: "Restaurants",
      userType: ["ADMIN", "SERVICE"],
    },
    {
      link: "branches",
      icon: (className = "") => (
        <GrRestaurant className={className} size="25px" />
      ),
      text: "Branches",
      userType: ["RESTAURANT_ADMIN"],
    },
    {
      link: "coupons",
      icon: (className = "") => (
        <RiCoupon2Line className={className} size="25px" />
      ),
      text: "Coupons",
      userType: ["ADMIN", "RESTAURANT_ADMIN", "SERVICE"],
    },
    {
      link: "orders",
      icon: (className = "") => (
        <IoFastFoodOutline className={className} size="25px" />
      ),
      text: "Orders",
      userType: [
        "ADMIN",
        "RESTAURANT_ADMIN",
        "COURIER",
        "RESTAURANT_BRANCH",
        "SERVICE",
      ],
    },
    // {
    //   link: "services",
    //   icon: (className = "") => (
    //     <MdPendingActions className={className} size="25px" />
    //   ),
    //   text: "Services",
    //   userType: ["ADMIN"],
    // },
    {
      link: "couriers",
      icon: (className = "") => (
        <MdOutlineDeliveryDining className={className} size="25px" />
      ),
      text: "Couriers",
      userType: ["ADMIN"],
    },
    {
      link: "tickets",
      icon: (className = "") => <TiTicket className={className} size="25px" />,
      text: "Tickets",
      userType: [
        "ADMIN",
        "RESTAURANT_ADMIN",
        "SERVICE",
        "RESTAURANT_ADMIN",
        "RESTAURANT_BRANCH",
        "COURIER",
      ],
    },
    {
      link: "menus",
      icon: (className = "") => (
        <IoRestaurantOutline className={className} size="25px" />
      ),
      text: "Menus",
      userType: ["ADMIN", "RESTAURANT_ADMIN", "SERVICE", "RESTAURANT_BRANCH"],
    },
    {
      link: "extras",
      icon: (className = "") => (
        <MdOutlineExposurePlus2 className={className} size="25px" />
      ),
      text: "Extras",
      userType: ["ADMIN", "RESTAURANT_ADMIN", "SERVICE", "RESTAURANT_BRANCH"],
    },
    // {
    //   link: "profile-details",
    //   icon: (className = "") => (
    //     <FaUserGraduate className={className} size="25px" />
    //   ),
    //   text: "Profile",
    //   userType: ["ADMIN", "RESTAURANT_ADMIN", "COURIER", "SERVICE"],
    // },
  ];

  const handleLogout = () => {
    return mutate();
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
        <Outlet context={[activeUserLoading, activeUser]} />
      </div>
    );
  };

  //   useEffect(() => {
  //   const logout = () => {
  //    handleLogout()
  //   };

  //   // Function to reset the timeout
  //   const resetTimer = () => {
  //     clearTimeout(timer); // Clear the old timer
  //     timer = setTimeout(() => {
  //       logout();
  //     }, 120000); // Reset the timer
  //   };

  //   let timer = setTimeout(() => {
  //     logout();
  //   }, 60000); // Initial timer for 2 minutes

  //   // Add event listeners to reset timer on user activity
  //   window.addEventListener("mousemove", resetTimer);
  //   window.addEventListener("keydown", resetTimer);

  //   // Clean up the event listeners and timer when component unmounts
  //   return () => {
  //     clearTimeout(timer);
  //     window.removeEventListener("mousemove", resetTimer);
  //     window.removeEventListener("keydown", resetTimer);
  //   };
  // }, [setAuth, navigate, handleLogout]);

  return (
    <div ref={pageRef}>
      <CheckOnlineStatus>
        <div className="grid grid-cols-6 h-screen">
          {show && (
            <div>
              <div
                className={`${
                  show ? "col-span-1" : ""
                }  lg:flex-col lg:flex md:hidden sm:hidden xs:hidden ss:hidden xss:hidden fixed w-[16.7%]`}
              >
                <div className="flex flex-col">
                  <div className="p-5 flex items-center justify-center">
                    <p className="font-logo font-extrabold text-4xl text-blue-600">
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
                                ? "bg-blue-100"
                                : "hover:bg-gray-50"
                            } ${idx == 0 ? "mt-2" : ""}`}
                          >
                            <div
                              className={` ${
                                pathname == `/dashboard/${item.link}` ||
                                pathname == `/dashboard` + item.link
                                  ? "border h-full w-[10px] py-7 bg-blue-600 rounded-r"
                                  : "h-full w-[10px] py-7"
                              }`}
                            />
                            {item.icon(
                              `ml-5 mr-3  ${
                                pathname == `/dashboard/${item.link}` ||
                                pathname == `/dashboard` + item.link
                                  ? "text-blue-600"
                                  : "text-blue-300"
                              }`
                            )}
                            <p
                              className={`text-xs ${
                                pathname == `/dashboard/${item.link}` ||
                                pathname == `/dashboard` + item.link
                                  ? "text-blue-600 font-bold"
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
                    <p className="font-bold text-md text-blue-600 text-secular">
                      dzidzi
                    </p>
                  </div>
                  <IoCloseSharp
                    className="text-blue-600"
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
                                ? "border h-full w-[10px] py-7 bg-blue-600 rounded-r"
                                : "h-full w-[10px] py-7"
                            }`}
                          />
                          {item.icon(
                            `ml-5 mr-3  ${
                              pathname == `/${item.link}` ||
                              pathname == `` + item.link
                                ? "text-blue-600"
                                : "text-slate-500"
                            }`
                          )}
                          <p
                            className={`text-xs ${
                              pathname == `/dashboard/${item.link}`
                                ? "text-blue-600 font-bold"
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
                ? "lg:col-span-5 md:col-span-6 sm:col-span-6 xs:col-span-6 ss:col-span-6 xss:col-span-6"
                : "lg:col-span-6 md:col-span-6 sm:col-span-6 xs:col-span-6 ss:col-span-6 xss:col-span-6"
            } flex flex-col`}
          >
            <div
              className={`${
                show
                  ? "lg:left-[16.6%] md:left-0 sm:left-0 ss:left-0 xss:left-0 xs:left-0"
                  : "left-0"
              } border-b p-5 flex items-center fixed right-0  bg-white z-[3]`}
            >
              <div className="flex items-center justify-between w-full cursor-pointer lg:hidden md:flex">
                <div
                  className="flex items-center border px-1 py-1 justify-between rounded bg-blue-600 cursor-pointer"
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
                <div>
                  <button
                    disabled={isPending}
                    className="rounded-full border py-2 px-5 bg-blue-600 flex items-center cursor-pointer"
                    onClick={handleLogout}
                  >
                    <ImSwitch size="15px" className="text-white" />
                  </button>
                </div>
              </div>
              <div className="lg:flex w-full justify-between items-center cursor-pointer  md:hidden sm:hidden xs:hidden ss:hidden xxs:hidden">
                <GiHamburgerMenu
                  size="20px"
                  className="text-blue-600 mr-2 cursor-pointer"
                  onClick={() => {
                    showSide();
                  }}
                />
                <div className="flex w-full justify-end items-center">
                  {!activeUserLoading && (
                    <div className="rounded-full border py-2 px-5 bg-slate-100 mr-2">
                      <p className="text-xs font-bold text-blue-600">
                        {activeUser?.currentUserRole.replaceAll("_", " ")}
                      </p>
                    </div>
                  )}
                  <div>
                    <button
                      disabled={isPending}
                      className="rounded-full border py-2 px-5 bg-blue-600 flex items-center cursor-pointer"
                      onClick={handleLogout}
                    >
                      <ImSwitch size="15px" className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 p-4 bg-blue-50 h-full">{renderContent()}</div>
          </div>
        </div>
      </CheckOnlineStatus>
    </div>
  );
};

export default Dashboard;
