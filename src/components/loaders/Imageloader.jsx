import { useEffect, useState } from "react";
import { useGetImage } from "../brokers/apicalls";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';



const Imageloader = ({imageID, classNames}) => {

     const [imageSrc, setImageSrc] = useState('')
 const {
    isLoading: imageLoading,
    data: imageBlob,
    // isError: isImageError,
    // error: imageError,
  } = useGetImage(imageID);

     useEffect(() => {
  if (imageBlob) {
    const url = URL.createObjectURL(imageBlob);
    setImageSrc(url);

    // Clean up the URL when the component is unmounted or the Blob changes
    return () => {
      URL.revokeObjectURL(url);
    };
  }
}, [imageBlob]);

if(!imageBlob){
  return <div className="bg-black w-full h-full">a</div>
}

  return (
    <div> 
        {imageLoading ? (
              <Spinner size='100px' />
            ) : (
              <img src={imageSrc} 
               className={`${classNames}`}/>
            )}
    </div>
  )
}

export default Imageloader

Imageloader.propTypes = {
  imageID: PropTypes.string,
  classNames: PropTypes.string
}

