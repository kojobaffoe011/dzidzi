import { useForm } from "react-hook-form";
import SideModal from "../../reusableComponents/SideModal";
import PropTypes from "prop-types";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../../reusableComponents/CustomInput";
import * as yup from "yup";
import Button from "../../reusableComponents/Button";
import { useMutation } from "@tanstack/react-query";
import { useAddExtra, useAddMenu } from "../../brokers/apicalls";
import { showErrorToast, showSuccessToast } from "../../../toast/Toast";
import { timeOutError } from "../../../utils/config";
import Spinner from "../../loaders/Spinner";
import { useCategoryList } from "../../../hooks/useCategoryList";
import { useEffect, useState } from "react";

const AddMenuModal = ({ top, right, open, setOpen, refetch, type }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [file, setFile] = useState(null);

  const { categories } = useCategoryList();
  const menuSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string(),
    price: yup.string().required("Price is required"),
  });

  const {
    register,
    handleSubmit,
    // watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(menuSchema),
  });

  useEffect(() => {
    if (open == false) {
      reset();
      setFile(null);
    }
  }, [open]);

  const handleFileSelect = (uploadedfile) => {
    setFile(uploadedfile);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const { mutationFn } = useAddMenu();
  const { mutationFn: extraMutationFn } = useAddExtra();

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-menu"],
    mutationFn: type == "extra" ? extraMutationFn : mutationFn,
    onSuccess: () => {
      showSuccessToast("Restaurant Menu Added successfully");
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

  const handleSelectedCategory = (option) => {
    setSelectedCategory(option.value);
  };

  const handleAddMenu = async (data) => {
    if (Object.keys(errors).length == 0 && selectedCategory) {
      mutate({
        name: data.name,
        description: data.description,
        price: data.price,
        category: selectedCategory,
        image: file ? file : null,
      });
    }
  };
  const handleAddExtra = async (data) => {
    if (Object.keys(errors).length == 0) {
      mutate({
        name: data.name,
        price: data.price,
        image: file ? file : null,
      });
    }
  };

  return (
    <SideModal
      top={top || "top-[-110px]"}
      bottom={""}
      right={right || "right-[-190px]"}
      left={""}
      title={type == "extra" ? "Add an extra" : "Add Restaurant Menu"}
      subtext={
        type == "extra"
          ? "Fill form to add a new extra"
          : "Fill form to add a new menu"
      }
      open={open}
      setOpen={setOpen}
    >
      <form
        action=""
        onSubmit={handleSubmit(
          type == "extra" ? handleAddExtra : handleAddMenu
        )}
        encType="multipart/form-data"
      >
        <div className="flex flex-col mt-2 relative h-full">
          <div className="flex-col flex mt-3">
            <p className="text-sm text-gray-600 font-bold">Menu Details</p>
            <div className="flex flex-col gap-2">
              <CustomInput
                register={register}
                name={"name"}
                label={"MENU NAME"}
                type={"text"}
                required={true}
                placeholder={"Enter branch name here"}
              />
              {type != "extra" && (
                <CustomInput
                  register={register}
                  name={"description"}
                  label={"DESCRIPTION"}
                  type={"textarea"}
                  height={"h-[100px]"}
                  required={true}
                  placeholder={"Enter menu description here"}
                />
              )}
              <CustomInput
                register={register}
                name={"price"}
                label={"PRICE"}
                type={"number"}
                required={true}
                placeholder={"Enter price here"}
              />
              {type != "extra" && (
                <CustomInput
                  register={register}
                  name={"category"}
                  label={"CATEGORY"}
                  options={categories}
                  type={"select"}
                  required={true}
                  onChange={handleSelectedCategory}
                  placeholder={"Enter contact here"}
                />
              )}
              <CustomInput
                register={register}
                name={"attachment"}
                label={"ATTACH IMAGE"}
                type={"file"}
                required={false}
                trigger={trigger}
                onFileSelect={handleFileSelect}
                onRemoveFile={handleRemoveFile}
              />
            </div>
          </div>

          <div className="mt-40 flex h-full">
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
export default AddMenuModal;

AddMenuModal.propTypes = {
  orderID: PropTypes.string,
  top: PropTypes.string,
  right: PropTypes.string,
  type: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  refetch: PropTypes.func,
};
