import { useState } from "react";
import RestaurantCard from "./restaurantCard";
import MenuDetails from "./menuDetails";
import { useRestaurantList } from "../brokers/apicalls";
import DzidziLoader from "../loaders/DzidziLoader";
import { useAllowLocation } from "../../hooks/useAllowLocation";
import { useCategoryList } from "../../hooks/useCategoryList";
import Promo from "./Promo";
import ErrorOccured from "../notices/ErrorOccured";

export const filters = [
  "Sort",
  "From Dzidzi",
  "Price",
  "Delivery Fee",
  "Dietary",
];
export const products = [
  {
    images: "  ",
    name: "Koo Eatery",
    rating: 4.7,
    deliveryfee: "$0.5",
    deliverytime: "25-40 min",
  },
  {
    images: "  ",
    name: "Koo Eatery",
    rating: 4.7,
    deliveryfee: "$0.5",
    deliverytime: "25-40 min",
  },
  {
    images: "  ",
    name: "Koo Eatery",
    rating: 4.7,
    deliveryfee: "$0.5",
    deliverytime: "25-40 min",
  },
  {
    images: "  ",
    name: "Koo Eatery",
    rating: 4.7,
    deliveryfee: "$0.5",
    deliverytime: "25-40 min",
  },
];





function Categories() {
  const { categories } = useCategoryList()
  return (
    <div className=" overflow-x-scroll">
      <div className="pl-16 flex justify-center gap-4 ">
      {categories.map((item, idx) => {
        return (
          <div className="flex flex-col items-center justify-center"  key={idx} >
            <div className=" p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer h-12 w-12">
              {" "}
              <img src={item.icon} alt="icon" width="40px" className=""/>
            </div>
            <p className="font-bold text-xs"> {item.name}</p>
          </div>
        );
      })}
       </div>
    </div>
  );
}



// function Promo() {

// const promo = [
//   {
//     text:  <p className="font-logo font-extrabold text-5xl text-white">
//                     dzidzi <span className="">riders</span>
//                   </p>,
//     subtext: 'fast and accurate',
//     image: rider,
//     color: 'blue',
//     lighting: true


//   },
//   {
//     text:  <p className="font-logo font-extrabold text-5xl text-white">
//                     dzidzi <span className="">foods</span>
//                   </p>,
//     subtext: 'why choose us?',
//     image: cerified,
//     color: 'red',
//     lighting: false


//   },
// ]

//   return (
//     <div className="grid grid-cols-2 py-4 gap-6">
//       {promo.map((i,id)=> {
//         return (
//            <div className="w-full gap-2 " key={id}>
            
//               <div className={`h-[200px] rounded-xl bg-${i.color}-300 grid grid-cols-5 p-2 z-[2]`}>
//               <img src={i.image} alt="" width='240' className="col-span-2"/>
//               <div className="col-span-3 flex flex-col justify-end h-[180px] relative">
//                {i.lighting && <div className="absolute z-[1] top-[-22px] right-12 from-transparent"><img src={lighting} alt="" width={250} className=""/>
//                 </div> } 
//                 <div className="flex flex-col gap-2 font-bold text-3xl absolute z-[2]">
//                   <p className="font-fast text-white text-4xl">{i.subtext}</p>
//                   {i.text}
//                 </div>
                 
//               </div>
//               </div>
//             </div>
//         )
//       })}
           
//     </div>
//   );
// }

function DetailsMain() {
  // const {latitude, longitude} = useAllowLocation()

   const [filters, setFilters] = useState({
    name: null,
    rating: null,
    distance: 5, 
    latitude: null, 
    longitude: null,
    sortBy: null, 
    orderBy: null

  });

  const {
    data: restaurantsList = [],
    isLoading: restaurantsLoading,
    hasNextPage: restaurantsHasNextPage,
    fetchNextPage: restaurantsFetchNextPage,
    isFetchingNextPage: restaurantsFetchingNextPage,
    isError: isRestaurantsError,
    error: restaurantsError
  } = useRestaurantList(filters.name, filters.rating, filters.distance, filters.latitude, filters.longitude, filters.sortBy, filters.orderBy);

  let pages = restaurantsList?.pages?.flatMap((page) => page?.results);

  if(isRestaurantsError){
    if(restaurantsError.message.includes('timeout')){
      return <div className="">
        <ErrorOccured title={'Connection Timed out'}/>
      </div>
    }
    return <ErrorOccured/>
  }

  // useEffect(()=> {
  //   setFilters({...filters, latitude, longitude})
  // }, [latitude, longitude])


  if(restaurantsLoading){
    return <DzidziLoader/>
  }

  return (
    <div className="flex flex-col gap-4">
      <Categories />
      <Promo />
      <MenuDetails isRestaurantPage={true} filters={filters}>
        
        <div className="mt-8">
          <RestaurantCard
       
          showDelivery={true}
          title="Popular Near Me"
          pages={
            {data: pages,
              restaurantsHasNextPage,
              restaurantsFetchNextPage,
              restaurantsFetchingNextPage
            }
          }
        />
          <RestaurantCard
       
          showDelivery={true}
          title="Most Liked"
          pages={
            {data: pages,
              restaurantsHasNextPage,
              restaurantsFetchNextPage,
              restaurantsFetchingNextPage
            }
          }
        />
          <RestaurantCard
       
          showDelivery={true}
          title="People Also Like"
          pages={
            {data: pages,
              restaurantsHasNextPage,
              restaurantsFetchNextPage,
              restaurantsFetchingNextPage
            }
          }
        />
          <RestaurantCard
       
          showDelivery={true}
          title="Today's Pick"
          pages={
            {data: pages,
              restaurantsHasNextPage,
              restaurantsFetchNextPage,
              restaurantsFetchingNextPage
            }
          }
        />
        </div>
        
   
      </MenuDetails>
    </div>
  );
}
export default DetailsMain;
