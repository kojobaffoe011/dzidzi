import { Modal } from "../modal";
import { showErrorToast, showSuccessToast } from "../../../toast/Toast";
import Spinner from "../../loaders/Spinner";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { RiErrorWarningFill } from "react-icons/ri";
// import Button from "../../Button";
import { useAddCoupon } from "../../brokers/apicalls";
import PropTypes from "prop-types";
import Button from "../../reusableComponents/Button";

const AddCoupon = (props) => {
  const { userRole, handleCancel, refetch } = props;
  const types = ["RESTAURANT_ADMIN", "COURIER", "SERVICE", "ADMIN"];
  const credentialSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    percentage: yup.number().required("Percentage is required"),
    description: yup.string().required("Description is required"),
    startDate: yup.date().required("Start Date is required"),
    endDate: yup.date().required("End Date is required"),
  });

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(credentialSchema),
  });

  const { mutationFn } = useAddCoupon();

  const { mutate, isLoading } = useMutation({
    mutationFn, // mutation function goes here
    onSuccess: () => {
      showSuccessToast("Coupon Added Successfully");
      reset();
      handleCancel();
      if (refetch && typeof refetch == "function") {
        return refetch();
      }
    },
    onError: (error) => {
      showErrorToast(error?.response?.data?.message || "An error occurred");
      reset();
      handleCancel();
    },
  });

  const handleAddCoupon = (data) => {
    try {
      if (types.includes(userRole)) {
        mutate({
          couponName: data.name,
          percentage: data.percentage,
          description: data.description,
          startDate: data.startDate,
          endDate: data.endDate,
        });
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  return (
    <Modal {...props}>
      <div className="p-2 flex flex-col">
        <div className="p-2 flex flex-col pb-4">
          <div className="flex justify-center">
            <p className="font-bold">ADD COUPON</p>
          </div>
          <div className="flex justify-center items-center">
            <RiErrorWarningFill className="text-green-600 mr-1" size="20px" />
            <p className="text-sm text-green-800">
              Are you sure you want to perform this action
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit(handleAddCoupon)}>
          <div className="flex flex-col mb-3 gap-1">
            <input
              className="border outline-none p-2 text-sm border border-black"
              placeholder="name"
              name="name"
              {...register("name")}
              required
            />
            <input
              className="border outline-none p-2 text-sm border border-black"
              placeholder="percentage"
              name="percentage"
              type="number"
              max={100}
              min={0}
              {...register("percentage")}
              required
            />
            <textarea
              className="border outline-none p-2 text-sm border border-black"
              placeholder="description"
              name="description"
              {...register("description")}
              required
            />
            <input
              className="border outline-none p-2 text-sm border border-black"
              placeholder="startDate"
              name="startDate"
              {...register("startDate")}
              required
              type="datetime-local"
            />
            <input
              className="border outline-none p-2 text-sm border border-black"
              placeholder="endDate"
              name="endDate"
              {...register("endDate")}
              required
              type="datetime-local"
            />
          </div>

          <div className="flex justify-center">
            <div className="flex items-center mr-2">
              <Button className="px-8 py-2 w-full bg-green-600 rounded">
                {isLoading ? (
                  <Spinner color="white" size="15px" />
                ) : (
                  <p className="font-bold text-base text-white">Add Coupon</p>
                )}
              </Button>
            </div>
            <div className="flex items-center">
              <button
                className="px-8 py-2 w-full bg-gray-100 rounded border"
                type="button"
                onClick={handleCancel}
              >
                <p className="font-bold text-base text-gray-500">Exit</p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddCoupon;

AddCoupon.propTypes = {
  handleCancel: PropTypes.func,
  userRole: PropTypes.string,
  refetch: PropTypes.func,
};
