import React, { useEffect, useState } from "react";
import { Modal } from "../modal";
import { showErrorToast, showSuccessToast } from "../../../toast/Toast";
import Spinner from "../../loaders/Spinner";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { RiErrorWarningFill } from "react-icons/ri";
import Button from "../../Button";
import { useAddCredentials } from "../../brokers/apicalls";

const AddCredentialModal = (props) => {
  const types = ["RESTAURANT", "COURIER", "SERVICE", "ADMIN"];
  const { userRole } = props;

  const credentialSchema = yup.object().shape({
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
    resolver: yupResolver(credentialSchema),
  });

  const { mutationFn } = useAddCredentials();

  const { mutate, isLoading } = useMutation({
    mutationFn, // mutation function goes here
    onSuccess: (data) => {
      showSuccessToast("User Checked In Successfully");
      reset();
      props?.handleCancel();
    },
    onError: (error) => {
      showErrorToast(error?.response?.data?.message || "An error occurred");
      reset();
      props?.handleCancel();
    },
  });

  // const { mutate, isLoading } = useMutation(mutationFn, {
  //   onSuccess: (data) => {
  //     // if (data.response.status == 200) {
  //     showSuccessToast("User Checked In Successfully");
  //     // } else {
  //     // showErrorToast(data?.response?.data.message);
  //     // }

  //     reset();
  //     props?.handleCancel();
  //   },
  //   onError: (data) => {
  //     showErrorToast(data?.response?.error);
  //     reset();
  //     props?.handleCancel();
  //   },
  // });

  const handleAddCredential = (data) => {
    try {
      if (types.includes(userRole)) {
        mutate({
          email: data.email,
          userRole: userRole,
        });
      } else showErrorToast("Fill all fields");
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  return (
    <div handleCancel={props.handleCancel} isOpen={props.isOpen}>
      <Modal {...props}>
        <div className="p-2 flex flex-col">
          <div className="p-2 flex flex-col pb-4">
            <div className="flex justify-center">
              <p className="font-bold">ADD A USER ROLE</p>
            </div>
            <div className="flex justify-center items-center">
              <RiErrorWarningFill className="text-green-600 mr-1" size="20px" />
              <p className="text-sm text-green-800">
                Are you sure you want to add this user?
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit(handleAddCredential)}>
            <div className="flex flex-col mb-3">
              <input
                className="border outline-none p-2 text-sm h-[100px]"
                placeholder="dzidzi@dzidzi.com"
                name="email"
                {...register("email")}
              />
            </div>
            <div className="flex justify-center">
              <div className="flex items-center mr-2">
                <Button className="px-8 py-2 w-full bg-green-600 rounded">
                  {isLoading ? (
                    <Spinner color="white" size="15px" />
                  ) : (
                    <p className="font-bold text-base text-white">
                      Add Credential
                    </p>
                  )}
                </Button>
              </div>
              <div className="flex items-center">
                <button
                  className="px-8 py-2 w-full bg-gray-100 rounded border"
                  type="button"
                  onClick={props.handleCancel}
                >
                  <p className="font-bold text-base text-gray-500">Exit</p>
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddCredentialModal;