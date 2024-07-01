import React from 'react';
import './LoaderScreen.scss';
import { CircularProgress } from '@mui/material';

function renderSwitch(colour) {
  switch (colour) {
    case 'white':
      return (
        <div className="loader-screen__spinner">
          <CircularProgress color="blue" />
        </div>
      );
    default:
      return (
        <div className="loader-screen__spinner">
          <CircularProgress color="blue" />
        </div>
      );
  }
}

function LoaderScreen({ variant }) {
  return (
    <div className="loader-screen">
      {renderSwitch(variant)}
    </div >

  )
}

export default LoaderScreen