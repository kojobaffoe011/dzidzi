import PropTypes from "prop-types";


const OrderStatus = ({orderStatus}) => {

const renderStatus = (orderStatus) => {
  let className  = '';

  if(orderStatus == 'PENDING'){
   className = 'bg-yellow-100 text-yellow-900'
  } 

  if(orderStatus == 'ACCEPTED'){
   className = 'bg-green-200 text-green-900'
  }

  if(orderStatus == 'CANCELLED'){
   className = 'bg-red-200 text-red-900'
  }


    return <span className={`py-2 px-4 text-xs uppercase tracking-wider rounded-lg bg-opacity-50 font-extrabold ${className}`}>
              {orderStatus}
           </span>
}
  return (
    <div>{renderStatus(orderStatus)}</div>
  )
}

export default OrderStatus

OrderStatus.propTypes = {
    orderStatus: PropTypes.string.isRequired,
}


