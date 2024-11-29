import { useEffect, useMemo, useState } from "react";
import { useGetImage } from "../brokers/apicalls";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import food1 from '../../assets/images/food1.png'
import food2 from '../../assets/images/food2.png'
import food3 from '../../assets/images/food3.png'
import { shuffle } from "../../utils/config";


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


  // Memoize a random fallback image to avoid reshuffling on every render
  const fallbackImage = useMemo(() => shuffle([food1, food2, food3])[0], []);

  if (!imageBlob) {
    return <img src={fallbackImage} alt="Fallback food image" className={classNames} />;
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

