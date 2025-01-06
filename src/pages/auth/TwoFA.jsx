import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router";
import Button from "../../components/reusableComponents/Button";
import { useMutation } from "@tanstack/react-query";
import Spinner from "../../components/loaders/Spinner";
import {
  useGetActiveUser,
  useGetActiveUserDetails,
  useVerify2FACode,
} from "../../components/brokers/apicalls";
import { showErrorToast, showSuccessToast } from "../../toast/Toast";
import cookie from "../../utils/cookie";
import { useNavigateTo } from "../../hooks/useNavigateTo";
import useAuth from "../../hooks/useAuth";
import { setLoginTimestamp } from "../../utils/config";

let CurrentOTPIndex = 0;
const OTPField = () => {
  const { search } = useLocation();
  const { mutationFn } = useVerify2FACode();
  const { navigateTo } = useNavigateTo();
  const { auth, setAuth } = useAuth();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [activeUser, setActiveUser] = useState(null);
  const [activeOTP, setActiveOTP] = useState(0);
  const inputRef = useRef(null);

  const {
    refetch: refetchUser,
    isLoading: activeUserLoading,
    // isError: isActiveUserError,
    // error: activeUserError,
  } = useGetActiveUser();

  const {
    refetch: refetchDetails,
    isLoading: activeUserDetailsLoading,
    // isError: isActiveUserDetailsError,
    // error: activeUserDetailsError,
  } = useGetActiveUserDetails(activeUser);

  const queryParams = new URLSearchParams(search);
  const username = queryParams.get("username"); // Get the value of "username"

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTP]);

  const handleChange = ({ target }) => {
    const { value } = target;
    const newOTP = [...otp];
    newOTP[CurrentOTPIndex] = value.substring(value.length - 1);
    if (!value) {
      setActiveOTP(CurrentOTPIndex - 1);
    } else setActiveOTP(CurrentOTPIndex + 1);

    setOtp(newOTP);
  };

  const handleOnKeyDown = ({ key }, index) => {
    CurrentOTPIndex = index;
    if (key == "Backspace") {
      setActiveOTP(CurrentOTPIndex - 1);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["2fa"],
    mutationFn,
    onSuccess: async (response) => {
      const { data } = response;

      if (
        data.message == "2FA verification unsuccessful" ||
        !data.access_token
      ) {
        return showErrorToast("Invalid Code");
      } else if (data.access_token) {
        // Store token in cookies
        cookie.setCipher(data.access_token);
        setLoginTimestamp();
        if (!activeUserLoading && !activeUserDetailsLoading) {
          const { data: user } = await refetchUser();
          setActiveUser(user?.currentUserId);
          showSuccessToast("Logged in Succesfully");
          if (user?.currentUserRole == "USER") {
            const { data: userDetails } = await refetchDetails();
            setAuth({
              ...auth,
              userCredentials: userDetails,
              deliveryAddress: {
                city: userDetails?.address?.city,
                houseNumber: userDetails?.address?.houseNumber,
                street: userDetails?.address?.street,
              },
              useMyAddress: true,
            });
            if (auth?.orders && auth?.restaurant) {
              navigateTo(`/details/checkout/${auth?.restaurant.id}`);
            } else {
              navigateTo("/details");
            }
          } else {
            navigateTo("/dashboard");
          }
        }
      }
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    mutate({
      code: otp.join(""),
      username: username,
    });
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={formSubmitHandler}>
        <div className="mb-8 flex justify-center items-center space-x-2">
          {otp.map((_, index) => {
            return (
              <React.Fragment key={index}>
                <input
                  ref={index == activeOTP ? inputRef : null}
                  type="number"
                  className="w-12 h-12 border-2 rounded outline-none text-center font-semibold text-xl border-blue-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition spin-button-none"
                  onChange={handleChange}
                  onKeyDown={(e) => handleOnKeyDown(e, index)}
                  min="0"
                  max="9"
                  required
                  value={otp[index]}
                />
                {index === otp.length - 1 ? null : (
                  <span className="w-2 py-0.5 bg-blue-400" />
                )}
              </React.Fragment>
            );
          })}
        </div>
        <Button
          className="w-full mt-5 p-4 rounded-lg"
          type="submit"
          variant="primary"
          disabled={isPending}
        >
          {isPending ? (
            <Spinner color="white" size="20px" />
          ) : (
            <p className="text-white text-sm">Proceed</p>
          )}
        </Button>
      </form>
    </div>
  );
};

const Form = () => {
  return (
    <div className="mt-[50px] ">
      <OTPField />
    </div>
  );
};

const TwoFA = () => {
  const { phone } = useParams();

  return (
    <div>
      <div className="p-2 flex flex-col">
        <div className="flex flex-col w-full ">
          <div className="flex justify-end ">
            {/* <CountdownTimerAlt
              timeRemaining={timeRemaining}
              setTimeRemaining={setTimeRemaining}
              isLoading={isLoading}
              diff={diff}
            />*/}
          </div>

          <div className="flex flex-col">
            <p className="font-bold text-2xl mb-2 mt-5">
              Two Factor Authentication
            </p>
            <p className="font-light text-sm text-slate-400">
              Enter the four digit code sent to your email
            </p>
            <p className="font-light text-sm text-slate-400 text-center"></p>
          </div>
          <div className="">
            <Form phone={phone} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFA;
