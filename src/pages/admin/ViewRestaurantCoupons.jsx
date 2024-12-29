import { useParams } from "react-router";
// import Menus from "./Menus";
import Coupons from "./Coupons";

const ViewRestaurantCoupons = () => {
  const { id } = useParams();
  return (
    <div>
      <Coupons id={id} top={"top-[-465px]"} />
    </div>
  );
};

export default ViewRestaurantCoupons;
