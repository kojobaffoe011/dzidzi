import { RiCloseLine } from "react-icons/ri";
import useModal from "../../hooks/useModal";
import PropTypes from "prop-types";
import { useEffect } from "react";

const SideModal = ({
  children,
  right,
  top,
  bottom,
  left,
  title,
  subtext,
  zindex,
  open,
  setOpen,
  showSupport,
}) => {
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    if (open == true) {
      return openModal();
    } else if (open == false) {
      return closeModal();
    }
  }, [open]);

  useEffect(() => {
    const handlePageReload = () => {
      closeModal();
    };
    window.addEventListener("beforeunload", handlePageReload);
    return () => {
      window.removeEventListener("beforeunload", handlePageReload);
    };
  }, [closeModal]);

  return (
    <>
      {open && (
        <div
          className={`p-4 flex flex-col h-[1015px] shadow-md absolute ${
            right ? right : "right-4"
          } ${top ? top : "top-[-0px]"} ${bottom ? bottom : " bottom-5"} ${
            left ? left : " "
          } w-[450px] ${zindex || "z-[10]"} bg-white shadow-lg  rounded-lg`}
        >
          <div className="mt-4 flex justify-between items-center border-b">
            <div className="flex flex-col">
              <p className="font-bold text-2xl whitespace-nowrap font-extrabold">
                {/* {auth.open ? auth?.restaurant?.name : title} */}
                {title}
              </p>
              <p className="text-sm font-light mb-2">
                {/* {auth.open
                ? `${auth?.orders && auth.orders.length} item(s)`
                : subtext}{" "} */}
                {subtext}
              </p>
            </div>
            <button
              onClick={() => {
                closeModal();
                setOpen(false);
              }}
              className=""
            >
              <RiCloseLine size={"35px"} className="cursor-pointer" />
            </button>
          </div>
          {children}

          {showSupport && (
            <div className="absolute bottom-8 right-0 left-0 ">
              <div className="flex w-full justify-between p-2 items-center">
                <p className="font-light text-sm">Confused about something?</p>
                <button className="border text-sm bg-blue-50 text-blue-500 font-bold px-2 py-1 rounded-sm hover:bg-blue-50">
                  Contact support
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SideModal;

SideModal.propTypes = {
  children: PropTypes.node,
  right: PropTypes.string,
  top: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string,
  title: PropTypes.string,
  subtext: PropTypes.string,
  zindex: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  showSupport: PropTypes.bool,
};
