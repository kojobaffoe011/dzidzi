import LoginOutlet from "../LoginOutlet";
import { TbCurrentLocation } from "react-icons/tb";
import { IoLogInOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";

const RestaurantOutlet = () => {
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
  return (
    <LoginOutlet
      altsteps={steps}
      active={"/restaurant"}
      altactive={"restaurant"}
    />
  );
};

export default RestaurantOutlet;
