import React, { useState } from 'react';
import './Gallery.scss';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

function Gallery({ galleryFiles = [] }) {
  const [fileIndex, setfileIndex] = useState(0);

  const nextSlide = () => {
    setfileIndex((prevIndex) => {
      if (prevIndex + 1 < galleryFiles.length) return prevIndex + 1; // return next file
      else return 0; // return first file
    });
  }

  const prevSlide = () => {
    setfileIndex((prevIndex) => {
      if (prevIndex - 1 >= 0) return prevIndex - 1; // return prev file
      else return galleryFiles.length - 1; // return last file
    });
  }

  return (
    <div className="gallery-box">
      <div className="gallery-box__slider-container">
        <button className="gallery-box__slider-button--prev" onClick={prevSlide}><IoIosArrowDropleftCircle /></button>
        <button className='gallery-box__slider-button--next' onClick={nextSlide}><IoIosArrowDroprightCircle /></button>
      </div>
      {galleryFiles[fileIndex]}
    </div>
  )
}

export default Gallery