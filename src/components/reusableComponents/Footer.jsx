import { FiFacebook } from "react-icons/fi";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { PiYoutubeLogoLight } from "react-icons/pi";
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



const Footer = () => {

  const media = [
    {icon: <FiFacebook size="20px" />},
    {icon: <BsTwitterX size="20px" />},
    {icon:<FaInstagram size="20px" />},
    {icon: <PiYoutubeLogoLight size="20px" />},
    {icon: <PiYoutubeLogoLight size="20px" />},
    {icon: <LiaMapSolid size="20px" />}
];
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
                  <p className="font-bold text-sm">{item.icon}</p>
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
