import toast from "react-hot-toast";

/**
 * The `showErrorToast` function displays an error toast notification using the `react-hot-toast` library.
 *
 * @param {String} error - The error message to be displayed in the toast.
 */
export const showErrorToast = (error) => {
  toast.error(error);
};

/**
 * The `showSuccessToast` function displays a success toast notification using the `react-hot-toast` library.
 *
 * @param {String} success - The success message to be displayed in the toast.
 */
export const showSuccessToast = (success) => {
  toast.success(success);
};
