import { useForm } from "react-hook-form";
import SideModal from "../../reusableComponents/SideModal";
import PropTypes from "prop-types";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../../reusableComponents/CustomInput";
import * as yup from "yup";
import Button from "../../reusableComponents/Button";
import { useMutation } from "@tanstack/react-query";
import { useAddCredentials } from "../../brokers/apicalls";
import { showErrorToast, showSuccessToast } from "../../../toast/Toast";
import Spinner from "../../loaders/Spinner";

const AddUserRoleModal = ({
  top,
  right,
  open,
  setOpen,
  refetch,
  userRole,
  title,
  subtext,
}) => {
  const userRoles = ["RESTAURANT_ADMIN", "COURIER", "SERVICE", "ADMIN"];

  const restaurantSchema = yup.object().shape({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    note: yup.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(restaurantSchema),
  });

  const { mutationFn } = useAddCredentials();

  const { mutate, isPending } = useMutation({
    mutationFn, // mutation function goes here
    onSuccess: () => {
      showSuccessToast(`${userRole?.replaceAll("_", "")} added successfully`);
      reset();
      if (refetch && typeof refetch == "function") {
        refetch();
      }

      setOpen(false);
    },
    onError: (error) => {
      showErrorToast(error.message || "An error occurred");
      reset();
    },
  });

  const handleAddCredential = (data) => {
    try {
      if (userRoles.includes(userRole) && Object.keys(errors).length == 0) {
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
    <SideModal
      top={top || "top-[-110px]"}
      bottom={""}
      right={right || "right-[-190px]"}
      left={""}
      title={title || "Add New Restaurant"}
      subtext={subtext || "Fill form to add a new restaurant"}
      open={open}
      setOpen={setOpen}
    >
      <form action="" onSubmit={handleSubmit(handleAddCredential)}>
        <div className="flex flex-col mt-2 relative h-full">
          <div className="flex-col flex border-b mt-3">
            <p className="text-sm text-gray-600 font-bold">Basic Details</p>
            <div className="flex flex-col gap-2">
              <CustomInput
                register={register}
                name={"email"}
                label={"EMAIL"}
                type={"text"}
                required={true}
                placeholder={"Enter email here"}
              />
              <CustomInput
                register={register}
                name={"note"}
                label={"ADD NOTE"}
                type={"textarea"}
                required={false}
                placeholder={"Leave a note here"}
              />
            </div>
          </div>

          <div className="mt-[23rem] flex h-full">
            <Button
              className="mt-5 px-16 py-4 w-full"
              variant="primary"
              rounded
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
      {/* )} */}
    </SideModal>
  );
};
export default AddUserRoleModal;

AddUserRoleModal.propTypes = {
  orderID: PropTypes.string,
  top: PropTypes.string,
  right: PropTypes.string,
  title: PropTypes.string,
  subtext: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  refetch: PropTypes.func,
  userRole: PropTypes.string.isRequired,
};
