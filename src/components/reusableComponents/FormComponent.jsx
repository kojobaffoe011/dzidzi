import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useAddCredentials } from "../brokers/apicalls";
import { RiErrorWarningFill } from "react-icons/ri";

const FormComponent = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(props.schema),
  });

  return (
    <div>
      <div className="p-2 flex flex-col">
        <div className="p-2 flex flex-col pb-4">
          <div className="flex justify-center">
            <p className="font-bold">{props.title}</p>
          </div>
          <div className="flex justify-center items-center">
            <RiErrorWarningFill className="text-green-600 mr-1" size="20px" />
            <p className="text-sm text-green-800">
              Are you sure you want to perform this action
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit(props?.handleSubmit)}>
          <>{props.children}</>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;
