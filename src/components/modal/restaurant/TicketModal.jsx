import OrderStatus from "../../reusableComponents/orderStatus";
import SideModal from "../../reusableComponents/SideModal";
import ErrorOccured from "../../notices/ErrorOccured";
import {
  useAcceptTicket,
  useGetTicketByID,
  useUpdateTicketStaus,
} from "../../brokers/apicalls";
import Spinner from "../../loaders/Spinner";
import PropTypes from "prop-types";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { showErrorToast, showSuccessToast } from "../../../toast/Toast";
import Select from "react-select";
import Button from "../../reusableComponents/Button";
import { useOutletContext } from "react-router";
import { humanDatetime } from "../../../utils/config";
import { RiCheckboxCircleFill } from "react-icons/ri";

const options = [
  { value: "PENDING", label: "PENDING", color: "#713f12" },
  { value: "COMPLETED", label: "COMPLETED", color: " green" },
  {
    value: "OPEN",
    label: "OPEN",
    color: " blue",
  },
  {
    value: "IN_PROGRESS",
    label: "IN PROGRESS",
    color: " gray",
  },
  { value: "CLOSED", label: "CLOSED", color: " red" },
];

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colorStyles = {
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

const ChangeOrderStatus = ({
  ticketStatus,
  ticketID,
  setOpen,
  activeUser,
  refetch,
}) => {
  const [selectedOption, setSelectedOption] = useState(null || ticketStatus);

  const userRole = activeUser?.currentUserRole;

  const { mutationFn } = useUpdateTicketStaus(ticketID, selectedOption);

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateOrder", ticketID, selectedOption, userRole],
    mutationFn,
    onSuccess: () => {
      showSuccessToast("Order updated successfully");
      setOpen(false);
      if (refetch && typeof refetch == "function") {
        return refetch();
      }
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });

  const updateOrder = () => {
    return mutate({});
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="col-span-2">
        <Select
          defaultValue={options.find((item) => item.value == ticketStatus)}
          options={options}
          onChange={(item) => setSelectedOption(item.value)}
          styles={colorStyles}
        />
      </div>

      <Button
        onClick={updateOrder}
        variant="success"
        className="h-[40px]"
        rounded
      >
        {isPending ? (
          <Spinner color="white" size="20px" />
        ) : (
          <p>Update status</p>
        )}
      </Button>
    </div>
  );
};

const TicketModal = ({ ticketID, top, right, open, setOpen, refetch }) => {
  const [, activeUser] = useOutletContext();

  // const { data, isLoading } = useGetSingleOrder(ticketID);
  const {
    data: ticket,
    isLoading: ticketLoading,
    isError,
  } = useGetTicketByID(ticketID);

  const ticketStatus = ticket?.status;

  const customer = ticket
    ? [
        {
          text: "Created on",
          value: humanDatetime(ticket.createdOn),
        },
        {
          text: "Resolved on",
          value: !ticket.resolvedOn ? (
            <div className="flex">
              <div className="rounded-full text-xs font-bold bg-gray-200 text-gray-500 px-3 py-1">
                <p>N/A</p>
              </div>
            </div>
          ) : (
            <p className="">{humanDatetime(ticket.resolvedOn)}</p>
          ),
        },
        {
          text: "Customer name",
          value: !ticket.restaurant
            ? `${ticket.user.firstName} ${ticket.user.lastName}`
            : ticket.restaurant.name,
        },
        {
          text: "Phone",
          value:
            ticket.user?.contact ||
            ticket.courier?.contact ||
            ticket.restaurant?.contact,
        },
        {
          text: "Customer Type",
          value:
            (ticket.user && "USER") ||
            (ticket.restaurant && "RESTAURANT") ||
            (ticket.courier && "COURIER"),
        },
      ]
    : null;

  const { mutationFn } = useAcceptTicket(ticketID);

  const { mutate, isPending } = useMutation({
    mutationFn,
    onSuccess: () => {
      showSuccessToast("Restaurant Deleted Successfully");
      setOpen(false);
      if (refetch && typeof refetch == "function") {
        return refetch();
      }
      // navigateTo("/dashboard");
      // reset();
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });

  if (isError) {
    <div>
      <ErrorOccured />
    </div>;
  }

  return (
    <SideModal
      top={top || "top-[-110px]"}
      bottom={""}
      right={right || "right-[-190px]"}
      left={""}
      title={"View ticket"}
      subtext={"Ticket details"}
      open={open}
      setOpen={setOpen}
    >
      {ticketLoading ? (
        <div className="flex flex-col h-full items-center justify-center gap-2">
          <Spinner color="blue" />
          <p className="text-xs">We need a sec to load your order details</p>
        </div>
      ) : (
        <div className="flex flex-col mt-2 relative">
          {ticket?.assignedTo == null &&
            activeUser?.currentUserRole == "SERVICE" && (
              <div className="flex-col flex gap-4 mt-1">
                <div className="flex justify-end">
                  <Button
                    variant="success-outline"
                    className="px-6 py-1 rounded-md text-sm"
                    onClick={() => mutate()}
                  >
                    {isPending ? (
                      <Spinner color="green" size={"20px"} />
                    ) : (
                      <div className="flex gap-2 items-center">
                        <p>Accept</p>
                        <RiCheckboxCircleFill size={"20px"} />
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            )}
          <div className="flex-col flex border-b gap-4 mt-4">
            <div className="flex flex-col gap-2 mb-2">
              {customer &&
                customer.map((item, idx) => {
                  return (
                    <div key={idx} className="flex gap-2">
                      <div className="grid grid-cols-2 w-full">
                        <div>
                          <p className="text-gray-500 text-sm ">{item.text}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="font-light text-xs">{item.value}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex-col flex gap-4 mt-4">
            <p className="text-sm text-gray-600 font-bold">Details</p>
            <div className="flex flex-col gap-2">
              <div className="flex gap-1 items-center">
                <OrderStatus orderStatus={ticketStatus} />
                <p className="text-sm font-light mt-2">
                  This ticket has a{" "}
                  <span className="lowercase">{ticketStatus} </span>status
                </p>
              </div>
              <textarea
                disabled
                className="border rounded-md text-xs p-2 text-gray-500 font-light"
                value={ticket?.details}
              />
            </div>
          </div>

          {ticket?.assignedTo !== null && ticket?.status !== "COMPLETED" && (
            <div className="flex-col flex gap-4 mt-4">
              <p className="text-sm text-gray-600 font-bold">Update Ticket</p>
              <ChangeOrderStatus
                ticketStatus={ticketStatus}
                ticketID={ticketID}
                setOpen={setOpen}
                activeUser={activeUser}
                refetch={refetch}
              />
            </div>
          )}
        </div>
      )}
    </SideModal>
  );
};
export default TicketModal;

TicketModal.propTypes = {
  ticketID: PropTypes.string,
  top: PropTypes.string,
  right: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  refetch: PropTypes.func,
};

ChangeOrderStatus.propTypes = {
  ticketStatus: PropTypes.string,
  ticketID: PropTypes.string,
  setOpen: PropTypes.func,
  activeUser: PropTypes.object,
  refetch: PropTypes.func,
};
