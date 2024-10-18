import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { otherrespaltalt, resp } from "../../../utils/config";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import Spinner from "../../../components/loaders/Spinner";
import { showErrorToast, showSuccessToast } from "../../../toast/Toast";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { useRegisterUser } from "../../../components/brokers/apicalls";

const OrganizationForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneErrors, setPhoneErrors] = useState({
    phone: [],
  });

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleTogglePass = () => {
    setShowPass(!showPass);
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value.trim();
    if (!phone) {
      setPhone("");
      setPhoneErrors({
        ...phoneErrors,
        phone: [" Mobile Number is required", ...phoneErrors.phone],
      });
      return;
    }

    // if (phone.length < 10) {
    //   setPhone(phone);
    //   setPhoneErrors({
    //     ...phoneErrors,
    //     phone: ["Phone number should be 10 digits", ...phoneErrors.phone],
    //   });
    //   return;
    // }
    setPhone(phone);
    setPhoneErrors({
      ...phoneErrors,
      phone: [],
    });
  };

  const { mutationFn } = useRegisterUser();

  const userSchema = yup.object().shape({
    lastname: yup.string().required("Last Name is required"),
    firstname: yup.string().required("Other Names is required"),
    street: yup.string().required("Street is required"),
    houseNumber: yup.string().required("House number is required"),
    zip: yup.string().required("Zip is required"),
    city: yup.string().required("City is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%.%^()_#+=*?&-])[A-Za-z\d@$!%.%^()_#+=*?&-]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
      ),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    agreeBox: yup.boolean().oneOf([true], "Please tick checkbox"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const password = watch("password");

  const passReq = [
    {
      text: "Must be at least 8 characters long",
      isSatisfied: password?.length >= 8,
    },
    {
      text: "Must contain a lowercase character",
      isSatisfied: /[a-z]/.test(password),
    },
    {
      text: "Must contain an uppercase character",
      isSatisfied: /[A-Z]/.test(password),
    },
    {
      text: "Must contain a symbol - @$!%.%^()_#+=*?&-",
      isSatisfied: /[@$!%.%^()_#+=*?&-]/.test(password),
    },
  ];

  const navigate = useNavigate();
  const navigateTo = (url) => {
    navigate(url);
  };

  const { mutate, isPending: cardLoading } = useMutation({
    mutationKey: ["userSignup"],
    mutationFn,
    onSuccess: (deets) => {
      showSuccessToast("Registered Successfully");
      navigateTo("/auth");
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });

  const formSubmitHandler = (data) => {
    if (
      Object.keys(errors).length === 0 &&
      phone != "" &&
      phoneErrors.phone?.length == 0
    ) {
      mutate({
        firstName: data.firstname,
        lastName: data.firstname,
        contact: phone,
        address: {
          street: data.street,
          houseNumber: data.houseNumber,
          apartmentNr: "",
          zip: data.zip,
          city: data.city,
          floor: 0,
        },
        email: data.email,
        password: data.password,
        username: data.username,
        provider: "LOCAL",
      });
    }
  };

  return (
    <div className="mb-32">
      <div
        className={`col-span-2 flex items-center justify-center mb-4 ${otherrespaltalt}`}
      >
        <p className="font-bold text-center mt-8">Fill this form to register</p>
      </div>
      <div className="flex flex-col">
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <div className="grid grid-cols-2 p-4 gap-1">
            <div className="flex col-span-2 items-center">
              <div className="w-[35rem] h-[0.1rem] border mx-1 border-white" />
            </div>

            <div className={`flex flex-col gap-1 ${resp}`}>
              <label className="text-xs text-gray-900">
                LAST NAME
                <span className="text-red-600 text-lg ">*</span>
              </label>
              <input
                {...register("lastname")}
                name="lastname"
                className="rounded border border-gray-600 w-full p-2 outline-none text-sm placeholder:text-sm placeholder:text-gray-400"
                placeholder="Agyemang"
              />
              {errors.lastname ? (
                <span className="text-red-600 text-xs mt-1">
                  {errors.lastname.message}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className={`flex flex-col gap-1 ${resp}`}>
              <label className="text-xs  text-gray-900">
                FIRST NAMES
                <span className="text-red-600 text-lg ">*</span>
              </label>
              <input
                {...register("firstname")}
                name="firstname"
                className="rounded border border-gray-600 w-full p-2 outline-none text-sm placeholder:text-sm placeholder:text-gray-400"
                placeholder="Otojor Kwame"
              />
              {errors.firstname ? (
                <span className="text-red-600 text-xs mt-1">
                  {errors.firstname.message}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="col-span-2 grid grid-cols-3 gap-1">
              <div className={`flex flex-col gap-1 ${resp}`}>
                <label className="text-xs  text-gray-900">
                  EMAIL ADDRESS <span className="text-red-600 text-lg ">*</span>
                </label>
                <input
                  {...register("email")}
                  name="email"
                  className="rounded border border-gray-600 w-full p-2 outline-none text-sm placeholder:text-sm placeholder:text-gray-400"
                  placeholder="buff@gmail.com"
                />
                {errors.email ? (
                  <span className="text-red-600 text-xs mt-1">
                    {errors.email.message}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className={`flex flex-col gap-1 ${resp}`}>
                <label className="text-xs  text-gray-900">
                  USERNAME <span className="text-red-600 text-lg ">*</span>
                </label>
                <input
                  {...register("username")}
                  name="username"
                  className="rounded border border-gray-600 w-full p-2 outline-none text-sm placeholder:text-sm placeholder:text-gray-400"
                  placeholder="buff"
                />
                {errors.username ? (
                  <span className="text-red-600 text-xs mt-1">
                    {errors.username.message}
                  </span>
                ) : (
                  ""
                )}
              </div>

              <div className={`flex flex-col gap-1 ${resp}`}>
                <label className="text-xs text-gray-900">
                  MOBILE NUMBER <span className="text-red-600 text-lg ">*</span>
                </label>
                <input
                  // {...register("studentnumber")}
                  name="phone"
                  className="rounded border border-gray-600 w-full p-2 outline-none text-sm placeholder:text-sm placeholder:text-gray-400"
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onChange={handlePhoneChange}
                  placeholder="02061271231"
                />

                {phoneErrors.phone[0] ? (
                  <span className="text-red-600 text-xs">
                    {phoneErrors.phone[0]}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="flex flex-col mb-3 gap-6 col-span-2">
              <div className="grid grid-cols-3 gap-1">
                <div className="w-full flex flex-col gap-1 col-span-2 ">
                  <p className="text-xs font-light text-gray-500">
                    Street Address
                  </p>
                  <input
                    className="border outline-none p-2 text-sm border border-black w-full rounded placeholder:text-xs"
                    placeholder="Enter address here"
                    name="street"
                    {...register("street")}
                    required
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <p className="text-xs font-light text-gray-500">
                    House Number
                  </p>
                  <input
                    className="border outline-none p-2 text-sm border border-black w-full rounded placeholder:text-xs"
                    placeholder="Enter apt number here"
                    name="houseNumber"
                    {...register("houseNumber")}
                    required
                  />
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-1">
                <div className="flex flex-col">
                  <p className="text-xs font-light text-gray-500">City</p>
                  <input
                    className="border outline-none p-2 text-sm border border-black w-full rounded placeholder:text-xs"
                    placeholder="Enter Apartment Number"
                    name="city"
                    {...register("city")}
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <p className="text-xs font-light text-gray-500">Zip Code</p>
                  <input
                    className="border outline-none p-2 text-sm border border-black w-full rounded placeholder:text-xs"
                    placeholder="Enter Apartment Number"
                    name="zip"
                    {...register("zip")}
                    required
                    type="number"
                  />
                </div>
              </div>
            </div>

            <div className={`flex flex-col relative gap-1 ${resp}`}>
              <label className="text-xs  text-gray-900">
                PASSWORD <span className="text-red-600 text-lg ">*</span>
              </label>
              <input
                {...register("password")}
                name="password"
                type={showPass ? "text" : "password"}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="rounded border border-gray-600 w-full p-2 outline-none text-sm placeholder:text-sm placeholder:text-gray-500"
              />
              <div className="cursor-pointer">
                {showPass ? (
                  <AiOutlineEye
                    className="absolute right-5 top-[48px]"
                    style={{ color: "#6b7280 " }}
                    size="15px"
                    onClick={() => {
                      handleTogglePass();
                      setIsFocused(true);
                    }}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-5 top-[48px]"
                    style={{ color: "#6b7280 " }}
                    size="15px"
                    onClick={() => {
                      handleTogglePass();
                      setIsFocused(true);
                    }}
                  />
                )}
              </div>
              {/* {errors.password ? (
                <span className="text-red-600 text-sm mt-3">
                  {errors.password.message}
                </span>
              ) : (
                ""
              )} */}
              {isFocused && (
                <div className="flex flex-col mt-1">
                  {passReq.map((item, idx) => {
                    return (
                      <div className="flex" key={idx}>
                        {item?.isSatisfied ? (
                          <IoCheckmarkCircle className="text-green-600" />
                        ) : (
                          <IoCloseCircle className="text-red-600" />
                        )}
                        <p
                          className={`text-xs ${
                            item?.isSatisfied
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {item.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className={`flex flex-col relative gap-1 ${resp}`}>
              <label className="text-xs  text-gray-900">
                CONFIFRM PASSWORD{" "}
                <span className="text-red-600 text-lg ">*</span>
              </label>
              <input
                {...register("confirmpassword")}
                name="confirmpassword"
                type={showPass ? "text" : "password"}
                className="rounded border border-gray-600 w-full p-2 outline-none text-sm placeholder:text-sm placeholder:text-gray-500"
              />
              <div className="cursor-pointer">
                {showPass ? (
                  <AiOutlineEye
                    className="absolute right-5 top-[48px]"
                    style={{ color: "#6b7280 " }}
                    size="15px"
                    onClick={handleTogglePass}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-5 top-[48px]"
                    style={{ color: "#6b7280 " }}
                    size="15px"
                    onClick={handleTogglePass}
                  />
                )}
              </div>
              {errors.confirmpassword ? (
                <span className="text-red-600 text-xs mt-1">
                  {errors.confirmpassword.message}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="relative mt-5 flex items-center col-span-2">
              <input
                {...register("agreeBox")}
                name="agreeBox"
                type="checkbox"
                className=""
              />
              <label className="">
                <p className="text-slate-400 text-sm ml-2">
                  I agree to{" "}
                  <span className="underline font-bold text-black">
                    terms and conditions
                  </span>
                </p>
              </label>
            </div>

            <div className="col-span-2 mb-8 justify-end flex">
              {" "}
              <div>
                <button
                  className="mt-5 bg-red-500 px-16 py-3 rounded disabled:bg-gray-200"
                  //   type="button"
                  // disabled={true}
                >
                  {cardLoading ? (
                    <Spinner color="white" size="20px" />
                  ) : (
                    <p className="text-white text-sm">Finish</p>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const RegisterInfo = () => {
  return (
    <div className="">
      <OrganizationForm />
    </div>
  );
};

export default RegisterInfo;
