import { useCallback, useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigateTo } from "../../../hooks/useNavigateTo";
import SideModal from "../../reusableComponents/SideModal";
import UpdateOrderModal from "./UpdateOrder";
import PropTypes from "prop-types";
import Button from "../../reusableComponents/Button";
import cookie from "../../../utils/cookie";
import Imageloader from "../../loaders/Imageloader";
import useModal from "../../../hooks/useModal";

const UserSelectedOrders = ({ open, setOpen, top }) => {
  const { auth } = useAuth();
  const { closeModal } = useModal();
  const { navigateTo } = useNavigateTo();
  const loggedIn = cookie.getCipher();
  const [updateOrderOpen, setUpdateOrderOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const handleOpenUpdateModal = useCallback(() => {
    setUpdateOrderOpen(true);
  }, []);
  const handleCloseUpdateModal = useCallback(() => {
    setUpdateOrderOpen(false);
  }, []);

  const totalSum = auth?.orders?.reduce((total, order) => {
    return (
      total +
      order.quantity * (order.menu ? order.menu.price : order.extra.price)
    );
  }, 0);

  useEffect(() => {
    if (auth?.orders && auth?.orders.length == 0) {
      setOpen(false);
    }
  }, [auth?.orders, auth?.orders?.length]);

  return (
    <>
      <UpdateOrderModal
        isOpen={updateOrderOpen}
        handleCancel={handleCloseUpdateModal}
        userRole={"RESTAURANT_ADMIN"}
        order={selectedOrder}
        width="1000px"
      />

      <SideModal
        title={auth?.restaurant?.name}
        subtext={`${auth?.orders && auth.orders.length} item(s)`}
        open={open}
        setOpen={setOpen}
        top={top && top}
      >
        <div className="flex flex-col gap-2">
          <div className="flex justify-end items-center">
            <p className="font-bold">
              <span className="font-extralight">Subtotal:</span> €
              {totalSum?.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex flex-col h-full justify-between ">
          <div className="flex flex-col gap-3 mt-8 h-[600px] overflow-scroll">
            {auth?.orders?.map((item, idx) => {
              return (
                <div
                  className="flex-col flex mb-6 cursor-pointer"
                  key={idx}
                  onClick={() => {
                    handleOpenUpdateModal();
                    setSelectedOrder(item);
                  }}
                >
                  <div className="flex justify-between">
                    <p className="font-bold">
                      {item.menu ? item.menu.name : item.extra.name}
                    </p>
                    <div className="flex justify-center items-center">
                      <Imageloader
                        imageID={item?.image?.id}
                        classNames="h-[50px] w-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-light">
                      Quantity:{" "}
                      <span className="font-bold">{item.quantity}</span>
                    </p>

                    <p className="font-bold">
                      €
                      {item.menu
                        ? (item.menu.price * item.quantity).toFixed(2)
                        : (item.extra.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-xl font-bold">
            <p className="">Subtotal</p>
            <p className="">€{totalSum?.toFixed(2)}</p>
          </div>
          <div className="flex flex-col gap-3">
            {/* <Link to={`/details/menu/${auth?.restaurant.id}`}> */}
            <Button
              className="bg-black py-3 mt-3 hover:bg-gray-600"
              rounded
              onClick={() => {
                if (loggedIn) {
                  navigateTo(`/details/checkout/${auth?.restaurant?.id}`);
                  return setOpen(false);
                } else {
                  setOpen(false);
                  closeModal();
                  return navigateTo(`/auth`);
                }
              }}
            >
              <p className="text-white font-bold">Go to checkout</p>
            </Button>
            {/* </Link>{" "} */}
            <div className="flex justify-center items-center">
              <p className="font-bold">Add Items</p>
            </div>
          </div>
        </div>
      </SideModal>
    </>
  );
};

export default UserSelectedOrders;

UserSelectedOrders.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  top: PropTypes.string,
};
