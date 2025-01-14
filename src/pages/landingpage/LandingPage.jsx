import { useState } from "react";
import { GiHamburger } from "react-icons/gi";
import { HiLocationMarker } from "react-icons/hi";
import { LiaPlusSolid } from "react-icons/lia";
import { HiOutlineMinus } from "react-icons/hi";
import { GiHotMeal } from "react-icons/gi";
import { Link } from "react-router-dom";
import HowItWork from "./HowWorks";
import Footer from "../../components/reusableComponents/Footer";

const questions = [
  {
    question: "How long does it take to deliver my food after i order?",
    answer:
      "Delivery time depends on the restaurant you are ordering from. Check the restaurant's delivery time to know the estimated time of delivery",
  },
  {
    question: "How long does it take to deliver my food after i order?",
    answer:
      "Delivery time depends on the restaurant you are ordering from. Check the restaurant's delivery time to know the estimated time of delivery",
  },
  {
    question: "How long does it take to deliver my food after i order?",
    answer:
      "Delivery time depends on the restaurant you are ordering from. Check the restaurant's delivery time to know the estimated time of delivery",
  },
  {
    question: "How long does it take to deliver my food after i order?",
    answer:
      "Delivery time depends on the restaurant you are ordering from. Check the restaurant's delivery time to know the estimated time of delivery",
  },
  {
    question: "How long does it take to deliver my food after i order?",
    answer:
      "Delivery time depends on the restaurant you are ordering from. Check the restaurant's delivery time to know the estimated time of delivery",
  },
];

const Hero = () => {
  return (
    <div>
      <div className="bg-hero-bg min-h-screen bg-cover bg-no-repeat relative">
        <div className="bg-black opacity-[0.8] min-h-screen p-12 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <GiHamburger className="text-white cursor-pointer" size="25px" />
              <p className="text-white font-logo font-extrabold text-3xl">
                dzidzi
              </p>
            </div>
            <div className="flex items-center gap-2">
              {" "}
              <Link to="auth">
                <button className="rounded-full bg-white px-6 py-2 border border-gray-900">
                  <p className="font-bold font-gray-500 ">Login</p>
                </button>
              </Link>
              <Link to="auth/register/">
                {" "}
                <button className="rounded-full bg-gray-900 px-4 py-2 border border-white">
                  <p className="font-bold text-white">Signup</p>
                </button>
              </Link>
            </div>
          </div>

          <div className="h-[85vh] flex items-center">
            <div className="flex flex-col w-full mb-16">
              <div className="mb-12">
                <p className="font-extrabold text-6xl text-white">
                  {" "}
                  Order delivery near you
                </p>
              </div>

              <div className="grid grid-cols-2 mb-4">
                <div className="grid grid grid-cols-12 gap-2">
                  <div className="col-span-9 border relative">
                    <div className="absolute left-3 top-2">
                      <HiLocationMarker className="text-gray-800" size="25px" />
                    </div>
                    <input
                      type="text"
                      className="pl-12 p-3 bg-white outline-none w-full opacity-1 placehoder:text-gray-900"
                      placeholder="Enter your delivery address"
                    />
                  </div>
                  <div className="col-span-3">
                    <Link to={"/details"}>
                      <button className="bg-gray-900 px-4 py-2 w-full border border-white h-full">
                        <p className="font-bold text-white">Find Food</p>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-white text-sm">
                  Or{" "}
                  <Link to="auth">
                    <span className="underline decoration-white cursor-pointer">
                      Sign In
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HowWeServeYou = () => {
  return (
    <div className="p-48 flex flex-col bg-[#F0FFFF] items-center justify-center gap-8 relative">
      <div className="flex items-center gap-4 justify-center">
        <p className="font-bold text-6xl">
          How we <span className="text-red-600">serve</span> you
        </p>
        <GiHotMeal className="text-red-600" size="80px" />
      </div>
    </div>
  );
};

const RecruitRestaurants = () => {
  return (
    <div className="p-48 flex flex-col bg-[#f5ddc4] items-center justify-center gap-8">
      <div className="flex flex-col gap-4 text-center">
        <p className="font-bold text-6xl">Are you a restaurant?</p>
        <p className="font-bold text-6xl">Need help with deliveries?</p>
      </div>
      <div className="flex flex-col gap-4 text-center">
        <p className="text-xl font-light leading-8">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
          <br /> Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
          <br />
          when an unknown printer took a galley of type and scrambled it to make
          a type specimen book. <br />
          It has survived not only five centuries, but also the leap into
          electronic typesetting, <br /> remaining essentially unchanged. It was
          popularised in the 1960s with the release of <br /> Letraset sheets
          containing Lorem Ipsum passages, <br /> and more recently with desktop
          publishing software like Aldus <br /> PageMaker including versions of
          Lorem Ipsum.
        </p>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <button className="rounded-full bg-white px-12 py-4 border border-gray-900">
            <p className="font-bold font-gray-500 ">Join Now</p>
          </button>
          <button className="rounded-full bg-gray-900 px-12 py-4 border border-white">
            <p className="font-bold text-white">Learn More</p>
          </button>
        </div>
      </div>
      <p className="text-xl">
        Are you a delivery rider?{" "}
        <span className="underline underline-offset-4 cursor-pointer">
          Join Dzidzi Riders
        </span>{" "}
      </p>
    </div>
  );
};

const FrequentlyAskedQuestions = () => {
  const [openQuestion, setOpenedQuestion] = useState(0);

  const handleQuestionClick = (id) => {
    if (openQuestion === id) {
      setOpenedQuestion(null);
    } else setOpenedQuestion(id);
  };

  return (
    <div className="p-48 flex flex-col bg-white items-center justify-center gap-8 mb-80">
      <div className="flex flex-col gap-4 text-center">
        <p className="font-bold text-6xl">Frequently Asked Questions</p>
      </div>
      <div className="flex flex-col gap-4 text-center">
        <p className="text-xl font-light text-gray-500">
          Have a question for us? We got you covered! <br />
          If your question has not been answered here do not hessitate to send
          us a mail at <span>faq@dzidzi.com</span>
        </p>
      </div>
      <div className="flex w-full p-12 flex-col ">
        {questions.map((item, idx) => {
          return (
            <div
              key={idx}
              className="flex-col flex gap-4 border-b border-black p-12 "
            >
              <div className="flex justify-between items-center w-full w-full ">
                <p className="text-3xl font-extrabold">{item.question}</p>
                {openQuestion === idx ? (
                  <HiOutlineMinus
                    size="25px"
                    className="cursor-pointer"
                    onClick={() => handleQuestionClick(idx)}
                  />
                ) : (
                  <LiaPlusSolid
                    size="25px"
                    className="cursor-pointer"
                    onClick={() => handleQuestionClick(idx)}
                  />
                )}
              </div>
              <div>
                {openQuestion === idx && (
                  <p className="text-xl text-gray-400">{item.answer}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const LandingPage = () => {
  return (
    <div className="flex flex-col relative">
      <Hero />
      <HowItWork />
      <RecruitRestaurants />
      <FrequentlyAskedQuestions />
      <div className="absolute left-0 right-0 bottom-0">
        <Footer />
        </div>
      
    </div>
  );
};

export default LandingPage;
