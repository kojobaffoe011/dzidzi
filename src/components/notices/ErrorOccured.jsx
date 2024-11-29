import { BiErrorAlt } from "react-icons/bi"

const ErrorOccured = ({title}) => {
  return (
   <div className="flex flex-col gap-3 items-center"> 
            <BiErrorAlt  size='100px' className="text-red-600"/>
            <p className="text-sm font-light">{title || 'Oops an error occured'}</p>
            </div>
  )
}

export default ErrorOccured