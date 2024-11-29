import MyOrdersTable from "../../../components/MyOrdersTable";
import { useGetOrderItemsByOrderID, useGetSingleOrder, useOrderListPaged } from "../../../components/brokers/apicalls";
import Button from "../../../components/Button";
import { humanDatetime } from "../../../utils/config";
import OrderStatus from "../../../components/reusableComponents/orderStatus";
import useAuth from "../../../hooks/useAuth";
import SideModal from "../../../components/reusableComponents/SideModal";
import Spinner from "../../../components/loaders/Spinner";
import { useOutletContext } from "react-router";
import OrdersSummary from "./OrdersSummary";
import { useState } from "react";







const OrderModal = ({setAuth, auth, orderID})=> {

    const { data, isLoading } = useGetSingleOrder(orderID)
  const { data: orderItems, isLoading: orderItemsLoading, isError } = useGetOrderItemsByOrderID(orderID)


  const orderNumber = data?.orderNumber
  const orderStatus = data?.status
 
  const customer = data ? [
    {
      text: 'Ordered on',
      value: humanDatetime(data.orderDate),

    },
    {
      text: 'Customer name',
      value: `${data.user.firstName} ${data.user.lastName}`,

    },
    {
      text: 'Phone',
      value: data.user.contact,

    },
    {
      text: 'Delivery to',
      value: `${data.address.street} ${data.address.houseNumber}, ${data.address.city}`,

    },
  ] : null

  const payment = data ? [
    {
      text: 'VAT',
      value: data.vat,

    },
    {
      text: 'Discount',
      value: data.discount,

    },
    {
      text: 'Delivery Fee',
      value: data.deliveryFee,

    },
    {
      text: 'Order Price',
      value: data.totalOrderPrice,

    },
    {
      text: 'Total Amount',
      value: data.totalAmountToPay,

    },
  ] : null


  

  return  <SideModal 
  top={'top-[-110px]'}
  bottom={''}
  right={'right-[-190px]'}
  left={''}
  title={orderNumber}
  subtext={'Order details'}
  >
{
      isLoading || orderItemsLoading ? 
      <div className="flex flex-col h-full items-center justify-center gap-2">
        <Spinner color='blue'  />
        <p className="text-xs">We need a sec to load your order details</p>
      </div> : 
      <div className="flex flex-col mt-2 relative">
        <div className="flex-col flex border-b gap-4">
          <p className="text-sm text-gray-600 font-bold">Items</p>
          <div className="flex flex-col gap-2">
            {orderItems && orderItems.map((item,idx)=>{
              return <div key={idx}
              className="grid-cols-3 grid mb-2"
              >
                <div className="flex flex-col ">
                  <p className="font-bold text-sm">{item.extra ? item.extra.name : item.menu.name}</p>
                  <p className="font-light text-xs">{item.extra ? 'extra' : 'menu'}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="font-light text-sm text-gray-500">{item.quantity}pcs</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="font-normal text-sm">${(item.extra ? item.extra.price * item.quantity : item.menu.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            })}
          </div>
        </div>
        <div className="flex-col flex border-b gap-4 mt-4">
          <div className="flex flex-col gap-2 mb-2">
            { customer && customer.map((item,idx)=>{
              return <div key={idx}
              className="flex gap-2"
              >
                <div className="grid grid-cols-2 w-full">
                  <div>
                    <p className="text-gray-500 text-sm ">{item.text}</p>
                  </div>
                  <div className="flex items-center">
                     <p className="font-light text-xs">{item.value}</p>
                  </div>
                 
                </div>
              </div>
            })}
          </div>
        </div>
        <div className="flex-col flex border-b gap-4 mt-4">
            <p className="text-sm text-gray-600 font-bold">Status</p>
          <div className="flex flex-col gap-2 mb-6">
           <OrderStatus orderStatus={orderStatus}/>
           <p className="text-sm font-light mt-2">This order has a <span className="lowercase">{orderStatus} </span>status</p>
          </div>
        </div>
        <div className="flex-col flex border-b gap-4 mt-4">
           <p className="text-sm text-gray-600 font-bold">Payment</p>
          <div className="flex flex-col gap-2 mb-2">
            { payment && payment.map((item,idx)=>{
              return <div key={idx}
              className="flex gap-2"
              >
                <div className="grid grid-cols-2 w-full">
                  <div>
                    <p className="text-gray-500 text-sm ">{item.text}</p>
                  </div>
                  <div className="flex items-center">
                     <p className="text-xs">${(item.value).toFixed(2)}</p>
                  </div>
                 
                </div>
              </div>
            })}
          </div>
        </div>
        
      
      </div> 
}
         
      </SideModal>
}


const MyOrders = ({userID}) => {
   const [orderID, setOrderID] = useState(null);
   const {auth, setAuth} = useAuth()
   const [,data] = useOutletContext()

    


  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    restaurantId:null,
    courierId:null,
    userId: data?.currentUserId || userID,
    orderId:null,
    sortBy:'DATE',
    orderBy:'DESC'

  })
  

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
   const numberOfPages = orderData?.[0].totalPages


  return (
    <div className="relative">
    
       {auth?.modal> 0 && (
        <OrderModal
          auth={auth}
          setAuth={setAuth}
          orderID={orderID}
          // navigateTo={navigateTo}
          // token={loggedIn}
        />
      )}

       <div className="flex flex-col gap-4">
          <div className="flex flex-col ">
                <p className="font-bold">My Orders</p>
                <OrdersSummary />
            </div>
            <div>

              <MyOrdersTable 
              title={'No Orders Found'}
              list={orderData} 
              totalCount={6} 
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              isLoading={isLoading}
              numberOfPages={numberOfPages}
              isFetchingNextPage={isFetchingNextPage}
              usersHasNextPage={hasNextPage}


              >

                  <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Address
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
              orderData?.[0].results?.map((item, idx) => {
                return (
                  <tr key={idx} className={`${idx % 2 == 0 ? "bg-white" : "bg-gray-50"} `}>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <div className="flex flex-col">
                        <p className="font-light text-sm">{item.orderNumber}</p>
                        <p className="font-light text-xs">{humanDatetime(item.orderDate)}</p>

                      </div>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <div className="flex flex-col">
                        <p className="font-light text-sm">¢{item.totalAmountToPay}</p>
                      </div>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <div className="flex flex-col">
                        <OrderStatus orderStatus={item.status}/>
                      </div>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <div className="flex flex-col">
                       <p className="font-light text-sm">{item.address.street} {item.address.houseNumber}, {item.address.city}</p>
                      </div>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <Button
                        variant="dark"
                        className="px-2 py-1 text-xs rounded-md"
                        onClick={() => {
                          // handleOpenOrderModal();
                          setOrderID(item?.id);
                          setAuth({...auth, modal:true})
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
              </MyOrdersTable>
            </div>
            {/* <Table/> */}
             <div className="grid grid-cols-4 mt-4 gap-4 h-48">
              {/* <EditPassword/>
              <EditAddress/> */}

             </div>
    </div>
    </div>
    
  )
}

export default MyOrders