import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * The `Modal Context Provi` component serves as a basic layout structure for a web page.
 * It wraps its child components in a flex container with a minimum height to fill
 * the screen vertically and horizontally center the content.
 *
 * @param {Object} props - React props containing child components.
 * @returns {JSX.Element} The rendered layout with child components.
 */

const ModalContext = createContext({});

export const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const toggleModal = () => setOpen((prev) => !prev);

  useEffect(() => {
    if (open && typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [open]);

  return (
    <ModalContext.Provider
      value={{ open, setOpen, openModal, closeModal, toggleModal }}
    >
      <div className="relative">
        {open && (
          <div
            className="bg-black opacity-[0.5] absolute right-0 h-screen w-full z-[10]"
            // onClick={() => closeModal()}
          />
        )}
        {children}
      </div>
    </ModalContext.Provider>
  );
};

export default ModalContext;

ModalProvider.propTypes = {
  children: PropTypes.node,
};
