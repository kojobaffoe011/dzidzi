import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Success = () => {
  return (
      <div className='flex flex-col'>
        <div className='flex flex-col items-center gap-2'>
            <p className='font-bold text-4xl '>Welcome on board!</p>
            <p className='font-light text-sm'>Check your email and verify your email to continue!</p>

         <IoMdCheckmarkCircleOutline className="text-blue-600 mt-8" size={250}/>
    </div>
    </div>
  )
}

export default Success