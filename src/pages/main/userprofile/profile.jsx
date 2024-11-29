import { TbSettings } from "react-icons/tb"
import { Outlet, useLocation } from "react-router"
import { useGetActiveUser, useGetActiveUserDetails } from "../../../components/brokers/apicalls"
import DzidziLoader from "../../../components/loaders/DzidziLoader"
import { Link } from "react-router-dom"
import ErrorOccured from "../../../components/notices/ErrorOccured"



const tabs = [
    {
    name: 'General',
    link: ''
    },
    {
    name: 'My Orders',
    link: 'orders'
    },
    {
    name: 'Support',
    link: 'support'
    },
]


const Profile = () => {
  const {data: userDetails, isLoading: userDetailsLoading, isError: userError} = useGetActiveUser()
  const {data, isLoading, isError} = useGetActiveUserDetails(userDetails?.currentUserId)
  const {pathname} = useLocation()

if(isLoading || userDetailsLoading){
    return <DzidziLoader/>
}

  if(isError || userError){
        return <ErrorOccured/>
    }


  return (
    <div className="grid grid-cols-5 gap-3">
        <div className="flex flex-col gap-1 p-2">
           <div className="flex gap-1 items-center font-light mb-4">
             <TbSettings size={23}/>
             <p className="text-sm">Settings</p>
           </div>
           <div className="flex flex-col gap-3">
             {
            tabs.map((item, idx)=>{
                const isActive =  (item.name == 'General' && pathname == `/details/user-profile`) || pathname == `/details/user-profile/${item.link}`
                return <Link  key={idx} to={`/details/user-profile/${item.link}`}>
                <div className="cursor-pointer">
                    <div className={`${
                            isActive ? 'bg-blue-100 text-blue-600 font-bold' : 'bg-gray-50 hover:bg-gray-100'
                          } px-6 py-3  rounded-sm`}>
                        <p className="text-sm">{item.name}</p>
                    </div>
                </div></Link> 
            })
           }
           </div>
          
        </div>
        <div className="col-span-4 flex flex-col p-2 gap-4">
          
            <Outlet context={[data, userDetails]}/>
        </div>

    </div>
  )
}

export default Profile