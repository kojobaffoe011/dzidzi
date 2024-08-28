import React, { useCallback, useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { NO_AUTH_URL, convertDate } from "../../utils/config";
import Spinner from "../../components/loaders/Spinner";
import Loader from "../../components/loaders/Loader";
import { showErrorToast, showSuccessToast } from "../../toast/Toast";
import useAuth from "../../hooks/useAuth";
import { useChangeDetails } from "../../components/brokers/apicalls";
import { MdEditNote } from "react-icons/md";
// import EditStudentProfile from "../../components/modal/studentModals/EditDetailsModal";
import { useOutletContext } from "react-router";
import Button from "../../components/Button";
// import RefundBalanceModal from "../../components/modal/studentModals/RefundBalanceModal";
import Breadcrumbs from "../../components/Breadcrumbs";

const StudentDetails = () => {
  const { auth } = useAuth();
  const { changeRestMut, changeUserMut, changeServiceMut } = useChangeDetails();
  const [showPass, setShowPass] = useState(false);
  const [refundModalIsOpen, setRefundModalIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleOpenModal = useCallback(() => setModalIsOpen(true), []);
  const handleCloseModal = useCallback(() => setModalIsOpen(false), []);
  const handleOpenRefundModal = useCallback(
    () => setRefundModalIsOpen(true),
    []
  );
  const handleCloseRefundModal = useCallback(
    () => setRefundModalIsOpen(false),
    []
  );

  const [activeUserLoading] = useOutletContext();

  const handleTogglePass = () => {
    setShowPass(!showPass);
  };

  const ChangePassSchema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%.%^()_#+=*?&-])[A-Za-z\d@$!%.%^()_#+=*?&-]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    old_pass: yup.string().required("Old Password is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ChangePassSchema),
  });

  const { mutate, isLoading: saveLoading } = useMutation(changeRestMut, {
    onSuccess: (data) => {
      showSuccessToast("Save changes successfully");
      reset();
    },
    onError: (data) => {
      showErrorToast(data?.response?.data?.message);
    },
  });

  const handleSaveClick = (data) => {
    try {
      if (Object.keys(errors).length === 0) {
        mutate({
          oldPassword: data.old_pass,
          newPassword: data?.password,
          confirmNewPassword: data?.confirmPassword,
        });
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  return (
    <div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 mt-8 gap-5">
        <div className="col-span-1 flex flex-col">
          <div className="flex flex-col">
            {activeUserLoading ? (
              <div
                style={{
                  width: "100%",
                  height: "40vh",
                }}
                className="flex items-center justify-center"
              >
                <Spinner />
              </div>
            ) : (
              <div
                style={{
                  backgroundSize: "cover",
                  width: "100%",
                  height: "40vh",
                }}
                className="bg-center bg-no-repeat"
                download
              />
            )}
          </div>
          <div className="mt-4 flex flex-col">
            <div className="flex justify-between items-center">
              <p className="font-bold">PERSONAL DETAILS</p>
              <div></div>
            </div>
            <div className="bg-white shadow-sm rounded-lg pt-2 p-3 flex flex-col mt-2">
              <p className="text-sm text-gray-400">Full Name</p>
              <p className="text-md mt-1 font-bold">{auth?.name}</p>
            </div>
            <div className="bg-white shadow-sm rounded-lg pt-2 p-3 flex flex-col mt-2">
              <p className="text-sm text-gray-400">Email Address</p>
              <p className="text-md mt-1 font-bold">
                {auth?.email?.toLowerCase()}
              </p>
            </div>
            <div className="bg-white shadow-sm rounded-lg pt-2 p-3 flex flex-col mt-2">
              <p className="text-sm text-gray-400">Phone Number</p>
              <p className="text-md mt-1 font-bold">{auth?.phone}</p>
            </div>
          </div>
        </div>

        <div className="col-span-1 flex flex-col">
          <div className="flex flex-col justify-between h-full">
            <form onSubmit={handleSubmit(handleSaveClick)}>
              <div className="mt-4">
                <p className="font-bold">UPDATE PASSWORD</p>
                <div className="py-3 p-0 relative">
                  <input
                    {...register("old_pass")}
                    placeholder="Old Password"
                    name="old_pass"
                    type={showPass ? "text" : "password"}
                    className="placeholder:text-sm placeholder:text-gray-400 rounded-lg border border-gray-200 w-full p-4 outline-none text-sm placeholder:text-sm placeholder:text-gray-500"
                  />
                  <div className="cursor-pointer">
                    {showPass ? (
                      <AiOutlineEye
                        className="absolute right-5 top-[30px]"
                        style={{ color: "#6b7280 " }}
                        size="25px"
                        onClick={handleTogglePass}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        className="absolute right-5 top-[30px]"
                        style={{ color: "#6b7280 " }}
                        size="25px"
                        onClick={handleTogglePass}
                      />
                    )}
                  </div>
                </div>
                <div className="py-3 p-0 relative">
                  <input
                    {...register("password")}
                    placeholder="New Password"
                    name="password"
                    type={showPass ? "text" : "password"}
                    className="placeholder:text-sm placeholder:text-gray-400 rounded-lg border border-gray-200 w-full p-4 outline-none text-sm placeholder:text-sm placeholder:text-gray-500"
                  />
                  <div className="cursor-pointer">
                    {showPass ? (
                      <AiOutlineEye
                        className="absolute right-5 top-[30px]"
                        style={{ color: "#6b7280 " }}
                        size="25px"
                        onClick={handleTogglePass}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        className="absolute right-5 top-[30px]"
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
                <div className="py-3 p-0 relative">
                  <input
                    {...register("confirmPassword")}
                    placeholder="Confirm New Password"
                    name="confirmPassword"
                    type={showPass ? "text" : "password"}
                    className="placeholder:text-sm placeholder:text-gray-400 rounded-lg border border-gray-200 w-full p-4 outline-none text-sm placeholder:text-sm placeholder:text-gray-500"
                  />
                  <div className="cursor-pointer">
                    {showPass ? (
                      <AiOutlineEye
                        className="absolute right-5 top-[30px]"
                        style={{ color: "#6b7280 " }}
                        size="25px"
                        onClick={handleTogglePass}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        className="absolute right-5 top-[30px]"
                        style={{ color: "#6b7280 " }}
                        size="25px"
                        onClick={handleTogglePass}
                      />
                    )}
                  </div>
                  {errors.confirmPassword ? (
                    <span className="text-red-600 text-sm mt-3">
                      {errors.confirmPassword.message}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="justify-end flex flex-col items-end mt-5">
                <div className="flex">
                  <button
                    type="submit"
                    className=" px-8 py-3 mr-4 rounded-lg text-white font-bold text-sm bg-[#0d1655]"
                  >
                    {saveLoading ? (
                      <Spinner color="white" size="20px" />
                    ) : (
                      <p className="text-white text-sm">Confirm</p>
                    )}
                  </button>
                  <Link to={-1}>
                    <button className=" px-8 py-3 rounded-lg text-sm bg-slate-100 ">
                      Cancel
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyProfileDetails = () => {
  const breadcrumbs = [
    {
      text: (active, link = "/dashboard") => {
        return (
          <Link to={link}>
            <p className={active ? "text-black" : "text-gray-300"}>Dashboard</p>
          </Link>
        );
      },
    },
    {
      text: (active, link = "/dashboard/profile") => {
        return (
          <Link to={link}>
            <p className={active ? "text-black font-bold" : "text-gray-300"}>
              Profile
            </p>
          </Link>
        );
      },
    },
  ];
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="px-4 pb-4">
        <StudentDetails />
      </div>
    </>
  );
};

export default MyProfileDetails;
