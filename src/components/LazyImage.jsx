import React from "react";

const LazyImage = ({ src, alt, className }) => {
  return <img src={src} alt={alt} loading="lazy" className={className} />;
};

export default LazyImage;
