import SideModal from "../../reusableComponents/SideModal";
import PropTypes from "prop-types";

import SupportForm from "../../reusableComponents/SupportForm";

const AddTicketModal = ({ top, right, open, setOpen, refetch }) => {
  return (
    <SideModal
      top={top || "top-[-110px]"}
      bottom={""}
      right={right || "right-[-190px]"}
      left={""}
      title={"Contact Support"}
      subtext={"Send a message to our friendly support team"}
      open={open}
      setOpen={setOpen}
    >
      <SupportForm setOpen={setOpen} refetch={refetch} />
    </SideModal>
  );
};
export default AddTicketModal;

AddTicketModal.propTypes = {
  orderID: PropTypes.string,
  top: PropTypes.string,
  right: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  refetch: PropTypes.func,
};
