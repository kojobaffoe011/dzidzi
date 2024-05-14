import React from "react";
import { FiFacebook } from "react-icons/fi";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { PiYoutubeLogoLight } from "react-icons/pi";
import { LuGithub } from "react-icons/lu";
import { LiaMapSolid } from "react-icons/lia";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { GiHamburger } from "react-icons/gi";
import { useLogout } from "../brokers/apicalls";
import cookie from "../../utils/cookie";
import { showErrorToast, showSuccessToast } from "../../toast/Toast";
import { useMutation } from "react-query";
import Spinner from "../loaders/Spinner";

const links = [
  {
    title: "FOR RESTAURANTS",
    link: "LINKS",
  },
  {
    title: "HOME",
    link: "LINKS",
  },
  {
    title: "CATEGORIES",
    link: "LINKS",
  },
  {
    title: "ABOUT",
    link: "LINKS",
  },
  {
    title: "BLOGS",
    link: "LINKS",
  },
  {
    title: "CAREERS",
    link: "LINKS",
  },
  {
    title: "SUPPORT",
    link: "LINKS",
  },
];

const media = [
  <FiFacebook size="20px" />,
  <BsTwitterX size="20px" />,
  <FaInstagram size="20px" />,
  <PiYoutubeLogoLight size="20px" />,
  <LuGithub size="20px" />,
  <LiaMapSolid size="20px" />,
];

const Header = () => {
  const { pathname } = useLocation();
  const { mutationFn } = useLogout();

  const { mutate, isLoading: cardLoading } = useMutation(mutationFn, {
    onSuccess: (data) => {
      setAuth({});

      showSuccessToast("Logged in Successfully");
      console.log({ success: data });
      navigateTo("/");
    },
    onError: (data) => {
      showErrorToast(data.response.data?.message || "An error occured");
      console.log({ error: data });
    },
  });

  const handleLogout = () => {
    cookie.clearCipher();
    localStorage.removeItem("dzidzi");
    localStorage.removeItem("loginTime");
    return mutate();
  };

  return (
    <div className=" px-24">
      <div className="flex justify-between items-center">
        <Link to={pathname == "/details" ? "" : -1}>
          <div className="flex items-center gap-4">
            <GiHamburger className="cursor-pointer" size="25px" />
            <p className="font-logo font-extrabold text-3xl">dzidzi</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {" "}
          <Link to="/">
            <button
              className="rounded-full bg-white px-6 py-2 border border-gray-900"
              onClick={handleLogout}
            >
              <div className="flex items-center justify-center">
                {cardLoading ? (
                  <Spinner />
                ) : (
                  <p className="font-bold font-gray-500 ">Logout</p>
                )}
              </div>
            </button>
          </Link>
        </div>
      </div>
      <div className="border border-gray-300 my-8" />
    </div>
  );
};

export default Header;
