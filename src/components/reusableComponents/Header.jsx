import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { GiHamburger } from "react-icons/gi";
import cookie from "../../utils/cookie";
import Cart from "./Cart";
import useAuth from "../../hooks/useAuth";
// import Button from "../Button";
import { useState } from "react";
import { useLogoutUser } from "../../hooks/useLogoutUser";
import { HiUser } from "react-icons/hi";
import UserSelectedOrders from "../modal/restaurant/UserSelectedOrders";

const Profile = () => {
  return (
    <div className="rounded-full px-2 py-2 border bg-gray-100 uppercase font-extrabold text-xl">
      <Link to="/details/user-profile">
        <HiUser className="text-slate-400 cursor-pointer" size={"25px"} />
      </Link>
    </div>
  );
};

const Header = () => {
  const [open, setOpen] = useState();
  const { auth } = useAuth();
  const { pathname } = useLocation();
  const { mutate, isPending } = useLogoutUser();
  const loggedIn = cookie.getCipher();

  const onClick = () => {
    return setOpen(true);
  };

  const handleLogout = () => {
    return mutate();
  };

  return (
    <div className={`px-24 ${open ? "mt-4" : "mt-4"} relative`}>
      <UserSelectedOrders open={open} setOpen={setOpen} />
      <div className="flex justify-between items-center">
        <Link to={pathname == "/details" ? "" : "/details"}>
          <div className="flex items-center gap-4">
            <GiHamburger className="cursor-pointer" size="25px" />
            <p className="font-logo font-extrabold text-3xl">dzidzi</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {" "}
          <button onClick={onClick} className="transparent">
            <Cart numberOfOrders={auth?.orders ? auth.orders.length : 0} />
          </button>
          {loggedIn && (
            <div className="flex gap-2">
              <Profile />
              <button
                className="rounded-full bg-white px-6 py-2 border border-gray-900"
                onClick={handleLogout}
                disabled={isPending}
              >
                <div className="flex items-center justify-center">
                  {/* {isPending ? (
                    <Spinner />
                  ) : ( */}
                  <p className="font-bold font-gray-500 text-xs ">Logout</p>
                  {/* )} */}
                </div>
              </button>
            </div>
          )}
          {!loggedIn && (
            <div className="flex gap-2">
              <Link to="/auth/register">
                <button className="rounded-full bg-white px-6 py-2 border border-gray-900">
                  <div className="flex items-center justify-center">
                    <p className="font-bold font-gray-500 text-xs ">Register</p>
                  </div>
                </button>
              </Link>
              <Link to="/auth">
                <button className="rounded-full bg-black px-6 py-2 border border-gray-900">
                  <div className="flex items-center justify-center">
                    <p className="font-bold text-white text-xs ">Login</p>
                  </div>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="border border-gray-300 my-2" />
    </div>
  );
};

export default Header;
