import PropTypes from "prop-types";
import { GiShoppingCart } from "react-icons/gi";

const Cart = (props) => {
  const { numberOfOrders } = props;
  return (
    <>
      {numberOfOrders > 0 && (
        <div className="relative cursor-pointer">
          <div className="absolute top-0 right-0 bg-red-600 rounded-full text-xs font-bold px-[4px] py-[1px] text-white ">
            {" "}
            {numberOfOrders || 0}
          </div>
          <GiShoppingCart size="40px" />
        </div>
      )}
    </>
  );
};

export default Cart;

Cart.propTypes = {
  numberOfOrders: PropTypes.number
}