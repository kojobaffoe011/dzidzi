import { useState } from "react";
import { Modal } from "../modal";
import { showErrorToast } from "../../../toast/Toast";
import useAuth from "../../../hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { RiErrorWarningFill } from "react-icons/ri";
import Button from "../../Button";
import { FaCheckCircle } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import PropTypes from "prop-types";

const EditCheckoutAddress = (props) => {
  const {handleCancel, isOpen, address} = props
  const { auth, setAuth } = useAuth();
  const [useMyAddress, setUseMyAddress] = useState(true);
  const addressOptions = [
    {
      useMyAddress: true,
      text: "Use my address",
    },
    {
      useMyAddress: false,
      text: "Change delivery address",
    },
  ];
  const addressSchema = yup.object().shape({
    street: yup.string().required("Name is required"),
    houseNumber: yup.string().required("Percentage is required"),
    city: yup.string().required("Description is required"),
    zip: yup.string().required("Start Date is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addressSchema),
  });

  const handleUseDifferentAddress = (data) => {
    try {
      if (Object.keys(errors).length === 0) {
        setAuth({
          ...auth,
          useMyAddress: false,
          deliveryAddress: {
            street: data.street,
            houseNumber: data.houseNumber,
            zip: data.zip,
            city: data.city,
            floor: 0,
          },
        });
        handleCancel();
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };
  const handleUseMyAddress = () => {
    try {
      setAuth({
        ...auth,
        useMyAddress: true,
        deliveryAddress: {
          street: address?.street,
          houseNumber:
            address?.houseNumber,
          zip: address?.zip || 47059,
          city: address?.city,
          floor: 0,
        },
      });
      handleCancel();
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  return (
    <div handleCancel={handleCancel} isOpen={isOpen}>
      <Modal {...props}>
        <div className="p-2 flex flex-col">
          <div className="p-2 flex flex-col pb-4">
            <div className="flex justify-center">
              <p className="font-bold">EDIT ADDRESS</p>
            </div>
            <div className="flex justify-center items-center">
              <RiErrorWarningFill className="text-green-600 mr-1" size="20px" />
              <p className="text-sm text-green-800">
                Delivery to a different address?
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {addressOptions.map((item, idx) => {
              return (
                <div
                key={idx}
                  className={`border cursor-pointer ${
                    useMyAddress == item.useMyAddress
                      ? "border-green-500 border-2 font-bold"
                      : "border-gray-300"
                  } rounded p-2 flex justify-between items-center`}
                  onClick={() => setUseMyAddress(item.useMyAddress)}
                >
                  <p className="text-sm ">{item.text}</p>
                  {useMyAddress == item.useMyAddress && (
                    <FaCheckCircle className="text-green-500" size="20px" />
                  )}
                </div>
              );
            })}
          </div>

          {useMyAddress && (
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex gap-4 items-center">
                <GoLocation className="text-gray-600" size="20px" />
                {
                  <div className="flex flex-col">
                    <p className="text-md font-normal">
                      {address
                        ? `${address?.street} ${address?.houseNumber}`
                        : auth?.deliveryAddress?.street}
                    </p>
                    <p className="text-sm font-normal text-gray-600">
                      {address
                        ? ` ${address?.city}`
                        : auth?.deliveryAddress?.city}
                    </p>
                  </div>
                }
              </div>
              <div className="flex justify-center">
                <div className="flex items-center mr-2">
                  <Button
                    className="px-8 py-2 w-full bg-green-600 rounded"
                    onClick={handleUseMyAddress}
                  >
                      <p className="font-bold text-sm text-white">
                        Use my address
                      </p>
                  </Button>
                </div>
                <div className="flex items-center">
                  <button
                    className="px-8 py-2 w-full bg-gray-100 rounded border"
                    type="button"
                    onClick={handleCancel}
                  >
                    <p className="font-bold text-sm text-gray-500">Exit</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {!useMyAddress && (
            <form onSubmit={handleSubmit(handleUseDifferentAddress)} className="mt-6">
              <div className="flex flex-col mb-3 gap-6">
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
                      Apartment Number
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
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="flex items-center mr-2">
                  <Button className="px-8 py-2 w-full bg-green-600 rounded">
                      <p className="font-bold text-sm text-white">
                        Use this address
                      </p>
                  </Button>
                </div>
                <div className="flex items-center">
                  <button
                    className="px-8 py-2 w-full bg-gray-100 rounded border"
                    type="button"
                    onClick={handleCancel}
                  >
                    <p className="font-bold text-sm text-gray-500">Exit</p>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default EditCheckoutAddress;

EditCheckoutAddress.propTypes = {
  handleCancel: PropTypes.func,
  address: PropTypes.object,
  isOpen: PropTypes.bool
}
