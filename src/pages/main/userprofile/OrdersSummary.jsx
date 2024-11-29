import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RiContactsBookFill } from "react-icons/ri";

const OrdersSummary = () => {
    const ordersum = [
    {
      text: `Total Orders`,
      icon: (className) =><IoLocationSharp className={className}/>,
      count: 6,
      color:'blue'
    },
    {
      text: `Pending Orders`,
      icon: (className) =><RiContactsBookFill className={className}/>,
      count: 5,
      color:'orange'
    },
    {
      text: `Cancelled Orders`,
      icon:(className) => <MdEmail className={className}/>,
       count: 0,
      color:'red'
    },
    {
      text: `Delivered Safely`,
      icon: (className) =><MdEmail className={className}/>,
       count: 0,
      color:'green'
    },
  ];

  return  <div className="col-span-2 flex flex-col mt-6">
        <div className="flex flex-col gap-2">
        
          <p className="text-xs italic font-thin">{`This users's order summary looks like this`}</p>


            <div className="grid-cols-4 grid gap-2">
              {ordersum.map((item,idx)=>{
               return <div key={idx} className={` border ${`border-${item.color}-500`} rounded-lg p-4 flex gap-4 items-center`}>
                <div className={`p-3 border ${`border-${item.color}-500`} rounded`}>{item.icon('text-gray-600')}</div>
                <div className="flex flex-col">
                  <p className="text-gray-600 font-light">{item.text}</p>
                  <p className={`text-gray-600 font-bold text-2xl ${`text-${item.color}-500`}`}>{item.count}</p>
                </div>
               </div>
              })}
            </div>
        </div>
      </div>
}

export default OrdersSummary