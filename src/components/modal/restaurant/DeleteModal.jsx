import { Modal } from "../modal";
import { showErrorToast, showSuccessToast } from "../../../toast/Toast";
import Spinner from "../../loaders/Spinner";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { RiErrorWarningFill } from "react-icons/ri";
import Button from "../../Button";
import { useAddCredentials } from "../../brokers/apicalls";

const DeleteModal = (props) => {
  const types = ["RESTAURANT", "COURIER", "SERVICE", "ADMIN"];
  const { userRole } = props;



 

  return (
    <div handleCancel={props.handleCancel} isOpen={props.isOpen}>
      <Modal {...props}>
        <div className="p-2 flex flex-col">
          <div className="p-2 flex flex-col pb-4">
            <div className="flex justify-center">
              <p className="font-bold">DELETE {props.action}</p>
            </div>
            <div className="flex justify-center items-center">
              <RiErrorWarningFill className="text-red-600 mr-1" size="20px" />
              <p className="text-sm text-red-800 text-center">
                Are you sure you to perform this action? This is irreversible
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex items-center mr-2">
              <Button
                className="px-8 py-2 w-full bg-red-600 rounded"
                onClick={props.deleteItem}
              >
                {props.isLoading ? (
                  <Spinner color="white" size="15px" />
                ) : (
                  <p className="font-bold text-base text-white">Delete</p>
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
        </div>
      </Modal>
    </div>
  );
};

export default DeleteModal;
