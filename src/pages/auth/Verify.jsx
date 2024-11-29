import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useLocation } from "react-router";
import { useVerifyUser } from "../../components/brokers/apicalls";
import Spinner from "../../components/loaders/Spinner";
import ErrorOccured from "../../components/notices/ErrorOccured";

const Verify = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const verifyParam = queryParams.get('verificationcode'); // Get the value of "verificationcode"
  const verificationCode = verifyParam.replace(/ /g, '+');

    const {isLoading, isError} = useVerifyUser(verificationCode)

    if(isLoading){
        return <div className="flex flex-col gap-3"> 
            <Spinner size='100px' color='blue'/>
            <p className="text-sm font-light">Give us a few seconds whille we activate your account</p>
            </div>
        
    }

    if(isError){
        return <ErrorOccured title='Oops we were unable to verify your account, check verification code or contact admin'/> 
    }


  return (
    <div className="flex flex-col items-center justify-center gap-3">
         <p className="text-xl">Congrats! from now on your are a part of us</p>
         <IoMdCheckmarkCircleOutline className="text-blue-500 mt-8" size={250}/>
        
       <button
                  className="mt-5 bg-blue-500 px-16 py-4 rounded disabled:bg-gray-200 w-full"
                >
                 
                     <p className='font-bold text-white'>Login</p>
                 
                </button>
    </div>
  )
}

export default Verify