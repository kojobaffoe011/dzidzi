import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import Spinner from "../loaders/Spinner";
import Button from "./Button";
import CustomInput from "./CustomInput";
import { showErrorToast, showSuccessToast } from "../../toast/Toast";
import { timeOutError } from "../../utils/config";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useUpdatePassword } from "../brokers/apicalls";
import { useState } from "react";
import * as yup from "yup";
import PropTypes from "prop-types";

const EditPassword = ({ username }) => {
  const { mutationFn } = useUpdatePassword();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const passwordSchema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%.%^()_#+=*?&-])[A-Za-z\d@$!%.%^()_#+=*?&-]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
      ),
    repeatpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
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

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-password"],
    mutationFn,
    onSuccess: () => {
      reset();
      showSuccessToast("Password updated");
    },
    onError: (error) => {
      if (error.message.includes("timeout")) {
        return timeOutError(error);
      }
      return showErrorToast(error.message);
    },
  });

  const handleChangePassword = (data) => {
    if (Object.keys(errors).length == 0) {
      mutate({ username: username, password: data.password });
    }
  };

  return (
    <div className="flex flex-col gap-1 ">
      <p className="font-bold text-xl">Edit Password</p>
      <form
        action=""
        className="flex flex-col w-full gap-6"
        onSubmit={handleSubmit(handleChangePassword)}
      >
        <div className="flex flex-col gap-6 col-span-2">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1 relative">
              <CustomInput
                register={register}
                name={"password"}
                label={"PASSWORD"}
                type={"password"}
                required={true}
                placeholder={"Enter password"}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <CustomInput
              register={register}
              name={"repeatpassword"}
              label={"REPEAT PASSWORD"}
              type={"password"}
              required={true}
              placeholder={"Repeat password"}
            />
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
                          item?.isSatisfied ? "text-green-600" : "text-red-600"
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

          <div className=" mb-8 w-full flex">
            {" "}
            <Button
              className="mt-5 bg-blue-500 px-16 py-4 rounded disabled:bg-gray-200 w-full"
              variant="primary"
              disabled={isPending}
            >
              {isPending ? (
                <Spinner color="white" size="20px" />
              ) : (
                <p className="font-bold text-white">Finish</p>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPassword;

EditPassword.propTypes = {
  username: PropTypes.string,
};
