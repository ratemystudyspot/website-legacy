import React from 'react'
import Alert from '@mui/material/Alert';
import Fade from '@mui/material/Fade';

function AlertComponenet({ severity, collapse, setCollapse, message }) {
  return (
    <Fade in={collapse}>
      <Alert severity={severity} onClose={() => { setCollapse(false) }}>
        {message}
      </Alert>
    </Fade>
  )
}

export default AlertComponenet;

