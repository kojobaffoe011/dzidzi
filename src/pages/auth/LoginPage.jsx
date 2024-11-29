import { useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Spinner from "../../components/loaders/Spinner";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useGetActiveUser, useGetActiveUserDetails, useLogin } from "../../components/brokers/apicalls";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { showErrorToast, showSuccessToast } from "../../toast/Toast";
import cookie from "../../utils/cookie";
import { timeOutError } from "../../utils/config";

const Form = () => {
  const [showPass, setShowPass] = useState(false);
  const { setAuth, auth } = useAuth();
  const [activeUser, setActiveUer] = useState(null)
  const { mutationFn } = useLogin();

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


  const handleTogglePass = () => {
    setShowPass(!showPass);
  };

  const AltSchema = yup.object().shape({
    password: yup.string().required("Password is required"),
    username: yup.string().required("Username is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AltSchema),
  });

  const navigate = useNavigate();
  const navigateTo = (url) => {
    navigate(url);
  };

  const { mutateAsync: login, isPending: cardLoading } = useMutation({
    mutationKey:["login"],
    mutationFn,
    onError: (error) => {
      timeOutError(error)
      showErrorToast(error.response.data?.message || "An error occured");
    },
  });

  const setLoginTimestamp = () => {
    const loginTime = new Date().getTime(); // Current timestamp in milliseconds
    localStorage.setItem("loginTime", loginTime.toString());
  };

  const formSubmitHandler = async (data) => {
    if (Object.keys(errors).length === 0) {
      try {
       const loggedInUser =  await login({
        username: data.username,
        password: data.password,
      });

        // Store token in cookies
        cookie.setCipher(loggedInUser?.data?.access_token);
        setLoginTimestamp()

      if(!activeUserLoading && !activeUserDetailsLoading){
        const { data: user } = await refetchUser();
        setActiveUer(user?.currentUserId)        

        showSuccessToast("Logged in Succesfully")

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
          useMyAddress: true
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
      } catch (error) {

        console.log({error})
      }
     
    }
  };


  return (
    <div className="mt-[10px] lg:w-[50%] md:w-[50%] sm:w-full xs:w-full ss:w-full xs:w-full mx-auto">
      <div className="flex flex-col">
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <div className="relative">
            <label>
              <p className="mb-2 text-gray-600 text-sm">USERNAME</p>
            </label>
            <input
              {...register("username")}
              name="username"
              className="rounded-lg border border-gray-600  w-full p-4 outline-none text-sm placeholder:text-sm placeholder:text-gray-500"
            />
            {errors.username ? (
              <span className="text-red-600 text-sm mt-3">
                {errors.username.message}
              </span>
            ) : (
              ""
            )}
          </div>

          <div className="relative mt-5">
            <label>
              <p className="mb-2 text-gray-600 text-sm">PASSWORD</p>
            </label>
            <input
              {...register("password")}
              name="password"
              type={showPass ? "text" : "password"}
              className="rounded-lg border border-gray-600  w-full p-4 outline-none text-sm placeholder:text-sm placeholder:text-gray-500"
            />
            <div className="cursor-pointer">
              {showPass ? (
                <AiOutlineEye
                  className="absolute right-5 top-[43px]"
                  style={{ color: "#6b7280 " }}
                  size="25px"
                  onClick={handleTogglePass}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-5 top-[43px]"
                  style={{ color: "#6b7280 " }}
                  size="25px"
                  onClick={handleTogglePass}
                />
              )}
            </div>
            {errors.password ? (
              <span className="text-red-600 text-sm mt-3">
                {errors.password.message}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="flex justify-end my-3">
            <Link to="forgot">
              <p className="text-sm text-blue-500 underline">Forgot Password?</p>
            </Link>
          </div>
          <button className="w-full mt-5 bg-blue-500 p-4 rounded-lg">
            {cardLoading || activeUserDetailsLoading ? (
              <Spinner color="white" size="20px" />
            ) : (
              <p className="text-white text-sm">Login</p>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

const LoginPage = () => {

  return (
    <div className="w-full">
      <div className="flex-col mb-2">
        <p className="font-bold text-2xl text-center">Welcome Back!</p>
      </div>
      <Form />
    </div>
  );
};

export default LoginPage;
