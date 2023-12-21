import React from "react";
import { GiHotMeal, GiMarbleTap } from "react-icons/gi";
import { MdOutlineMyLocation, MdShareLocation } from "react-icons/md";
import { RiUserStarFill } from "react-icons/ri";
import { motion } from "framer-motion";
// import { fadeIn } from "../../variant";

const steps = [
  {
    icon: <GiMarbleTap className="text-red-500" size="40px" />,
    text: "Easy to Use ",
    subtext: "Find restaurants near you",
  },
  {
    icon: <RiUserStarFill className="text-red-500" size="40px" />,
    text: "Choose your order",
    subtext: "Pick your irder from the restaurant",
  },
  {
    icon: <MdOutlineMyLocation className="text-red-500" size="40px" />,
    text: "Best Prices",
    subtext: "We offer the best prices in the market",
  },
  {
    icon: <MdShareLocation className="text-red-500" size="40px" />,
    text: "Arrive Safely",
    subtext: "Our rides are secured with well trained drivers",
  },
];

const HowItWork = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="flex flex-col mb-28 mt-16"
    >
      <div className="flex items-center gap-4 justify-center">
        <p className="font-bold text-6xl">
          How we <span className="text-red-600">serve</span> you
        </p>
        <GiHotMeal className="text-red-600" size="80px" />
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 ss:grid-cols-1 xs:grid-cols-1 xss:grid-cols-1 mt-8">
        {(props?.steps || steps)?.map((item, idx) => {
          return (
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex flex-col items-center m-2"
              key={idx}
            >
              <div className="rounded-full border p-8 flex item-center justify-center bg-blue-50 border-blue-100text-blue-500 mb-4">
                {item.icon}
              </div>
              <p className="text-center font-bold text-2xl mb-4">{item.text}</p>
              <p className="text-center font-light text-md">{item.subtext}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default HowItWork;
