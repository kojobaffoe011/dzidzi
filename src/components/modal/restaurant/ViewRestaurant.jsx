import React, { useEffect, useState } from "react";
import { Modal } from "../modal";
import { showErrorToast, showSuccessToast } from "../../../toast/Toast";
import Spinner from "../../loaders/Spinner";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation } from "react-query";
import { RiErrorWarningFill } from "react-icons/ri";
import Button from "../../Button";
import {
  useAddCredentials,
  useGetSingleRestaurant,
} from "../../brokers/apicalls";
import RestaurantDescription from "../../reusableComponents/RestaurantDescription";
import Loader from "../../loaders/Loader";

const ViewRestaurant = (props) => {
  const types = ["RESTAURANT", "COURIER", "SERVICE", "ADMIN"];
  const { userRole, restaurantID, restaurantData, restaurantLoading } = props;

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

  const { mutate, isLoading } = useMutation(mutationFn, {
    onSuccess: (data) => {
      // if (data.response.status == 200) {
      showSuccessToast("User Checked In Successfully");
      // } else {
      // showErrorToast(data?.response?.data.message);
      // }

      reset();
      props?.handleCancel();
    },
    onError: (data) => {
      showErrorToast(data?.response?.error);
      reset();
      props?.handleCancel();
    },
  });

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

  if (restaurantLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div handleCancel={props.handleCancel} isOpen={props.isOpen}>
      <Modal {...props}>
        <div className="p-2 flex flex-col">
          <RestaurantDescription
            name={restaurantData?.name}
            rating={restaurantData?.averageRating}
            type="modal"
          />

          {/* <form onSubmit={handleSubmit(handleAddCredential)}>
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
          </form> */}
        </div>
      </Modal>
    </div>
  );
};

export default ViewRestaurant;
