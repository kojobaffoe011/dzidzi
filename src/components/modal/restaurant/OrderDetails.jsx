import PropTypes from "prop-types";
import { Modal } from "../modal";
import OrderStatus from "../../reusableComponents/orderStatus";
import { useGetOrderItemsByOrderID, useGetSingleOrder, useUpdateOrderStaus } from "../../brokers/apicalls";
import { FaLocationArrow, FaMotorcycle, FaPhone, FaUserTie } from "react-icons/fa6";
import Spinner from "../../loaders/Spinner";
import { humanDatetime, toFixedDeciimal } from "../../../utils/config";
import Select from 'react-select';
import { RiTimerLine } from "react-icons/ri";
// import Button from "../../Button";
import { useMutation } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../../toast/Toast";
import { useState } from "react";
import { useLocation, useOutletContext } from "react-router";
import NoRecord from "../../notices/NoRecord";
import Button from "../../reusableComponents/Button";



const options=[ 
  {value: 'PENDING', label: 'PENDING', color: '#713f12'},
  {value: 'ACCEPTED', label: 'ACCEPTED', color: ' green'},
  {value: 'AWAITING_PICKUP', label: 'AWAITING PICKUP', color: ' blue'},
  {value: 'READY_FOR_DELIVERY', label: 'READY FOR DELIVERY', color: ' gray'},
  {value: 'DELIVERED', label: 'DELIVERED', color: ' purple'},
  {value: 'CANCELLED', label: 'CANCELLED', color: ' red'},

]

const dot = (color = 'transparent') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colorStyles = {
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
}
const ChangeOrderStatus = ({orderStatus, orderID, props})=>{
  const [selectedOption, setSelectedOption] = useState(null)

  const {mutationFn} = useUpdateOrderStaus(orderID, selectedOption)



  const {mutate, isPending,} = useMutation({
    mutationKey: ['updateOrder', orderID, selectedOption],
    mutationFn,
    onSuccess: ()=> {
      showSuccessToast('Order updated successfully')
      props.handleCancel()

    },
    onError: (error)=>{
      showErrorToast(error.message)
    }

  })

  const updateOrder = ()=> {
   return mutate({})

  }

  return <div className="grid grid-cols-3 gap-2">
    <div className="col-span-2">
          <Select
    defaultValue={options.find((item)=> item.value == orderStatus)}
     options ={options}
    onChange={(item)=> setSelectedOption(item.value)}
    styles={colorStyles}
  />
    </div>

  <Button onClick={updateOrder} variant="success"  className="h-[40px]" rounded>
    {isPending ? <Spinner color='white' size='20px'/> :    <p>Update status</p>}
 
    
    </Button>

  </div>

}

  const OrderItems = ({orderItems, isError, isLoading})=> {
    return <>
    { orderItems?.length > 0 ? <div className="flex flex-col mt-6">
              <p className="font-bold text-xl">Order Items</p>
               <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider "
              >
                Item
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
              >
                 QUANTITY
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
              >
                PRICE
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
              orderItems?.map((item, idx) => {
                const itemPrice = item?.quantity * (item?.menu ?  item.menu.price : item.extra.price )
                return (
                  <tr key={idx}>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <div className="flex flex-col">
                        {item?.menu ? item.menu.name : item.extra.name }
                      </div>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-right">
                      {item?.quantity}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-right">
                      {toFixedDeciimal(itemPrice,2)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
               </table>
            </div> : <NoRecord title="No Items found"/> }
      
      </>
     
}


const OrderDetails = (props) => {
  const [, activeUser] = useOutletContext()

  

  const { orderID } = props
  const {pathname} =useLocation()

  const { data, isLoading } = useGetSingleOrder(orderID)
  const { data: orderItems, isLoading: orderItemsLoading, isError } = useGetOrderItemsByOrderID(orderID)

  return (
      <Modal {...props}>
        <>
          {isLoading || orderItemsLoading ? (
            <div className="p-5">
              <Spinner color="black" size="90px" />
            </div>
          ) : (

             <div className="p-4 flex flex-col w-full gap-6">
            <div className="grid grid-cols-3  gap-6 w-full">
              <div className="flex"> 
                <div className="flex justify-center items-center gap-2"> 
                  <div className="flex flex-col">
                     <p className="text-2xl font-bold">
                      Order: <span className="text-blue-600 font-light">#{data?.orderNumber}</span> 
                      </p>
                 <OrderStatus orderStatus={data?.status} />

                  </div>
               

              </div>
            </div>
             {/* //'hidden' : ' */}
             <div className={`col-span-2 ${activeUser?.currentUserRole == ('RESTAURANT_ADMIN' || 'COURIER')}`}>
                 <ChangeOrderStatus orderStatus={data?.status} orderID={orderID} props={props}/>

             </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-md text-gray-500">Ordered by</p>
                <div className="flex items-center gap-2 text-sm">
                  <FaUserTie size={'20px'} className="text-gray-500"/>
                  <p className="font-bold">{data?.user.firstName} {data?.user.lastName}</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaPhone size={'20px'} className="text-gray-500"/>
                  <p className="font-bold" onClick={()=> window.open('tel:' + data?.user.contact)}>{data?.user.contact}</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <RiTimerLine size={'20px'} className="text-gray-500"/>
                 <p className="text-3xl font-extrabold text-sm text-gray-500">{humanDatetime(data?.orderDate)}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-md text-gray-500">Delivery Address</p>
                <div className="flex items-center gap-2 text-sm">
                  <FaLocationArrow size={'20px'} className="text-gray-500"/>
                  <p className="font-bold">{data?.address.street} {data?.address.houseNumber},</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-[20px]"/>
                  <p className="font-bold">{data?.address.city}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-md text-gray-500">Courier</p>
                <div className="flex items-center gap-2 text-sm">
                  <FaMotorcycle size={'20px'} className="text-gray-500"/>
                  <p className="font-bold">{data?.user.firstName} {data?.user.lastName}</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaPhone size={'20px'} className="text-gray-500"/>
                  <p className="font-bold" onClick={()=> window.open('tel:' + data?.user.contact)}>{data?.user.contact}</p>
                </div>
              </div>
            </div>

            <OrderItems orderItems={orderItems} isError={isError} isLoading={orderItemsLoading} />

              <div className="grid grid-cols-3 gap-2">
                  <div className="font-bold text-xl">Total Amount</div>
                  <div/>
                   <div className="font-bold text-xl flex justify-end">{data?.totalOrderPrice}</div>
              </div>

            
            </div>

       ) }
       </>
      </Modal>
  );
};

export default OrderDetails;


OrderDetails.propTypes = {
  handleCancel: PropTypes.func,
  isOpen: PropTypes.bool,
  orderID: PropTypes.string
}
OrderItems.propTypes = {
  orderItems: PropTypes.array,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool,
}
ChangeOrderStatus.propTypes = {
  orderStatus: PropTypes.string,
  orderID: PropTypes.string
}