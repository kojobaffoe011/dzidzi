import { useParams } from "react-router";
import RestaurantBranches from "./RestaurantBranches";

const ViewRestaurantBranches = () => {
  const { id } = useParams();
  return (
    <div>
      <RestaurantBranches id={id} top={"top-[-500px]"} />
    </div>
  );
};

export default ViewRestaurantBranches;
