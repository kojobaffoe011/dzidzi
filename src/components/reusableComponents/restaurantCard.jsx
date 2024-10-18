import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import DzidziLoader from "../loaders/DzidziLoader";
import PropTypes from "prop-types";

function RestaurantCard({ title, data, showDelivery, isLoading }) {
  const { pathname } = useLocation();

  if(isLoading){
    return <DzidziLoader/>
  }
  return (
    <div className="pb-6">
      <div className="flex justify-between items-center gap-4 p-2">
        <h1 className="text-2xl font-extrabold"> {title} </h1>
        {/* <div className="flex justify-between items-center gap-4 text-sm">
          <h1 className="mr-4">See all</h1>
          <div className="flex justify-between items-center gap-4">
            <BsArrowLeft />
            <BsArrowRight />
          </div>
        </div> */}
      </div>
      <div className="grid grid-cols-4 gap-2 ">
        {data?.map((item, idx) => {
          return (
            <div className="flex flex-col w-full " key={idx}>
              <Link
                to={
                  pathname.includes(`details/menu`)
                    ? "/details/revieworder"
                    : `/details/menu/${item?.value.id}`
                }
              >
                <div className="h-[140px] rounded-xl bg-rest-bg bg-cover bg-no-repeat bg-center"></div>
              </Link>
              <div className=" flex justify-between items-center mt-1">
                <p className="text-md font-bold">{item.value.name}</p>
                {showDelivery && (
                  <p className="text-xs">{item.value.averageRating}</p>
                )}
              </div>
              <div className="flex text-sm">
                <>
                  {/* <p className="mr-1">{item.deliveryfee}</p> */}
                  {showDelivery && (
                    <p className="whitespace-nowrap text-xs text-gray-400">
                      {item.value.address?.street}{" "}
                      {item.value.address?.houseNumber},{" "}
                      {item.value.address?.city}
                    </p>
                  )}
                </>

                {/* {showDelivery && (
                  <>
                    <p className="mx-1">•</p>
                    <p className="mr-1 text-gray-500">{item.deliverytime}</p>
                  </>
                )} */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default RestaurantCard;


RestaurantCard.propTypes = {
  title: PropTypes.string, 
  data: PropTypes.string,
  showDelivery: PropTypes.bool, 
  isLoading: PropTypes.bool

}