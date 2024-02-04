import React from "react";
import { FiFacebook } from "react-icons/fi";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { PiYoutubeLogoLight } from "react-icons/pi";
import { LuGithub } from "react-icons/lu";
import { LiaMapSolid } from "react-icons/lia";
import { HiOutlineMail } from "react-icons/hi";

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

const Footer = () => {
  return (
    <div className="p-24 flex flex-col">
      <div className="flex justify-around gap-12 items-center p-4 px-16">
        {links.map((item, idx) => {
          return (
            <div key={idx}>
              <p className="font-bold text-sm cursor-pointer">{item.title}</p>
            </div>
          );
        })}
      </div>

      <div className="border border-gray-300 my-8" />

      <div className="flex  flex-col gap-3">
        <div className="flex justify-between items-center">
          <p className="text-gray-900 font-logo font-extrabold text-3xl">
            dzidzi
          </p>
          <div className="flex justify-end gap-3 items-center">
            {media.map((item, idx) => {
              return (
                <div key={idx}>
                  <p className="font-bold text-sm">{item}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-gray-500 text-xs">
              © COPYRIGHT 2023 | ALL RIGHTS RESERVED
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <HiOutlineMail size="20px" />
            <p className="font-bold text-gray-500 text-xs">
              DZIDZIFOODDELIVERY@DZIDZI.COM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
