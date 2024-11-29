import { IoLocationSharp } from "react-icons/io5";
import { RiContactsBookFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import user from '../../../assets/images/icons/user.png'
import balloons from '../../../assets/images/icons/balloons.png'
import confetti from '../../../assets/images/icons/confetti.png'
import { useOutletContext } from "react-router";

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


  return  <div className="col-span-2 flex flex-col mt-6">
        <div className="flex flex-col gap-2">
        
          <p className="text-xs italic font-thin">This profile belongs to</p>

          <div className="flex">
            <img src={user} alt="user" width={200}/>
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
}

const Approved = ()=>{
  return <div className="flex bg-blue-50 border border-blue-100 w-full rounded-lg p-4 justify-between items-center">
    <div className="flex flex-col">
      <p className="font-bold gap.2">{`This user's account was successfully activated`} • <span className="font-light text-sm">9 Nov 2024 at 13:14</span></p>
      <p className="font-light text-xs">{`Activated can enjoy all services without limit`}</p>
    </div>

<div className="flex">
  <img src={balloons} alt="user" width={30}/>
  <img src={confetti} alt="user" width={30}/>
</div>
        
      
  </div>
}

const EditPassword = ()=> {
  return <div className="flex flex-col gap-1 ">
    <p className="font-bold text-xl">Edit Password</p>
     <form action="" className='flex flex-col w-full gap-6'>
              <div className="flex flex-col gap-6 col-span-2">
              <div className="flex flex-col gap-2">
                <div className="w-full flex flex-col gap-1 col-span-2 ">
                  
                   <label className="text-xs font-light text-gray-500">
                    Old Password
                    <span className="text-red-600 text-lg ">*</span>
                    </label>
                  <input
                  //  {...register("email")}
                    className="border outline-none p-4 text-sm border border-black w-full rounded placeholder:text-xs"
                    placeholder="Enter old password here"
                    name="oldpassword"
                    required
                    type="password"
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                   <label className="text-xs font-light text-gray-500">
                    New Password
                    <span className="text-red-600 text-lg ">*</span>
                    </label>
                  <input
                  //  {...register("username")}
                    className="border outline-none p-4 text-sm border border-black w-full rounded placeholder:text-xs"
                    placeholder="Enter your new password here"
                    name="newpassword"
                    required
                    type="password"
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                   <label className="text-xs font-light text-gray-500">
                    Repeat New Password
                    <span className="text-red-600 text-lg ">*</span>
                    </label>
                  <input
                  //  {...register("username")}
                    className="border outline-none p-4 text-sm border border-black w-full rounded placeholder:text-xs"
                    placeholder="Repeat password"
                    name="repeatpass"
                    required
                    type="password"
                  />
                </div>
              </div>



               <div className=" mb-8 w-full flex">
              {" "}
                <button
                  className="mt-5 bg-blue-500 px-16 py-4 rounded disabled:bg-gray-200 w-full"
                  // disabled={isPending || creatingUserPending || dataLoading}
                >
                  {/* {(isPending || creatingUserPending || dataLoading )? (
                    <Spinner color="white" size="20px" />
                  ) : (
                    // <p className="text-white text-sm">Finish</p> */}
                     <p className='font-bold text-white'>Finish</p>
                  {/* )} */}
                 
                </button>
            </div>
            </div>
            </form>
  </div>
 
}

const EditAddress =()=>{
  return  <div className="col-span-2 gap-1 flex flex-col">
     <p className="font-bold text-xl">Edit Address</p>
      <form action="" className='flex flex-col w-full gap-6' >
              <div className="flex flex-col gap-2 col-span-2">
              <div className="grid grid-cols-3 gap-1">
                <div className="w-full flex flex-col gap-1 col-span-2 ">
                  
                   <label className="text-xs font-light text-gray-500">
                    Street Address
                    <span className="text-red-600 text-lg ">*</span>
                    </label>
                  <input
                      // {...register("street")}s
                    className="border outline-none p-4 text-sm border border-black w-full rounded placeholder:text-xs"
                    placeholder="Enter address here"
                    name="street"
                
                    required
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                   <label className="text-xs font-light text-gray-500">
                    House Number
                    <span className="text-red-600 text-lg ">*</span>
                    </label>
                  <input
                  // {...register("houseNumber")}   
                    className="border outline-none p-4 text-sm border border-black w-full rounded placeholder:text-xs"
                    placeholder="Enter apt number here"
                    name="houseNumber"
                    
                    required
                  />
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-1">
                <div className="flex flex-col gap-1">
                   <label className="text-xs font-light text-gray-500">
                    City
                    <span className="text-red-600 text-lg ">*</span>
                    </label>
                  <input
                  //  {...register("city")}
                    className="border outline-none p-4 text-sm border border-black w-full rounded placeholder:text-xs"
                    placeholder="Enter Apartment Number"
                    name="city"
                   
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-light text-gray-500">
                    Zip Code
                    <span className="text-red-600 text-lg ">*</span>
                    </label>
                  <input
                  // {...register("zip")}
                    className="border outline-none p-4 text-sm border border-black w-full rounded placeholder:text-xs"
                    placeholder="Enter Apartment Number"
                    name="zip"
                    required
                    type="number"
                  />
                </div>
              </div>
            </div>


               <div className=" mb-8 w-full flex">
              {" "}
                <button
                  className="mt-5 bg-blue-500 px-16 py-4 rounded disabled:bg-gray-200 w-full"
                  //   type="button"
                  // disabled={true}
                >
                  {/* {cardLoading ? (
                    <Spinner color="white" size="20px" />
                  ) : (
                    <p className="text-white text-sm">Finish</p>
                  )} */}
                  <p className='font-bold text-white'>Finish</p>
                </button>
            </div>
            </form>
  </div>

}

const General = () => {
    const [data] =useOutletContext()
  return (
    <div>
          <div className="flex flex-col">
                <p className="font-bold">General</p>
                <UserBasicDetails data={data}/>
            </div>
            <Approved/>
             <div className="grid grid-cols-4 mt-4 gap-4">
              <EditPassword/>
              <EditAddress/>

             </div>
    </div>
  )
}

export default General