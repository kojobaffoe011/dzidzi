import { useMutation } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../toast/Toast";
import { timeOutError } from "../../utils/config";
import Spinner from "../loaders/Spinner";
import Button from "./Button";
import CustomInput from "./CustomInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useUpdateAddress } from "../brokers/apicalls";

const EditAddress = () => {
  const { mutationFn } = useUpdateAddress();
  const addressSchema = yup.object().shape({
    street: yup.string().required("Street is required"),
    houseNumber: yup.string().required("House number is required"),
    zip: yup.string().required("Zip is required"),
    city: yup.string().required("City is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addressSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-address"],
    mutationFn,
    onSuccess: () => {
      reset();
      showSuccessToast("Address updated successfully");
    },
    onError: (error) => {
      timeOutError(error);
      showErrorToast(error.response.data?.message || "An error occured");
    },
  });

  const handleUpdateAddress = (data) => {
    if (Object.keys(errors).length == 0) {
      mutate({
        street: data.street,
        houseNumber: data.houseNumber,
        apartmentNr: "",
        zip: data.zip,
        city: data.city,
        floor: 0,
      });
    }
  };

  return (
    <div className="col-span-2 gap-1 flex flex-col">
      <p className="font-bold text-xl">Edit Address</p>
      <form
        action=""
        className="flex flex-col w-full gap-6"
        onSubmit={handleSubmit(handleUpdateAddress)}
      >
        <div className="flex flex-col gap-6 col-span-2 mt-4">
          <div className="grid grid-cols-3 gap-1">
            <div className="w-full flex flex-col gap-1 col-span-2 ">
              <CustomInput
                register={register}
                name={"street"}
                label={"STREET ADDRESS"}
                type={"text"}
                required={true}
                placeholder={"Enter address here"}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <CustomInput
                register={register}
                name={"houseNumber"}
                label={"HOUSE NUMBER"}
                type={"text"}
                required={true}
                placeholder={"Enter apt number here"}
              />
            </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-1">
            <div className="flex flex-col gap-1">
              <CustomInput
                register={register}
                name={"city"}
                label={"CITY"}
                type={"text"}
                required={true}
                placeholder={"Enter city here"}
              />
            </div>

            <div className="flex flex-col gap-1">
              <CustomInput
                register={register}
                name={"zip"}
                label={"ZIP CODE"}
                type={"number"}
                required={true}
                placeholder={"Enter zip code here"}
              />
            </div>
          </div>
        </div>

        <div className=" mb-8 w-full flex">
          <Button className="mt-5 bg-blue-500 px-16 py-4 rounded disabled:bg-gray-200 w-full">
            {isPending ? (
              <Spinner color="white" size="20px" />
            ) : (
              <p className="font-bold text-white">Finish</p>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditAddress;
