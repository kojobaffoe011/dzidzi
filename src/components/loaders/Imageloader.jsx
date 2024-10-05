import { useEffect, useState } from "react";
import { useGetImage } from "../brokers/apicalls";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';



const Imageloader = ({imageID}) => {


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




  return (
    <div> 
        {imageLoading ? (
              <Spinner size="30px" />
            ) : (
              <img src={imageSrc} alt="img" width="300"/>
            )}
    </div>
  )
}

export default Imageloader

Imageloader.propTypes = {
  imageID: PropTypes.string.isRequired,
}

