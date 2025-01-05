import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Spinner from "../../components/loaders/Spinner";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  useGetActiveUser,
  useGetActiveUserDetails,
  useLogin,
} from "../../components/brokers/apicalls";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { showErrorToast, showSuccessToast } from "../../toast/Toast";
import cookie from "../../utils/cookie";
import { setLoginTimestamp, timeOutError } from "../../utils/config";
import CustomInput from "../../components/reusableComponents/CustomInput";
import Button from "../../components/reusableComponents/Button";

const Form = () => {
  const { setAuth, auth } = useAuth();
  const [activeUser, setActiveUser] = useState(null);
  const { mutationFn } = useLogin();

  const {
    refetch: refetchUser,
    isLoading: activeUserLoading,
    // isError: isActiveUserError,
    // error: activeUserError,
  } = useGetActiveUser();
  console.log(activeUser);

  const {
    refetch: refetchDetails,
    isLoading: activeUserDetailsLoading,
    // isError: isActiveUserDetailsError,
    // error: activeUserDetailsError,
  } = useGetActiveUserDetails(activeUser);

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
    mutationKey: ["login"],
    mutationFn,
    onError: (error) => {
      timeOutError(error);
      showErrorToast(error.response.data?.message || "An error occured");
    },
  });

  const formSubmitHandler = async (data) => {
    if (Object.keys(errors).length === 0) {
      try {
        const loggedInUser = await login({
          username: data.username,
          password: data.password,
        });

        if (!loggedInUser?.data?.access_token) {
          return navigateTo(`/auth/2fa?username=${data.username}`);
        }

        // Store token in cookies
        cookie.setCipher(loggedInUser?.data?.access_token);
        setLoginTimestamp();

        if (!activeUserLoading && !activeUserDetailsLoading) {
          const { data: user } = await refetchUser();
          setActiveUser(user?.currentUserId);

          showSuccessToast("Logged in Succesfully");

          if (user?.currentUserRole == "USER") {
            const { data: userDetails } = await refetchDetails(
              user?.currentUserId
            );
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
              // navigateTo("/details");
            }
          } else {
            navigateTo("/dashboard");
          }
        }
      } catch (error) {
        console.log({ error });
      }
    }
  };

  return (
    <div className="mt-[10px] lg:w-[50%] md:w-[50%] sm:w-full xs:w-full ss:w-full xs:w-full mx-auto">
      <div className="flex flex-col">
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <CustomInput
            register={register}
            name={"username"}
            errors={errors}
            label={"USERNAME"}
            type={"text"}
            required={true}
          />

          <div className="relative mt-5">
            <CustomInput
              register={register}
              name={"password"}
              errors={errors}
              label={"PASSWORD"}
              type={"password"}
              required={true}
            />
          </div>
          <div className="flex justify-end my-3">
            <Link to="forgot">
              <p className="text-sm text-blue-500 underline">
                Forgot Password?
              </p>
            </Link>
          </div>
          <Button
            className="w-full mt-5 p-4"
            disabled={cardLoading || activeUserDetailsLoading}
            variant="primary"
            rounded
          >
            {cardLoading || activeUserDetailsLoading ? (
              <Spinner color="white" size="20px" />
            ) : (
              <p className="text-white text-sm">Login</p>
            )}
          </Button>
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
