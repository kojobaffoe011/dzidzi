import OrderStatus from "../../reusableComponents/orderStatus";
import SideModal from "../../reusableComponents/SideModal";
import ErrorOccured from "../../notices/ErrorOccured";
import {
  useAcceptTicket,
  useAddServiceResponse,
  useGetResponsesByTicketID,
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
import { humanDatetime } from "../../../utils/config";
import { RiCheckboxCircleFill } from "react-icons/ri";
import CustomInput from "../../reusableComponents/CustomInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { IoIosAddCircle } from "react-icons/io";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import nodata from "../../../assets/images/no-data.png";
import NoDataFound from "../../notices/NoDataFound";

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

const AddResponse = ({ setAddResponse, ticketID, refetchResponses }) => {
  const [response, setResponse] = useState(null);
  const responseSchema = yup.object().shape({
    response: yup.string().required("Response is required"),
  });

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(responseSchema),
  });

  const { mutationFn } = useAddServiceResponse(ticketID, response);

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-branch"],
    mutationFn,
    onSuccess: () => {
      showSuccessToast("Response Added successfully");
      setAddResponse(false);
      refetchResponses();
      // if (refetch && typeof refetch == "function") {
      //   return refetch();
      // }
    },
    onError: (error) => {
      if (error.message.includes("timeout")) {
        // return timeOutError(error);
      }
      return showErrorToast(error.message);
    },
  });

  const handleAddResponse = async (data) => {
    if (Object.keys(errors).length == 0) {
      await setResponse(data.response);
      return mutate();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleAddResponse)}>
        {/* <CustomInput /> */}
        {/* <div className="col-span-2"> */}
        <CustomInput
          register={register}
          name={"response"}
          label={"ADD RESPONSE"}
          type={"textarea"}
          required={true}
          placeholder={"Add response here"}
        />
        <div className="flex justify-end">
          <div className="flex gap-1">
            {isPending ? (
              <Spinner color={"green"} size={"30px"} />
            ) : (
              <button>
                <GoCheckCircleFill
                  className="text-green-500 cursor-pointer hover:text-green-600"
                  size={"30px"}
                  onClick={() => setAddResponse(true)}
                />
              </button>
            )}

            <AiFillCloseCircle
              className="text-red-500 cursor-pointer hover:text-red-600"
              size={"30px"}
              onClick={() => setAddResponse(false)}
            />
          </div>
        </div>
      </form>
    </>
  );
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

const ShowTicketDetails = ({
  ticket,
  activeUser,
  ticketID,
  setOpen,
  refetch,
  refetchResponses,
}) => {
  const [addResponse, setAddResponse] = useState(false);

  // const { data, isLoading } = useGetSingleOrder(ticketID);

  const ticketStatus = ticket?.status;

  const { mutationFn } = useAcceptTicket(ticketID);

  const { mutate, isPending } = useMutation({
    mutationFn,
    onSuccess: () => {
      showSuccessToast("Ticket Accepted Successfully");
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
            ? `${
                (ticket.user && ticket.user.firstName) ||
                ticket.courier.firstName
              } ${
                (ticket.user && ticket.user.lastName) || ticket.courier.lastName
              }`
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

  return (
    <div className="max-h-[850px] overflow-scroll">
      {ticket?.assignedTo == null &&
        activeUser?.currentUserRole == "SERVICE" && (
          <div className="flex-col flex gap-4 mt-1">
            <div className="flex"></div>
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
      <div className="flex-col flex border-b">
        <div className="flex-col flex gap-4 mt-4 mt-2 mb-4">
          <p className="text-sm text-gray-600 font-bold">User Complaint</p>
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
              // value={ JSON.parse(ticket?.details)?.description}
              value={ticket?.details}
            />
          </div>
        </div>
      </div>
      {ticket?.status == "COMPLETED" || ticket?.status == "PENDING" ? (
        ""
      ) : (
        <div className="border-b ">
          <div className="flex-col flex mt-4 mb-4">
            <p className="text-sm text-gray-600 font-bold">Ticket Response</p>
            {addResponse == false && (
              <div className="flex justify-between items-center">
                <p className="font-light text-sm">Want to add response?</p>
                <IoIosAddCircle
                  className="text-blue-500 cursor-pointer hover:text-blue-600"
                  size={"30px"}
                  onClick={() => setAddResponse(true)}
                />
              </div>
            )}
            {addResponse && (
              <AddResponse
                setAddResponse={setAddResponse}
                ticketID={ticketID}
                refetchResponses={refetchResponses}
              />
            )}
          </div>
        </div>
      )}

      {ticket?.assignedTo !== null &&
        ticket?.status !== "COMPLETED" &&
        activeUser?.currentUserRole == "SERVICE" && (
          <div className="flex flex-col">
            <div className="flex-col flex mt-4 ">
              <p className="text-sm text-gray-600 font-bold mb-3">
                Update Ticket Status
              </p>
              <ChangeOrderStatus
                ticketStatus={ticketStatus}
                ticketID={ticketID}
                setOpen={setOpen}
                activeUser={activeUser}
                refetch={refetch}
              />
            </div>
          </div>
        )}
    </div>
  );
};

const ShowResponses = ({ responses }) => {
  const results = responses?.[0].results;

  return (
    <div className="flex mt-1">
      {results.length > 0 ? (
        <div className="w-full max-h-[850px] overflow-scroll">
          {results &&
            results.map((item, idx) => {
              return (
                <div key={idx} className="flex gap-2">
                  <div
                    className={`${
                      idx == 0 ? "" : "mt-4"
                    } grid grid-cols-2 w-full gap-1 border-b mt-2`}
                  >
                    <div className={`w-full `}>
                      <p className="text-gray-500 text-sm ">Response Date</p>
                    </div>
                    <div className="flex items-center">
                      <p className="font-light text-xs">
                        {humanDatetime(item.responseDate)}
                      </p>
                    </div>
                    <div className="w-full">
                      <p className="text-gray-500 text-sm ">Name</p>
                    </div>
                    <div className="flex items-center">
                      <p className="font-light text-xs">
                        {!item.restaurant
                          ? `${
                              item.customerService.firstName ||
                              item.user.firstName ||
                              item.courier.firstName
                            } ${
                              item.customerService.lastName ||
                              item.user.lastName ||
                              item.courier.lastName
                            }`
                          : item.restaurant.name}
                      </p>
                    </div>
                    <div className="w-full">
                      <p className="text-gray-500 text-sm ">User type</p>
                    </div>
                    <div className="flex items-center">
                      <p className="font-light text-xs">
                        {(item.user && "USER") ||
                          (item.restaurant && "RESTAURANT") ||
                          (item.courier && "COURIER") ||
                          (item.customerService && "SERVICE REP")}
                      </p>
                    </div>
                    <div className=" w-full col-span-2 flex flex-col mb-4">
                      <textarea
                        name=""
                        id=""
                        disabled
                        value={item.details}
                        className="text-sm text-gray-500 p-3 border rounded-md"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <NoDataFound title={"No responses to this ticket at the moment"} />
      )}
    </div>
  );
};

const TicketModal = ({
  ticketID,
  top,
  right,
  open,
  setOpen,
  refetch,
  activeUser,
}) => {
  const [tabToShow, setTabToShow] = useState({
    ticket: true,
    responses: false,
  });
  const [currentPage, setCurrentPage] = useState(1);

  // const { data, isLoading } = useGetSingleOrder(ticketID);
  const {
    data: ticket,
    isLoading: ticketLoading,
    isError,
  } = useGetTicketByID(ticketID);

  const {
    data: ticketResponses = [],
    isLoading: isTicketResponsesLoading,
    // hasNextPage: responsesHasNextPage,
    // isFetchingNextPage: responsesFetchingNextPage,
    // isError: isResponsesAltError,
    refetch: refetchResponses,
  } = useGetResponsesByTicketID(ticketID, currentPage);

  let responses = ticketResponses?.pages?.flatMap((page) => page?.data);

  const tabs = [
    {
      name: "Tickets",
      value: "ticket",
    },
    {
      name: "Responses",
      value: "responses",
    },
  ];

  const handleTabSwitch = (value) => {
    switch (value) {
      case "ticket":
        setTabToShow({ ticket: true, responses: false });
        break;
      case "responses":
        setTabToShow({ ticket: false, responses: true });
        break;
      default:
        setTabToShow({ ticket: true, responses: false });
        break;
    }
  };

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
      {ticketLoading || isTicketResponsesLoading ? (
        <div className="flex flex-col h-full items-center justify-center gap-2">
          <Spinner color="blue" />
          <p className="text-xs">We need a sec to load your order details</p>
        </div>
      ) : (
        <div className="flex flex-col mt-2 relative">
          <div className="flex ">
            <div className="p-1 flex rounded-md gap-1 bg-slate-50">
              {tabs?.map((tab, idx) => {
                const tab_value = tab.value;
                const tab_name = tab.name;
                return (
                  <div
                    className={`px-6 py-2 border hover:cursor-pointer rounded-sm hover:border hover:border-blue-200 hover:border-2 hover:bg-blue-50 hover:shadow-md hover:text-blue-600${
                      tabToShow[tab_value]
                        ? "border border-blue-200 border-2 bg-blue-50 shadow-md"
                        : "border border-gray-200 border-2 bg-white"
                    }`}
                    onClick={() => handleTabSwitch(tab_value)}
                    key={idx}
                  >
                    <p
                      className={`text-xs font-bold  hover:text-blue-600 ${
                        tabToShow[tab_value] ? "text-blue-600 " : ""
                      }`}
                    >
                      {tab_name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <>
            {tabToShow.ticket && (
              <ShowTicketDetails
                activeUser={activeUser}
                ticket={ticket}
                ticketID={ticketID}
                setOpen={setOpen}
                refetch={refetch}
                refetchResponses={refetchResponses}
              />
            )}
            {tabToShow.responses && (
              <ShowResponses
                activeUser={activeUser}
                responses={responses}
                ticketID={ticketID}
                setOpen={setOpen}
                refetch={refetch}
              />
            )}
          </>
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
  activeUser: PropTypes.object,
};

ChangeOrderStatus.propTypes = {
  ticketStatus: PropTypes.string,
  ticketID: PropTypes.string,
  setOpen: PropTypes.func,
  activeUser: PropTypes.object,
  refetch: PropTypes.func,
};

ShowTicketDetails.propTypes = {
  ticket: PropTypes.object,
  ticketID: PropTypes.string,
  setOpen: PropTypes.func,
  activeUser: PropTypes.object,
  refetch: PropTypes.func,
  refetchResponses: PropTypes.func,
};

ShowResponses.propTypes = {
  responses: PropTypes.array,
  // ticketID: PropTypes.string,
  // setOpen: PropTypes.func,
  // activeUser: PropTypes.object,
  // refetch: PropTypes.func,
};
