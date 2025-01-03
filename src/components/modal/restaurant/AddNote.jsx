import { Modal } from "../modal";
import { showErrorToast } from "../../../toast/Toast";
import useAuth from "../../../hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../../reusableComponents/Button";
import PropTypes from "prop-types";

const AddNote = (props) => {
  const { setordernote, handlecancel } = props;
  const { auth, setAuth } = useAuth();
  const noteSchema = yup.object().shape({
    note: yup.string().required("Note is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(noteSchema),
  });

  const handleAddNote = (data) => {
    try {
      if (Object.keys(errors).length === 0) {
        setordernote(data.note);
        setAuth({ ...auth, note: data.note });
        reset();
        handlecancel();
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
            <p className="font-bold">ADD DELIVERY NOTE</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(handleAddNote)}>
          <div className="flex flex-col mb-3 gap-1">
            <textarea
              className="border outline-none p-2 text-sm border border-black rounded-md h-[200px]"
              placeholder="Please meet me at the door"
              name="note"
              {...register("note")}
              required
            />
          </div>

          <div className="flex justify-center">
            <div className="flex items-center mr-2">
              <Button className="px-8 py-2 w-full bg-black rounded-md">
                {/* {isLoading ? (
                    <Spinner color="white" size="15px" />
                  ) : ( */}
                <p className="font-bold text-sm text-white">Confirm</p>
                {/* )} */}
              </Button>
            </div>
            <div className="flex items-center">
              <button
                className="px-8 py-2 w-full bg-gray-100 rounded border"
                type="button"
                onClick={handlecancel}
              >
                <p className="font-bold text-sm text-gray-500">Exit</p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddNote;

AddNote.propTypes = {
  setordernote: PropTypes.func,
  handlecancel: PropTypes.func,
};
