import pfp from "../../assets/images/profilephoto.jpeg";
import { IoLocationSharp } from "react-icons/io5";
import { RiContactsBookFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { useParams } from "react-router";
import { useGetSingleUser } from "../../components/brokers/apicalls";
import Loader from "../../components/loaders/Loader";
import PropTypes from 'prop-types';

const ViewUsers = (props) => {
  const { id } = useParams();
  const { isLoading, data: userData, isError, error } = useGetSingleUser(id);

  const data = props?.data || userData;

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

  if (props?.isLoading || isLoading) {
    return <Loader />;
  }


  return (
    <div className="grid grid-cols-4 mt-2 gap-4 h-screen">
      <div className="">
        <img src={pfp} alt="pfp" />
      </div>
      <div className="col-span-2 flex flex-col">
        <div className="flex flex-col gap-2">
          <p className="text-xs italic font-thin">This profile belongs to</p>
          <div className="flex items-center gap-8">
            <p className="text-6xl font-extrabold">
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
  );
};

export default ViewUsers;


ViewUsers.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.object
}