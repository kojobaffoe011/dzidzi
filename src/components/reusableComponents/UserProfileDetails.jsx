import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RiContactsBookFill } from "react-icons/ri";
import user from "../../assets/images/icons/user.png";
import balloons from "../../assets/images/icons/balloons.png";
import confetti from "../../assets/images/icons/confetti.png";
import PropTypes from "prop-types";

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
    <div className="col-span-2 flex flex-col mt-6">
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

const Approved = () => {
  return (
    <div className="flex bg-blue-50 border border-blue-100 w-full rounded-lg p-4 justify-between items-center">
      <div className="flex flex-col">
        <p className="font-bold gap.2">
          {`This user's account was successfully activated`} •{" "}
          <span className="font-light text-sm">9 Nov 2024 at 13:14</span>
        </p>
        <p className="font-light text-xs">{`Activated can enjoy all services without limit`}</p>
      </div>

      <div className="flex">
        <img src={balloons} alt="user" width={30} />
        <img src={confetti} alt="user" width={30} />
      </div>
    </div>
  );
};

const UserProfileDetails = ({ data }) => {
  return (
    <>
      <div className="flex flex-col">
        <p className="font-bold">General</p>
        <UserBasicDetails data={data} />
      </div>
      <Approved />
    </>
  );
};

export default UserProfileDetails;

UserBasicDetails.propTypes = {
  data: PropTypes.object,
};
UserProfileDetails.propTypes = {
  data: PropTypes.object,
};
