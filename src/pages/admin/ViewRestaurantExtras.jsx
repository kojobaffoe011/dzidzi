import { useParams } from "react-router";
import Extras from "./Extras";

const ViewRestaurantExtras = () => {
  const { id } = useParams();
  return (
    <div>
      <Extras id={id} top={"top-[-465px]"} />
    </div>
  );
};

export default ViewRestaurantExtras;
