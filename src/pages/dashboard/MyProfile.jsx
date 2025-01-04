import { Link } from "react-router-dom";
import { useGetSingleCourier } from "../../components/brokers/apicalls";
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

const UserBasicDetails = ({ data }) => {
  const basicDetails = [
    {
      text: `${data?.address?.street} ${data?.address?.houseNumber}, ${data?.address?.city}`,
      icon: <IoLocationSharp />,
    },
    {
      text: `${data?.contact}`,
      icon: <RiContactsBookFill />,
    },
    {
      text: `${data?.credential?.email}`,
      icon: <MdEmail />,
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
                {data?.firstName} {data?.lastName}
              </p>
              <span className="text-sm text-gray-400">
                ({data?.credential?.username})
              </span>
            </div>

            <div className="flex flex-col">
              {basicDetails.map((item, idx) => {
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
  // const USER_ROLES_AND_FETCHES = {
  //   user: "COURIER",
  //   endpoint:
  // };

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

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <ErrorOccured />;
  }
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="px-4 pb-4 grid grid-cols-4">
        <div className="col-span-2 grid grid-cols-2 gap-2">
          <UserBasicDetails data={data} />
          {/* <div className="flex flex-col gap-2"> */}
          <TwoFALogic username={data?.credential.username} />
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
};
