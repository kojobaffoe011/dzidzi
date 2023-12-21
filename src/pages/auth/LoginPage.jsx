import React, { useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import Spinner from "../../components/loaders/Spinner";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useLogin } from "../../components/brokers/students";
import { useMutation } from "react-query";
import * as yup from "yup";
import { showErrorToast, showSuccessToast } from "../../toast/Toast";
import cookie from "../../utils/cookie";

const Form = () => {
  const [showPass, setShowPass] = useState(false);
  const { setAuth } = useAuth();
  const { mutationFn } = useLogin();

  const handleTogglePass = () => {
    setShowPass(!showPass);
  };

  const LoginSchema = yup.object().shape({
    password: yup.string().required("Password is required"),

    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const navigate = useNavigate();
  const navigateTo = (url) => {
    navigate(url);
  };

  const { mutate, isLoading: cardLoading } = useMutation(mutationFn, {
    onSuccess: (data) => {
      const response = data?.data;
      setAuth({
        token: response.token,
        id: response.id,
        email: response.email,
        student_id: response.student_id,
        user_type: response.user_type,
        name: response.name,
        phone: response.phone,
        gender: response.gender,
        campus: response.campus,
        nationality: response.nationality,
      });
      localStorage.setItem(
        "ghlstud",
        JSON.stringify({
          id: response.id,
          email: response.email,
          student_id: response.student_id,
          name: response.name,
          phone: response.phone,
          gender: response.gender,
          campus: response.campus,
          nationality: response.nationality,
        })
      );
      setLoginTimestamp();
      cookie.setCipher(response?.token);

      showSuccessToast("Logged in Successfully");
      navigateTo("/dashboard");
    },
    onError: (data) => {
      showErrorToast(data?.response?.data?.error);
    },
  });

  const setLoginTimestamp = () => {
    const loginTime = new Date().getTime(); // Current timestamp in milliseconds
    localStorage.setItem("loginTime", loginTime.toString());
  };

  const formSubmitHandler = (data) => {
    if (Object.keys(errors).length === 0) {
      mutate({
        email: data.email,
        password: data.password,
      });
    }
  };

  return (
    <div className="mt-[50px] lg:w-[50%] md:w-[50%] sm:w-full xs:w-full ss:w-full xs:w-full mx-auto">
      <div className="flex flex-col">
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <div className="relative">
            <label>
              <p className="mb-2 text-gray-600 text-sm">EMAIL ADDRESS</p>
            </label>
            <input
              {...register("email")}
              name="email"
              className="rounded-lg border border-gray-600  w-full p-4 outline-none text-sm placeholder:text-sm placeholder:text-gray-500"
            />
            {errors.email ? (
              <span className="text-red-600 text-sm mt-3">
                {errors.email.message}
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
              <p className="text-sm text-red-500 underline">Forgot Password?</p>
            </Link>
          </div>
          <button className="w-full mt-5 bg-red-500 p-4 rounded-lg">
            {cardLoading ? (
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
      <div className="flex-col mb-16">
        <p className="font-bold text-2xl text-center">Welcome Back!</p>
        <p className="font-light text-sm text-center">
          We are happy to see you again!
        </p>
      </div>
      <Form />
    </div>
  );
};

export default LoginPage;
