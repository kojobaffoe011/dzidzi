import { useCallback, useState } from "react";
import { useOrderListPaged } from "../../components/brokers/apicalls";
import OrderStatus from "../../components/reusableComponents/orderStatus";
import { humanDatetime } from "../../utils/config";
import OrderDetails from "../../components/modal/restaurant/OrderDetails";
import { useParams } from "react-router";
// import { useParams } from "react-router";

const UserOrders = () => {
  const { id } = useParams();
  const [orderID, setOrderID] = useState(null);
  const [openOrder, setOpenOrder] = useState(false);

  const handleOpenOrderModal = useCallback(() => {
    setOpenOrder(true);
  }, []);
  const handleCloseOrderModal = useCallback(() => {
    setOpenOrder(false);
  }, []);

  const [filters, setFilters] = useState({
    restaurantId: null,
    courierId: null,
    userId: id,
    // || id,
    orderId: null,
    sortBy: null,
    orderBy: null,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: orderList = [],
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
  } = useOrderListPaged(
    filters.restaurantId,
    filters.courierId,
    filters.userId,
    filters.orderId,
    filters.sortBy,
    filters.orderBy,
    currentPage
  );
  let orderData = orderList?.pages?.flatMap((page) => page?.data);

  if (isLoading) {
    <div className="bg-white p-2 sm:p-4 sm:h-64 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none ">
      <div className="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200 animate-pulse"></div>
      <div className="flex flex-col flex-1 gap-5 sm:p-2">
        <div className="flex flex-1 flex-col gap-3">
          <div className="bg-gray-200 w-full animate-pulse h-14 rounded-2xl"></div>
          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
        </div>
        <div className="mt-auto flex gap-3">
          <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full"></div>
          <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full"></div>
          <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full ml-auto"></div>
        </div>
      </div>
    </div>;
  }

  if (isError) {
    return <div>Error loading list ...</div>;
  }

  return (
    <>
      <OrderDetails
        isOpen={openOrder}
        handleCancel={handleCloseOrderModal}
        width="800px"
        orderID={orderID}
      />

      <div className="max-h-[800px] grid grid-cols-2 gap-2">
        {orderData?.[0]?.results.map((item, idx) => {
          return (
            <div
              className={`p-4 border border-b-2 flex flex-col cursor-pointer gap-2 hover:bg-gray-50`}
              key={idx}
              onClick={() => {
                handleOpenOrderModal();
                setOrderID(item?.id);
              }}
            >
              <div className="flex justify-between">
                <p className="text-blue-600 text-xl">#{item?.orderNumber}</p>
                <OrderStatus orderStatus={item?.status} />
              </div>
              <div className="flex items-center justify-between">
                <p className="">${item?.totalOrderPrice}</p>
                <p className="text-sm font-light">
                  {humanDatetime(item?.orderDate)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UserOrders;
