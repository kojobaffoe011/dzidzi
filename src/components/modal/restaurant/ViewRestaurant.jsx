import { Modal } from "../modal";
import Spinner from "../../loaders/Spinner";
import RestaurantDescription from "../../reusableComponents/RestaurantDescription";
import PropTypes from "prop-types";

const ViewRestaurant = (props) => {
  const { restaurantData, restaurantLoading } = props;

  if (restaurantLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
      <Modal {...props}>
        <div className="p-2 flex flex-col">
          <RestaurantDescription
            name={restaurantData?.name}
            rating={restaurantData?.averageRating}
            type="modal"
          />
        </div>
      </Modal>
  );
};

export default ViewRestaurant;

ViewRestaurant.propTypes = {
  handleCancel: PropTypes.func,
  userRole: PropTypes.string,
  restaurantID: PropTypes.string, 
  restaurantData: PropTypes.object,
  restaurantLoading: PropTypes.bool
}
