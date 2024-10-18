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

          {/* <form onSubmit={handleSubmit(handleAddCredential)}>
            <div className="flex flex-col mb-3">
              <input
                className="border outline-none p-2 text-sm h-[100px]"
                placeholder="dzidzi@dzidzi.com"
                name="email"
                {...register("email")}
              />
            </div>
            <div className="flex justify-center">
              <div className="flex items-center mr-2">
                <Button className="px-8 py-2 w-full bg-green-600 rounded">
                  {isLoading ? (
                    <Spinner color="white" size="15px" />
                  ) : (
                    <p className="font-bold text-base text-white">
                      Add Credential
                    </p>
                  )}
                </Button>
              </div>
              <div className="flex items-center">
                <button
                  className="px-8 py-2 w-full bg-gray-100 rounded border"
                  type="button"
                  onClick={props.handleCancel}
                >
                  <p className="font-bold text-base text-gray-500">Exit</p>
                </button>
              </div>
            </div>
          </form> */}
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
