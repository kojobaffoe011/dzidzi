import { BiErrorAlt } from "react-icons/bi"
import PropTypes from "prop-types";


const ErrorOccured = ({title}) => {
  return (
   <div className="flex flex-col gap-3 items-center h-screen justify-center"> 
            <BiErrorAlt  size='100px' className="text-red-600"/>
            <p className="text-sm font-light">{title || 'Oops an error occured'}</p>
            </div>
  )
}

export default ErrorOccured

ErrorOccured.propTypes = {
  title: PropTypes.string
}