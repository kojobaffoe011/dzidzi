import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { Link } from "react-router-dom";
import {
  IoCloseSharp,
  IoFastFoodOutline,
  IoRestaurantOutline,
} from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCoupon2Line, RiSettings5Line } from "react-icons/ri";
import { ImSwitch } from "react-icons/im";
import { TbUsersGroup } from "react-icons/tb";
import CheckOnlineStatus from "../../components/CheckOnlineStatus";
import Loader from "../../components/loaders/Loader";
import { GrRestaurant } from "react-icons/gr";
import {
  useGetActiveUser,
  useGetSingleCourier,
  useUpdateCourierAvailability,
} from "../../components/brokers/apicalls";
import { useLogoutUser } from "../../hooks/useLogoutUser";
import {
  MdOutlineDeliveryDining,
  MdOutlineExposurePlus2,
  MdOutlineHome,
} from "react-icons/md";
import { TiTicket } from "react-icons/ti";
import { useMutation } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../toast/Toast";

const Dashboard = () => {
  const pageRef = useRef(null);
  const dropdownRef = useRef(null);
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [mobileShow, setMobileShow] = useState(false);
  const { mutate, isPending } = useLogoutUser();
  const { mutationFn } = useUpdateCourierAvailability();

  const {
    data: activeUser,
    isLoading: activeUserLoading,
    // isError: isActiveUserError,
    // error: activeUserError,
  } = useGetActiveUser();

  const {
    data: courier,
    isLoading: isCourierLoading,
    refetch,
    // isError: isActiveUserError,
    // error: activeUserError,
  } = useGetSingleCourier(
    activeUser?.currentUserRole == "COURIER" ? activeUser?.currentUserId : null
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const showSide = () => {
    setShow(!show);
  };

  const mobileShowSide = () => {
    setMobileShow(!mobileShow);
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
    {
      link: "coupons",
      icon: (className = "") => (
        <RiCoupon2Line className={className} size="25px" />
      ),
      text: "Coupons",
      userType: ["ADMIN", "RESTAURANT_ADMIN", "SERVICE"],
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
      userType: ["ADMIN", "SERVICE"],
    },
    // {
    //   link: "couriers-online",
    //   icon: (className = "") => (
    //     <MdOutlineDeliveryDining className={className} size="25px" />
    //   ),
    //   text: "Online couriers",
    //   userType: ["ADMIN", "SERVICE"],
    // },
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
      link: "profile-details",
      icon: (className = "") => (
        <RiSettings5Line className={className} size="25px" />
      ),
      text: "Profile",
      userType: ["ADMIN", "RESTAURANT_ADMIN", "COURIER", "SERVICE"],
    },
  ];

  const { mutate: updateCourierStatus, isPending: statusPending } = useMutation(
    {
      mutationFn, // mutation function goes here
      onSuccess: () => {
        showSuccessToast(`Status updated successfully`);
        refetch();
        setOpen(false);
      },
      onError: (error) => {
        showErrorToast(error.message || "An error occurred");
      },
    }
  );

  const handleLogout = () => {
    return mutate();
  };

  const handleUpdateStatus = () => {
    updateCourierStatus({
      availability: courier?.status == "OFFLINE" ? true : false,
    });
  };

  const renderContent = () => {
    if (activeUserLoading || isCourierLoading) {
      return <Loader />;
    }

    // if()
    return (
      <div className="p-2">
        <Outlet context={[activeUserLoading, activeUser]} />
      </div>
    );
  };

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
                <div className="flex w-full justify-end items-center gap-2">
                  {activeUser?.currentUserRole == "COURIER" && (
                    <div
                      className={`flex rounded-full ${
                        courier?.status == "OFFLINE"
                          ? "border border-red-200 bg-red-100"
                          : "border border-green-200 bg-green-100"
                      }  px-3 py-1  items-center gap-[2px]`}
                      onClick={() => setOpen(!open)}
                    >
                      <div
                        className={`flex rounded-full h-3 w-3 ${
                          courier?.status == "OFFLINE"
                            ? "bg-red-200"
                            : "bg-green-200"
                        }  items-center justify-center`}
                      >
                        <div
                          className={`flex rounded-full h-[3.8px] w-[4.2px] ${
                            courier?.status == "OFFLINE"
                              ? "bg-red-600"
                              : "bg-green-600"
                          }`}
                        ></div>
                      </div>
                      <p
                        className={` ${
                          courier?.status == "OFFLINE"
                            ? "text-red-500"
                            : "text-green-500"
                        } font-extrabold text-xs`}
                      >
                        {courier?.status == "OFFLINE" ? "OFF" : "ON"}
                      </p>
                    </div>
                  )}

                  {open && (
                    <div
                      className={`px-6 py-2 bg-white absolute right-44 top-14 ${
                        courier?.status == "OFFLINE"
                          ? "border border-green-300"
                          : "border border-red-300"
                      } rounded-md text-md`}
                      ref={dropdownRef}
                      disabled={statusPending}
                      onClick={handleUpdateStatus}
                    >
                      <p
                        className={`font-bold text-sm ${
                          courier?.status == "OFFLINE"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {courier?.status == "OFFLINE"
                          ? "GO ONLINE"
                          : "GO OFFLINE"}
                      </p>
                    </div>
                  )}
                  {!activeUserLoading && (
                    <div className="rounded-full border py-2 px-5 bg-slate-100">
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
