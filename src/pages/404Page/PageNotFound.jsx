import { Link } from 'react-router-dom'
import notfound from '../../assets/images/icons/404-fehler-1.png'
import Button from '../../components/reusableComponents/Button'
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const PageNotFound = () => {
  return (
    <div className=' h-screen p-4'>
      <div className='h-full flex flex-col'>
      <div>
        <p className="text-black font-logo font-extrabold text-3xl">
          dzidzi
        </p>
      </div>
      <div className=' grid grid-cols-3 h-full'>
      <div className=' flex items-center justify-center h-full lg:col-span-2 sm:col-span-3 md:col-span-2 xs:col-span-3'>
          <img src={notfound} alt="" className='lg:w-[400px] sm:w-[200px] md:w-[300px] xs:w-[200px]'/>
      </div>
      <div className=' flex lg:justify-center sm:justify-start md:justify-center xs:justify-start h-full flex-col gap-6 lg:col-span-1 md:col-span-1 sm:col-span-3 xs:col-span-3'>
        <p className='font-extrabold text-5xl'>
          Oops!
        </p>
        <p className='font-bold text-2xl text-gray-400'>
          {`We couldn't find the page`} <br/> you were looking for
        </p>
        <div>
          <Link to={-1}>
            <Button variant='primary' className='px-16 py-3' rounded>
              <div className='flex gap-3 items-center'>
                  <MdOutlineKeyboardBackspace/>
                  <p> Go home</p>
              </div>
           
            </Button>
          </Link>
            
        </div>
      

      </div>
      </div>
      </div>
    </div>
  )
}

export default PageNotFound