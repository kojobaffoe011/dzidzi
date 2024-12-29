import PaginatedTable from "../../../components/PaginatedTable";
import { useOrderListPaged } from "../../../components/brokers/apicalls";
import Button from "../../../components/reusableComponents/Button";
import { humanDatetime } from "../../../utils/config";
import OrderStatus from "../../../components/reusableComponents/orderStatus";
import useAuth from "../../../hooks/useAuth";

import { useOutletContext } from "react-router";
import OrdersSummary from "./OrdersSummary";
import { useState } from "react";
import TableComponent from "../../../components/reusableComponents/TableComponent";
import PropTypes from "prop-types";
import TableColumnContent from "../../../components/reusableComponents/TableColumnContent";
import TableRow from "../../../components/reusableComponents/TableRow";
import OrderModal from "../../../components/modal/restaurant/OrderModal";

// const OrderModal = ({ orderID, position }) => {
//   const { data, isLoading } = useGetSingleOrder(orderID);
//   const {
//     data: orderItems,
//     isLoading: orderItemsLoading,
//     isError,
//   } = useGetOrderItemsByOrderID(orderID);

//   const orderNumber = data?.orderNumber;
//   const orderStatus = data?.status;

//   const customer = data
//     ? [
//         {
//           text: "Ordered on",
//           value: humanDatetime(data.orderDate),
//         },
//         {
//           text: "Customer name",
//           value: `${data.user.firstName} ${data.user.lastName}`,
//         },
//         {
//           text: "Phone",
//           value: data.user.contact,
//         },
//         {
//           text: "Delivery to",
//           value: `${data.address.street} ${data.address.houseNumber}, ${data.address.city}`,
//         },
//       ]
//     : null;

//   const payment = data
//     ? [
//         {
//           text: "VAT",
//           value: data.vat,
//         },
//         {
//           text: "Discount",
//           value: data.discount,
//         },
//         {
//           text: "Delivery Fee",
//           value: data.deliveryFee,
//         },
//         {
//           text: "Order Price",
//           value: data.totalOrderPrice,
//         },
//         {
//           text: "Total Amount",
//           value: data.totalAmountToPay,
//         },
//       ]
//     : null;

//   if (isError) {
//     <div>
//       <ErrorOccured />
//     </div>;
//   }

//   // "top-[-110px]";
//   // "right-[-190px]";

//   return (
//     <SideModal
//       top={position ? position.top : "top-[-110px]"}
//       bottom={""}
//       right={position ? position.right : "right-[-190px]"}
//       left={""}
//       title={orderNumber}
//       subtext={"Order details"}
//     >
//       {isLoading || orderItemsLoading ? (
//         <div className="flex flex-col h-full items-center justify-center gap-2">
//           <Spinner color="blue" />
//           <p className="text-xs">We need a sec to load your order details</p>
//         </div>
//       ) : (
//         <div className="flex flex-col mt-2 relative">
//           <div className="flex-col flex border-b gap-4">
//             <p className="text-sm text-gray-600 font-bold">Items</p>
//             <div className="flex flex-col gap-2">
//               {orderItems &&
//                 orderItems.map((item, idx) => {
//                   return (
//                     <div key={idx} className="grid-cols-3 grid mb-2">
//                       <div className="flex flex-col ">
//                         <p className="font-bold text-sm">
//                           {item.extra ? item.extra.name : item.menu.name}
//                         </p>
//                         <p className="font-light text-xs">
//                           {item.extra ? "extra" : "menu"}
//                         </p>
//                       </div>
//                       <div className="flex flex-col items-center justify-center">
//                         <p className="font-light text-sm text-gray-500">
//                           {item.quantity}pcs
//                         </p>
//                       </div>
//                       <div className="flex flex-col items-center justify-center">
//                         <p className="font-normal text-sm">
//                           $
//                           {(item.extra
//                             ? item.extra.price * item.quantity
//                             : item.menu.price * item.quantity
//                           ).toFixed(2)}
//                         </p>
//                       </div>
//                     </div>
//                   );
//                 })}
//             </div>
//           </div>
//           <div className="flex-col flex border-b gap-4 mt-4">
//             <div className="flex flex-col gap-2 mb-2">
//               {customer &&
//                 customer.map((item, idx) => {
//                   return (
//                     <div key={idx} className="flex gap-2">
//                       <div className="grid grid-cols-2 w-full">
//                         <div>
//                           <p className="text-gray-500 text-sm ">{item.text}</p>
//                         </div>
//                         <div className="flex items-center">
//                           <p className="font-light text-xs">{item.value}</p>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//             </div>
//           </div>
//           <div className="flex-col flex border-b gap-4 mt-4">
//             <p className="text-sm text-gray-600 font-bold">Status</p>
//             <div className="flex flex-col gap-2 mb-6">
//               <OrderStatus orderStatus={orderStatus} />
//               <p className="text-sm font-light mt-2">
//                 This order has a{" "}
//                 <span className="lowercase">{orderStatus} </span>status
//               </p>
//             </div>
//           </div>
//           <div className="flex-col flex border-b gap-4 mt-4">
//             <p className="text-sm text-gray-600 font-bold">Payment</p>
//             <div className="flex flex-col gap-2 mb-2">
//               {payment &&
//                 payment.map((item, idx) => {
//                   return (
//                     <div key={idx} className="flex gap-2">
//                       <div className="grid grid-cols-2 w-full">
//                         <div>
//                           <p className="text-gray-500 text-sm ">{item.text}</p>
//                         </div>
//                         <div className="flex items-center">
//                           <p className="text-xs">${item.value.toFixed(2)}</p>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//             </div>
//           </div>
//         </div>
//       )}
//     </SideModal>
//   );
// };

const MyOrders = ({ userID, position }) => {
  const [orderID, setOrderID] = useState(null);
  const [open, setOpen] = useState(null);
  const { auth, setAuth } = useAuth();
  const [, data] = useOutletContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    restaurantId: null,
    courierId: null,
    userId: userID || data?.currentUserId,
    orderId: null,
    sortBy: "DATE",
    orderBy: "DESC",
  });

  const {
    data: orderList = [],
    isLoading,
    hasNextPage,
    refetch,
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
  const numberOfPages = orderData?.[0].totalPages;

  // orderData = fetchedData || orderData;

  const tablehead = [
    { title: "ORDER DETAILS", sortable: true, sortKey: "ORDER_NUMBER" },
    { title: "ORDER PRICE" },
    { title: "Status" },
    { title: "Address" },
    { title: "Action" },
  ];

  const tabledata = orderData?.[0].results;

  return (
    <div className="relative">
      {/* {auth?.modal > 0 && ( */}
      <OrderModal
        orderID={orderID}
        top={position?.top}
        right={position?.right}
        setOpen={setOpen}
        open={open}
        refetch={refetch}
      />
      {/* )} */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col ">
          <p className="font-bold">My Orders</p>
          <OrdersSummary />
        </div>
        <div>
          <PaginatedTable
            title={"No Orders Found"}
            list={orderData}
            totalCount={6}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            isLoading={isLoading}
            numberOfPages={numberOfPages}
            isFetchingNextPage={isFetchingNextPage}
            dataHasNextPage={hasNextPage}
          >
            <TableComponent tabledata={tabledata} tablehead={tablehead}>
              {tabledata?.map((item, idx) => {
                return (
                  <TableRow key={idx} index={idx}>
                    <TableColumnContent>
                      <div className="flex flex-col">
                        <p className="text-sm">{item.orderNumber}</p>
                        <p className="text-xs">
                          {humanDatetime(item.orderDate)}
                        </p>
                      </div>
                    </TableColumnContent>
                    <TableColumnContent>
                      <div className="flex flex-col">
                        <p className="text-sm">€ {item.totalAmountToPay}</p>
                      </div>
                    </TableColumnContent>
                    <TableColumnContent>
                      <div className="flex flex-col">
                        <OrderStatus orderStatus={item.status} />
                      </div>
                    </TableColumnContent>
                    <TableColumnContent>
                      <div className="flex flex-col">
                        <p className="text-sm">
                          {item.address.street} {item.address.houseNumber},{" "}
                          {item.address.city}
                        </p>
                      </div>
                    </TableColumnContent>
                    <TableColumnContent>
                      <Button
                        variant="dark"
                        className="px-2 py-1 text-xs rounded-md"
                        onClick={() => {
                          // handleOpenOrderModal();
                          setOrderID(item?.id);
                          setOpen(true);
                          // setAuth({ ...auth, modal: true });
                        }}
                      >
                        View Details
                      </Button>
                    </TableColumnContent>
                  </TableRow>
                );
              })}
            </TableComponent>
          </PaginatedTable>
        </div>
        <div className="mt-16" />
      </div>
    </div>
  );
};

export default MyOrders;

MyOrders.propTypes = {
  userID: PropTypes.string,
  fetchedData: PropTypes.array,
  position: PropTypes.object,
};

// OrderModal.propTypes = {
//   setAuth: PropTypes.func,
//   auth: PropTypes.object,
//   orderID: PropTypes.string,
//   position: PropTypes.object,
// };
