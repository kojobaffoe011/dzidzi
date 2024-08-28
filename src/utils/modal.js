/**
 * The `defaultModalStyles` object defines default styles for modal dialogs created using ReactModal.
 * It specifies the appearance and behavior of both the modal overlay and the modal content.
 */
export const defaultModalStyles = {
  overlay: {
    background: "rgba(0,0,0,0.9)", // Semi-transparent black overlay
    zIndex: 5, // Z-index to control overlay stacking
    overflowY: "scroll",
  },
  content: {
    borderRadius: "10px", // Rounded corners for the modal content
    background: "#ffffff", // White background color
    margin: "auto auto", // Center the modal horizontally and vertically
    border: 0, // Remove borders
    padding: "0 !important", // Remove padding (important for overriding styles)
    minHeight: "auto", // Automatically adjust height to content
    maxHeight: "fit-content", // Limit maximum height to content size
  },
};
