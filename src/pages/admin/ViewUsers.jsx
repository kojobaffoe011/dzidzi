import { useGetSingleUser } from "../../components/brokers/apicalls";
import Loader from "../../components/loaders/Loader";
import PropTypes from "prop-types";
import UserProfileDetails from "../../components/reusableComponents/UserProfileDetails";
import { useParams } from "react-router";
import MyOrders from "../main/userprofile/MyOrders";
import { position } from "../../utils/config";

const ViewUsers = ({ data }) => {
  const { id } = useParams();
  // const [activeUserLoading, activeUser] = useOutletContext();

  const {
    isLoading,
    data: userData,
    // isError, error
  } = useGetSingleUser(id);

  if (isLoading) {
    return <Loader />;
  }

  let userDetails = data || userData;

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3 my-8">
        <UserProfileDetails data={userDetails} />
        <div className="my-4">
          <MyOrders userID={id} position={position} />
        </div>
      </div>
    </div>
  );
};

export default ViewUsers;

ViewUsers.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.object,
};
