import { useEffect, useState } from "react";
import { useNavigateTo } from "./useNavigateTo";

export const useAllowLocation = () => {
    const {navigateTo} = useNavigateTo()
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [locationState, setLocationState] = useState(null)

  useEffect(() => {
    
      const  errors = (err) => {

        if (err.code === err.PERMISSION_DENIED) {
         alert('ALLOW LOCATION SERVICES IN SETTINGS')
        } else {
           console.warn(`ERROR(${err.code}): ${err.message}`)
        }


        console.warn(`ERROR(${err.code}): ${err.message}`)
      };
  
      const options =  {
        enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }

      const success =  (pos) => {
        const crd = pos.coords;
        setLatitude(crd.latitude)
        setLongitude(crd.longitude)
      }

      if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation"})
        .then(function (result) {
        setLocationState(result.state)      
          if (result.state === "granted") {
            //If granted then you can directly call your function here

         navigator.geolocation.getCurrentPosition(success, errors, options);          
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
           return navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
             alert('ALLOW LOCATION SERVICES IN SETTINGS')
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
   
  }, [navigateTo, locationState]);




  return {latitude, longitude, locationState}
}
