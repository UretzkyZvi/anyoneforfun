import React, { FC, useRef, useState } from "react";
import Image from "next/image";

interface FallbackImageProps {
  src: string;
  fallbackSrc: string;
  alt: string;
  onImageLoaded?: () => void;
}

const FallbackImage: FC<FallbackImageProps> = ({
  src,
  fallbackSrc,
  alt,
  onImageLoaded,
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [showFallback, setShowFallback] = useState(false);
 
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (currentSrc !== fallbackSrc) {
      setShowFallback(true);
    }
  };

  return (
    <>
      {showFallback ? (
        <Image
          src={fallbackSrc}
          alt={alt}
          fill
          className="rounded-md object-cover "
          onError={(e) => handleError(e)}
        
        />
      ) : (
        <Image
          src={currentSrc}
          alt={alt}
          fill
          className="rounded-md object-cover"
          onError={(e) => handleError(e)}
 
        />
      )}
    </>
  );
};
export default FallbackImage;
