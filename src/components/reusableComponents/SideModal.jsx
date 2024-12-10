import { RiCloseLine } from "react-icons/ri";
import useAuth from "../../hooks/useAuth";

const SideModal = ({children, right, top, bottom, left, title, subtext}) => {
    const {auth, setAuth} = useAuth()
  return (
    <div className={`p-4 flex flex-col border h-[1015px] shadow-md absolute ${right ? right : 'right-4'} ${top ? top : 'top-[-0px]'} ${bottom ? bottom : ' bottom-5'} ${left ? left : ' '} w-[450px] z-[15] bg-white shadow-lg  rounded-lg`}>
        <div className="mt-4 flex justify-between items-center border-b">
          <div className="flex flex-col">
            <p className="font-bold text-2xl whitespace-nowrap font-extrabold">
              {auth.open ? auth?.restaurant?.name : title}
            </p>
            <p>
              <p className="text-sm font-light mb-2">{auth.open ? `${auth?.orders && auth.orders.length} item(s)` : subtext} </p>
            </p>
          </div>
          <button
            onClick={() => {
              setAuth({ ...auth, open: false, modal:false });
            }}
          >
            <RiCloseLine size={"20px"} className="cursor-pointer" />
          </button>
        </div>
        {children}

        {auth.modal &&  <div className="absolute bottom-8 right-0 left-0 ">
          <div className="flex w-full justify-between p-2 items-center">
            <p className="font-light text-sm">Confused about something?</p>
            <button className="border text-sm bg-blue-50 text-blue-500 font-bold px-2 py-1 rounded-sm hover:bg-blue-50">
                Contact support
            </button>
          </div>
            
        </div>}
        </div>
  )
}

export default SideModal