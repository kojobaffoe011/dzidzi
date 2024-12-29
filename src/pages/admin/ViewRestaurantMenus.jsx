import { useParams } from "react-router";
import Menus from "./Menus";

const ViewRestaurantMenus = () => {
  const { id } = useParams();
  return (
    <div>
      <Menus id={id} top={"top-[-465px]"} />
    </div>
  );
};

export default ViewRestaurantMenus;
