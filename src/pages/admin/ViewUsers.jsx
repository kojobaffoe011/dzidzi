import pfp from "../../assets/images/profilephoto.jpeg";
import { IoLocationSharp } from "react-icons/io5";
import { RiContactsBookFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { Outlet, useLocation, useOutletContext, useParams } from "react-router";
import { useGetSingleUser } from "../../components/brokers/apicalls";
import Loader from "../../components/loaders/Loader";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";


const UserBasicDetails = ({data}) => {
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


  return  <div className="col-span-2 flex flex-col">
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
}

const Nav = ({id})=> {
    const {pathname} = useLocation()

  const links = [
    {
      title: 'Orders',
      link: '',
    },
    {
      title: 'Support',
      link: 'support',
    },
    {
      title: 'Settings',
      link: 'settings',
    },
  ]
  return <div className="">
    <div className="grid grid-cols-2">
      <div className=" grid grid-cols-3 p-1 gap-2 rounded-lg bg-gray-100"> 
      {links.map((item,idx)=> {
        return <Link key={idx} to={`/dashboard/users/${id}/${item.link}`}>
          <div  className={`py-3 flex items-center justify-center rounded-lg ${pathname == `/dashboard/users/${id}/${item.link}` ? 'bg-white' : ''} cursor-pointer`}>{item.title}</div>
          </Link>
      })}
      </div>
     
    </div>
  </div>
}

const ViewUsers = (props) => {
  const { id } = useParams();
    const [activeUserLoading, activeUser] = useOutletContext()

  const { isLoading, data: userData, 
    // isError, error
   } = useGetSingleUser(id);

  const data = props?.data || userData;


  if (props?.isLoading || isLoading) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-4 mt-2 gap-4 h-screen">
      <div className="">
        <img src={pfp} alt="pfp" />
      </div>
      <div className="flex flex-col col-span-3 gap-4">
        <UserBasicDetails data={data}/>
        <Nav id={id}/>
        <Outlet context={[activeUserLoading, activeUser]}/>
      </div>
      
    </div>
  );
};

export default ViewUsers;


ViewUsers.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.object
}

UserBasicDetails.propTypes = {
  data: PropTypes.object
}

Nav.propTypes = {
  id: PropTypes.string
}