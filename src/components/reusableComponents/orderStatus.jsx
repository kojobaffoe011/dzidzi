import PropTypes from "prop-types";

const OrderStatus = ({ orderStatus }) => {
  const renderStatus = (orderStatus) => {
    let className = "",
      text = "";

    if (orderStatus == "PENDING") {
      className = "bg-yellow-100 text-yellow-500";
      text = "PENDING";
    }

    if (orderStatus == "ACCEPTED") {
      className = "bg-green-100 text-green-500";
      text = "ACCEPTED";
    }

    if (orderStatus == "CANCELLED") {
      className = "bg-red-100 text-red-500";
      text = "CANCELLED";
    }

    if (orderStatus == "AWAITING_PICKUP") {
      className = "bg-blue-100 text-blue-500";
      text = "AWAITING PICKUP";
    }

    if (orderStatus == "DELIVERED") {
      className = "bg-purple-100 text-purple-500";
      text = "DELIVERED";
    }

    if (orderStatus == "READY_FOR_DELIVERY") {
      className = "bg-zinc-100 text-zinc-500";
      text = "READY FOR DELIVERY";
    }

    return (
      <div className="flex">
        <div
          className={`font-bold rounded-full text-xs px-3 py-1 ${className}`}
        >
          <p className=" uppercase">{text}</p>
        </div>
      </div>
    );
  };
  return <div>{renderStatus(orderStatus)}</div>;
};

export default OrderStatus;

OrderStatus.propTypes = {
  orderStatus: PropTypes.string,
};
