import { useCallback, useState } from "react";
import { useOrderList } from "../../components/brokers/apicalls";
import TableAlt from "../../components/TableAlt";
import Button from "../../components/Button";
import { humanDatetime } from "../../utils/config";
import { useOutletContext } from "react-router";
import OrderDetails from "../../components/modal/restaurant/OrderDetails";
import OrderStatus from "../../components/reusableComponents/orderStatus";

const Orders = () => {
   const [, activeUser] = useOutletContext();
    const [cursorHistory, setCursorHistory] = useState({
    firstCursor: null,
    lastCursor: null,
    direction: "FORWARD",
  });   
    const [orderID, setOrderID] = useState(null);


 const [filters, setFilters] = useState({
  restaurantId: activeUser?.currentUserRole == 'RESTAURANT' ? activeUser?.currentUserId :null, 
  courierId: null, 
  userId: null, 
  orderId: null, 
  sortBy: 'DATE', 
  orderBy: 'DESC',
  });
    const [openOrder, setOpenOrder] = useState(false);

  const handleOpenOrderModal = useCallback(() => {
    setOpenOrder(true);
  }, []);
  const handleCloseOrderModal = useCallback(() => {
    setOpenOrder(false);
  }, []);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useOrderList(
    filters.restaurantId,
    filters.courierId,
    filters.userId,
    filters.orderId,
    filters.sortBy,
    filters.orderBy,
    cursorHistory.direction == "FORWARD"
      ? cursorHistory.lastCursor
      : cursorHistory.firstCursor, // Pass the current cursor
    cursorHistory.direction // Pass the current direction
  );


   const handlePrevious = () => {
    setCursorHistory({
      firstCursor: data?.firstCursor,
      lastCursor: data?.lastCursor,
      direction: "BACKWARDS",
    });
  };

  const handleNext = () => {
    setCursorHistory({
      firstCursor: data?.firstCursor,
      lastCursor: data?.lastCursor,
      direction: "FORWARD",
    });
  };


  return (
    <div>
          <OrderDetails
        isOpen={openOrder}
        handleCancel={handleCloseOrderModal}
        userRole={"RESTAURANT"}
        width="800px"
        orderID={orderID}
      />
         <TableAlt
        isLoading={isLoading}
        list={data}
        title={"No Record Found"}
        handleNext = {handleNext}
        handlePrevious = {handlePrevious}

      >


        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Order Details
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                oRDER STATUS
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                User Details
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="3" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan="3" className="p-4 text-center">
                  Error loading menus
                </td>
              </tr>
            ) : (
              data?.results?.map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <p className="mr-3 italic">Order Number: </p>
                          <span className="p-1 text-xs uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50 font-extrabold">
                            {item?.value?.orderNumber}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <p className="mr-3 italic"> Amount: </p>
                          <p className="mr-3 font-extrabold text-xs">
                            $ {item?.value?.totalAmount}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <p className="mr-3 italic"> Date: </p>
                          <p className="mr-3 font-extrabold text-xs text-red-600">
                            {humanDatetime (item?.value?.orderDate)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td><OrderStatus orderStatus={item?.value?.status}/></td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <p className="mr-3 italic">Name: </p>
                          <span className="p-1 text-xs uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50 font-extrabold">
                            {item?.value?.user?.firstName} {item?.value?.user?.lastName}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <p className="mr-3 italic"> Contact: </p>
                          <p className="mr-3 font-extrabold text-xs">
                            {item?.value?.user?.contact}
                          </p>
                        </div>
                      
                      </div>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <Button
                        variant="dark"
                        className="px-2 py-1 text-xs rounded-md"
                        onClick={() => {
                          handleOpenOrderModal();
                          setOrderID(item?.value?.id);
                        }}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </TableAlt>
    </div>
      
  )
}

export default Orders