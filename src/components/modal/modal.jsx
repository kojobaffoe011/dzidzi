import React, { cloneElement, useEffect } from "react";
import ReactModal from "react-modal";
import { defaultModalStyles } from "../../utils/modal";

/**
 * The `Modal` component is a wrapper around `ReactModal` that allows you to easily
 * display modal dialogs in your application. It accepts child components to render
 * the modal content and provides control over its visibility and close behavior.
 *
 * @param {object} props - React props for configuring the modal.
 * @param {boolean} props.isOpen - Indicates whether the modal is open or closed.
 * @param {function} props.handleCancel - A callback function to handle modal closing.
 * @param {ReactNode} props.children - The child component(s) to render inside the modal.
 * @returns {JSX.Element} The rendered modal dialog.
 */
export const Modal = (props) => {
  const { children, isOpen, handleCancel, width } = props;

  // Set the application element for screen readers
  useEffect(() => {
    ReactModal.setAppElement("#root");
  }, []);

  return (
    <ReactModal
      style={{
        overlay: { ...defaultModalStyles.overlay },
        content: {
          ...defaultModalStyles.content,
          maxWidth: width,
        },
      }} // Apply default modal styles
      isOpen={isOpen} // Control modal visibility
      onRequestClose={handleCancel} // Handle modal closing
    >
      {/* Render the child components within the modal */}
      {cloneElement(children, props)}
    </ReactModal>
  );
};
