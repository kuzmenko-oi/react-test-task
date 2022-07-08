import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

const ProgressBackdrop: React.FC<{ show: boolean }> = ({ show }) => (
  <Backdrop open={show} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default ProgressBackdrop;
