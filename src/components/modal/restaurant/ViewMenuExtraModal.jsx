import SideModal from "../../reusableComponents/SideModal";
import ErrorOccured from "../../notices/ErrorOccured";
import {
  useGetSingleExtra,
  useGetSingleMenu,
  useUpdateExtraVisibility,
  useUpdateMenuVisibility,
} from "../../brokers/apicalls";
import Spinner from "../../loaders/Spinner";
import PropTypes from "prop-types";
import { useMutation } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../../toast/Toast";
import Button from "../../reusableComponents/Button";

const ViewMenuExtraModal = ({
  top,
  right,
  open,
  setOpen,
  refetch,
  menuID,
  extraID,
}) => {
  const { mutationFn } = useUpdateMenuVisibility(menuID);
  const { mutationFn: extraMutFn } = useUpdateExtraVisibility(extraID);

  const {
    isLoading: isMenuLoading,
    data: menuData,
    refetch: refetchMenuData,
    isError,
    // error,
  } = useGetSingleMenu(menuID);

  const {
    isLoading: isExtraLoading,
    data: extraData,
    refetch: refetchExtraData,
    isError: isExtraError,
    // error,
  } = useGetSingleExtra(extraID);

  const menu = menuData
    ? [
        {
          text: "Name",
          value: menuData.name,
        },
        {
          text: "Price (€)",
          value: menuData.price,
        },
        {
          text: "Restaurant",
          value: menuData.restaurant.name,
        },
        {
          text: "Category",
          value: menuData.category,
        },
      ]
    : null;

  const extra = extraData
    ? [
        {
          text: "Name",
          value: extraData.name,
        },
        {
          text: "Price (€)",
          value: extraData.price,
        },
        {
          text: "Restaurant",
          value: extraData.restaurant.name,
        },
        // {
        //   text: "Category",
        //   value: menuData.category,
        // },
      ]
    : null;

  const arraytoMap = () => {
    if (extraID && extraData) {
      return extra;
    }

    if (menuID && menuData) {
      return menu;
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: extraID ? extraMutFn : mutationFn, // mutation function goes here
    onSuccess: () => {
      showSuccessToast(`Visibility updated successfully`);
      extraID ? refetchExtraData() : refetchMenuData();
      if (refetch && typeof refetch == "function") {
        refetch();
      }

      setOpen(false);
    },
    onError: (error) => {
      showErrorToast(error.message || "An error occurred");
    },
  });

  if (isError || isExtraError) {
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
      title={extraID ? "View Extra" : "View Menu"}
      subtext={"Item details"}
      open={open}
      setOpen={setOpen}
    >
      {isMenuLoading || isExtraLoading ? (
        <div className="flex flex-col h-full items-center justify-center gap-2">
          <Spinner color="blue" />
          <p className="text-xs">We need a sec to load your order details</p>
        </div>
      ) : (
        <div className="flex flex-col mt-2 relative">
          {/* <div className="flex-col flex border-b gap-4">
            <p className="text-sm text-gray-600 font-bold">Items (€)</p>
            <div className="flex flex-col gap-2">
              {orderItems &&
                orderItems.map((item, idx) => {
                  return (
                    <div key={idx} className="grid-cols-3 grid mb-2">
                      <div className="flex flex-col ">
                        <p className="font-bold text-sm">
                          {item.extra ? item.extra.name : item.menu.name}
                        </p>
                        <p className="font-light text-xs">
                          {item.extra ? "extra" : "menu"}
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <p className="font-light text-sm text-gray-500">
                          {item.quantity}pcs
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <p className="font-normal text-sm">
                          {(item.extra
                            ? item.extra.price * item.quantity
                            : item.menu.price * item.quantity
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div> */}
          <div className="flex-col flex border-b gap-4 mt-4">
            <div className="flex flex-col gap-2 mb-2">
              {arraytoMap()?.map((item, idx) => {
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
          <div className="flex-col flex border-b gap-2 mt-4">
            <p className="text-sm text-gray-600 font-bold">Visibility</p>
            <div className="flex flex-col gap-1 mb-6">
              <div className="flex items-center gap-1">
                <p className="text-sm font-light">This item is currently </p>
                {(extraID ? extraData?.visible : menuData?.visible) ? (
                  <p className=" text-sm font-bold text-green-600">visible</p>
                ) : (
                  <p className=" text-sm font-bold text-red-600">not visible</p>
                )}
              </div>

              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center justify-between gap-1">
                  <p className="text-sm font-light">Do you want to make it</p>
                  {(extraID ? extraData?.visible : menuData?.visible) ? (
                    <p className=" text-sm font-bold text-red-600">
                      not visible{" "}
                      <span className="text-black font-light">?</span>
                    </p>
                  ) : (
                    <p className=" text-sm font-bold text-green-600">
                      visible <span className="text-black font-light">?</span>
                    </p>
                  )}
                </div>

                <Button
                  className="px-4 py-1 text-xs"
                  rounded
                  variant="success"
                  disabled={isPending}
                  onClick={() =>
                    mutate({
                      visible: extraID ? extraData?.visible : menuData?.visible,
                    })
                  }
                >
                  {isPending ? <Spinner size={"10px"} /> : "Change"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </SideModal>
  );
};
export default ViewMenuExtraModal;

ViewMenuExtraModal.propTypes = {
  menuID: PropTypes.string,
  extraID: PropTypes.string,
  top: PropTypes.string,
  right: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  refetch: PropTypes.func,
};
