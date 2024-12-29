import { useForm } from "react-hook-form";
import SideModal from "../../reusableComponents/SideModal";
import PropTypes from "prop-types";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../../reusableComponents/CustomInput";
import * as yup from "yup";
import Button from "../../reusableComponents/Button";
import { useMutation } from "@tanstack/react-query";
import { useAddRestaurantBranch } from "../../brokers/apicalls";
import { showErrorToast, showSuccessToast } from "../../../toast/Toast";
import { timeOutError } from "../../../utils/config";
import Spinner from "../../loaders/Spinner";

const AddBranchModal = ({ top, right, open, setOpen, refetch }) => {
  const userSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    contact: yup.string().required("Contact is required"),
    street: yup.string().required("Street is required"),
    houseNumber: yup.string().required("House number is required"),
    zip: yup.string().required("Zip is required"),
    city: yup.string().required("City is required"),
    username: yup.string().required("Username is required"),
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
    // agreeBox: yup.boolean().oneOf([true], "Please tick checkbox"),
  });

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const { mutationFn } = useAddRestaurantBranch();

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-branch"],
    mutationFn,
    onSuccess: () => {
      showSuccessToast("Restaurant Branch Added successfully");
      setOpen(false);
      if (refetch && typeof refetch == "function") {
        return refetch();
      }
    },
    onError: (error) => {
      if (error.message.includes("timeout")) {
        return timeOutError(error);
      }
      return showErrorToast(error.message);
    },
  });

  const handleAddBranch = (data) => {
    if (Object.keys(errors).length == 0) {
      mutate({
        email: data.email,
        username: data.username,
        password: data.password,
        branchName: data.name,
        contact: data.contact,
        contact1: "",
        bio: "",
        address: {
          street: data.street,
          houseNumber: data.houseNumber,
          apartmentNr: "",
          zip: data.zip,
          city: data.city,
          floor: 0,
        },
      });
    }
  };

  return (
    <SideModal
      top={top || "top-[-110px]"}
      bottom={""}
      right={right || "right-[-190px]"}
      left={""}
      title={"Add Restaurant Branch"}
      subtext={"Fill form to add a new branch"}
      open={open}
      setOpen={setOpen}
    >
      {/* {isLoading || orderItemsLoading ? (
        <div className="flex flex-col h-full items-center justify-center gap-2">
          <Spinner color="blue" />
          <p className="text-xs">We need a sec to load your order details</p>
        </div>
      ) : ( */}
      <form action="" onSubmit={handleSubmit(handleAddBranch)}>
        <div className="flex flex-col mt-2 relative h-full">
          <div className="flex-col flex border-b mt-3">
            <p className="text-sm text-gray-600 font-bold">Basic Details</p>
            <div className="flex flex-col gap-2">
              <CustomInput
                register={register}
                name={"name"}
                label={"BRANCH NAME"}
                type={"text"}
                required={true}
                placeholder={"Enter branch name here"}
              />
              <div className="grid grid-cols-2 gap-2">
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
                  name={"contact"}
                  label={"CONTACT"}
                  type={"number"}
                  required={true}
                  placeholder={"Enter contact here"}
                />
              </div>
            </div>
          </div>
          <div className="flex-col flex border-b mt-4">
            <p className="text-sm text-gray-600 font-bold">Address</p>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <CustomInput
                  register={register}
                  name={"street"}
                  label={"STREET ADDRESS"}
                  type={"text"}
                  required={true}
                  placeholder={"Enter street here"}
                />
              </div>

              <CustomInput
                register={register}
                name={"houseNumber"}
                label={"H/No"}
                type={"text"}
                required={true}
                placeholder={"Enter house number"}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {/* <div className="col-span-2"> */}
              <CustomInput
                register={register}
                name={"city"}
                label={"CITY"}
                type={"text"}
                required={true}
                placeholder={"Enter city here"}
              />
              {/* </div> */}

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
          <div className="flex-col flex border-b mt-4">
            <p className="text-sm text-gray-600 font-bold">Login Info</p>
            <div className="flex flex-col gap-2">
              <CustomInput
                register={register}
                name={"username"}
                label={"CHOOSE USERNAME"}
                type={"text"}
                required={true}
                placeholder={"Enter username here"}
              />
              <div className="grid grid-cols-2 gap-2">
                <CustomInput
                  register={register}
                  name={"password"}
                  label={"PASSWORD"}
                  type={"password"}
                  required={true}
                  placeholder={"Enter password"}
                />
                <CustomInput
                  register={register}
                  name={"repeatpassword"}
                  label={"REPEAT PASSWORD"}
                  type={"password"}
                  required={true}
                  placeholder={"Repeat password"}
                />
              </div>
            </div>
          </div>
          <div className="mt-60 flex h-full">
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
export default AddBranchModal;

AddBranchModal.propTypes = {
  orderID: PropTypes.string,
  top: PropTypes.string,
  right: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  refetch: PropTypes.func,
};
