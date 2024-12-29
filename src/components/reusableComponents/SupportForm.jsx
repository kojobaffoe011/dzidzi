import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { useAddTicket } from "../brokers/apicalls";
import { showErrorToast, showSuccessToast } from "../../toast/Toast";
import CustomInput from "./CustomInput";
import Button from "./Button";
import Spinner from "../loaders/Spinner";
import PropTypes from "prop-types";

const SupportForm = ({ setOpen, refetch }) => {
  const ticketSchema = yup.object().shape({
    issuetype: yup
      .string()
      .required()
      .oneOf(["general_enquiry", "order_issues", "other"], "Invalid option"),
    subject: yup.string().required("Subject is required"),
    description: yup.string().required("Username is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ticketSchema),
  });

  const { mutationFn } = useAddTicket();

  const { mutate, isPending } = useMutation({
    mutationKey: ["addticket"],
    mutationFn,
    onSuccess: () => {
      showSuccessToast("Order updated successfully");
      reset();
      if (setOpen && typeof setOpen == "function") {
        return setOpen(false);
      }
      if (refetch && typeof refetch == "function") {
        return refetch();
      }
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });

  const handleAddTicket = (data) => {
    const description = data.description.toString();
    console.log(data);
    if (Object.keys(errors).length == 0) {
      return mutate({ description });
    }
  };

  return (
    <div>
      <form
        action=""
        className="flex flex-col w-full gap-6"
        onSubmit={handleSubmit(handleAddTicket)}
      >
        <div className="flex flex-col gap-6 col-span-2">
          <div className="flex flex-col gap-2">
            <div className="w-full flex flex-col gap-1 col-span-2 ">
              <label className="text-xs font-light text-gray-500">
                What is the issue?
                <span className="text-red-600 text-lg ">*</span>
              </label>
              <select
                {...register("issuetype")}
                className="border outline-none p-4 text-sm border border-black w-full rounded placeholder:text-xs"
                placeholder=""
                name="issuetype"
                required
                type=""
              >
                <option value="general_enquiry"> General Enquiries</option>
                <option value="order_issues">
                  {" "}
                  I have issues with my order
                </option>
                <option value="other"> Other</option>
              </select>
            </div>
            <CustomInput
              register={register}
              name={"subject"}
              label={"SUBJECT"}
              type={"text"}
              required={true}
              placeholder={"Enter subject here"}
            />

            <CustomInput
              register={register}
              name={"description"}
              label={"DESCRIPTION"}
              type={"textarea"}
              required={true}
              placeholder={"Enter subject here"}
            />
          </div>

          <div className=" mb-8 w-full flex">
            {" "}
            <Button
              className="mt-5 bg-blue-500 px-16 py-4 rounded disabled:bg-gray-200 w-full"
              disabled={isPending}
            >
              {isPending ? (
                <Spinner color="white" size="20px" />
              ) : (
                <p className="font-bold text-white">Send Message</p>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SupportForm;

SupportForm.propTypes = {
  setOpen: PropTypes.func,
  refetch: PropTypes.func,
};
