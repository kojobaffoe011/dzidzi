import PropTypes from 'prop-types'
import { useAllowLocation } from '../../hooks/useAllowLocation'
import Button from '../Button'

const CheckLocationStatus = ({children}) => {
  const { locationState} = useAllowLocation()
  return (
    <>
      {
        locationState == 'granted' ? 
        <div>{children}</div>
        : <div className='flex flex-col justify-center items-center h-screen'>
          allow location to continue
          <Button className='text-xs p-4 py-2 rounded-md' variant='primary'>Continue</Button>
          </div>
      }

    </>
  )
}

export default CheckLocationStatus


CheckLocationStatus.propTypes = {
    children: PropTypes.node
}