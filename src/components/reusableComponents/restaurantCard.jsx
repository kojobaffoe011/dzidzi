import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import PropTypes from "prop-types";
import Spinner from "../loaders/Spinner";
import { shuffle } from "../../utils/config";
import { useMemo } from "react";
// import cuisine from '../../assets/images/cuisine.webp'
// import ramen from '../../assets/images/ramen.webp'
// import pizza from '../../assets/images/pizza.webp'
// import burger from '../../assets/images/burger.webp'

function RestaurantCard({ title, showDelivery, pages }) {
  const { pathname } = useLocation();

  const ratings = useMemo(()=> shuffle([4.2, 3.9, 4.1, 3.8]), [])
  const restaurantpics = useMemo(()=> shuffle(['bg-burger-bg','bg-ramen-bg', 'bg-pizza-bg', 'bg-cuisine-bg']), [])
  const pagesshuffled = useMemo(()=> shuffle(pages?.data), [])



  return (
    <div className="pb-6">
      <div className="flex justify-between items-center gap-4 p-2">
        <h1 className="text-2xl font-extrabold"> {title} </h1>
      
      </div>
      <div className="grid grid-cols-4 gap-2 ">
        {pagesshuffled?.map((item, idx) => {
          return (
            <div className="flex flex-col w-full gap-2" key={idx}>
              <Link
                to={
                  pathname.includes(`details/menu`)
                    ? "/details/revieworder"
                    : `/details/menu/${item?.id}`
                }
              >
                <div className={`h-[160px] rounded-lg ${restaurantpics[idx]} bg-cover bg-no-repeat bg-center`}></div>
              </Link>
              <div className="flex flex-col">
                 <div className=" flex justify-between items-center mt-1">
                <p className="text-md font-bold">{item.name}</p>
                {showDelivery && (
                  <div className="bg-gray-100 px-2 py-1 rounded-full">
                    <p className="text-xs font-bold">{item.averageRating == 0 ? ratings[idx] : item.averageRating == 0}</p>
                  </div> 
                )}
              </div>
                <div className="flex text-sm">
                <>
                  {/* <p className="mr-1">{item.deliveryfee}</p> */}
                  {showDelivery && (
                    <p className="whitespace-nowrap text-xs text-gray-400">
                      {item.address?.street}{" "}
                      {item.address?.houseNumber},{" "}
                      {item.address?.city}
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
             
              
            </div>
          );
        })}
      </div>

           {pages.restaurantsHasNextPage && (
          <div className="flex justify-center my-4">
            <button
              className="border border-gray-500 px-8 py-2 bg-gray-100 font-bold rounded hover:bg-gray-200"
              onClick={() => {
                pages.restaurantsFetchNextPage();
              }}
            >
              {pages.restaurantsFetchingNextPage ? (
                <Spinner color="blue" size="20px" />
              ) : (
                <p className="text-xs">Load more</p>
              )}
            </button>
          </div>
        )}
    </div>
  );
}
export default RestaurantCard;


RestaurantCard.propTypes = {
  title: PropTypes.string, 
  pages: PropTypes.object,
  showDelivery: PropTypes.bool, 
  isLoading: PropTypes.bool

}