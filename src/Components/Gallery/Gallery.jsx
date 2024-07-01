import React, { useState } from 'react';
import './Gallery.scss';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

function Gallery({ galleryImages = [] }) {
  const [imageIndex, setImageIndex] = useState(0);

  const nextSlide = () => {
    setImageIndex((prevIndex) => {
      if (prevIndex + 1 < galleryImages.length) return prevIndex + 1; // return next image
      else return 0; // return first image
    });
  }

  const prevSlide = () => {
    setImageIndex((prevIndex) => {
      if (prevIndex - 1 >= 0) return prevIndex - 1; // return prev image
      else return galleryImages.length - 1; // return last image
    });
  }

  return (
    <div className="gallery-box">
      <div className="gallery-box__slider-container">
        <button className="gallery-box__slider-button--prev" onClick={prevSlide}><IoIosArrowDropleftCircle /></button>
        <button className='gallery-box__slider-button--next' onClick={nextSlide}><IoIosArrowDroprightCircle /></button>
      </div>
      {galleryImages[imageIndex]}
    </div>
  )
}

export default Gallery