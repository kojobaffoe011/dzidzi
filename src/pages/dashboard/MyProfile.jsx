import { Link } from "react-router-dom";
import {
  useGetSingleAdmin,
  useGetSingleCourier,
  useGetSingleRestaurant,
  useGetSingleService,
} from "../../components/brokers/apicalls";
import { useOutletContext } from "react-router";
import Breadcrumbs from "../../components/reusableComponents/Breadcrumbs";
import { RiContactsBookFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import PropTypes from "prop-types";
import user from "../../assets/images/icons/user.png";
import Loader from "../../components/loaders/Loader";
import ErrorOccured from "../../components/notices/ErrorOccured";
import TwoFALogic from "../../components/reusableComponents/TwoFALogic";

const UserBasicDetails = ({ data, user_type }) => {
  const basicDetails = [
    {
      text: `${data?.address?.street} ${data?.address?.houseNumber}, ${data?.address?.city}`,
      icon: <IoLocationSharp />,
      admin: user_type == "ADMIN" ? false : true,
    },
    {
      text: `${data?.contact}`,
      icon: <RiContactsBookFill />,
      admin: user_type == "ADMIN" ? false : true,
    },
    {
      text: `${data?.credential?.email}`,
      icon: <MdEmail />,
      admin: true,
    },
  ];

  return (
    <div className="flex flex-col mt-6 col-span-2">
      <div className="flex flex-col gap-2">
        <p className="text-xs italic font-thin">This profile belongs to</p>

        <div className="flex">
          <img src={user} alt="user" width={200} />
          <div className="flex flex-col">
            <div className="flex items-center gap-8">
              <p className="text-4xl font-extrabold">
                {data?.firstName || data?.name} {data?.lastName || ""}
              </p>
              <span className="text-sm text-gray-400">
                ({data?.credential?.username})
              </span>
            </div>

            <div className="flex flex-col">
              {basicDetails
                .filter((item) => item.admin)
                .map((item, idx) => {
                  return (
                    <div
                      className="flex items-center gap-4 mt-1 text-gray-400"
                      key={idx}
                    >
                      <div>{item.icon}</div>
                      <p className="text-xs">{item.text}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyProfileDetails = () => {
  const [, activeUser] = useOutletContext();
  const { data, isLoading, isError } = useGetSingleCourier(
    activeUser?.currentUserRole == "COURIER" && activeUser?.currentUserId
  );
  const {
    data: serviceData,
    isLoading: isServiceLoading,
    isError: isServiceError,
  } = useGetSingleService(
    activeUser?.currentUserRole == "SERVICE" && activeUser?.currentUserId
  );

  const {
    data: restaurantData,
    isLoading: isRestaurantLoading,
    isError: isRestaurantError,
  } = useGetSingleRestaurant(
    activeUser?.currentUserRole.includes("RESTAURANT") &&
      activeUser?.currentUserId
  );

  const {
    data: adminData,
    isLoading: isAdminLoading,
    isError: isAdminError,
  } = useGetSingleAdmin(
    activeUser?.currentUserRole == "ADMIN" && activeUser?.currentUserId
  );

  const breadcrumbs = [
    {
      text: (active, link = "/dashboard") => {
        return (
          <Link to={link}>
            <p className={active ? "text-black" : "text-gray-300"}>Dashboard</p>
          </Link>
        );
      },
    },
    {
      text: (active, link = "/dashboard/profile") => {
        return (
          <Link to={link}>
            <p className={active ? "text-black font-bold" : "text-gray-300"}>
              Profile
            </p>
          </Link>
        );
      },
    },
  ];

  if (isLoading || isServiceLoading || isRestaurantLoading || isAdminLoading) {
    return <Loader />;
  }
  if (isError || isServiceError || isRestaurantError || isAdminError) {
    return <ErrorOccured />;
  }
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="px-4 pb-4 grid grid-cols-4">
        <div className="col-span-2 grid grid-cols-2 gap-2">
          <UserBasicDetails
            data={data || serviceData || restaurantData || adminData}
            user_type={activeUser?.currentUserRole}
          />
          {/* <div className="flex flex-col gap-2"> */}
          <TwoFALogic
            username={
              data?.credential.username ||
              serviceData?.credential.username ||
              restaurantData?.credential.username ||
              adminData?.credential.username
            }
          />
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default MyProfileDetails;

UserBasicDetails.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.object,
  user_type: PropTypes.string,
};
