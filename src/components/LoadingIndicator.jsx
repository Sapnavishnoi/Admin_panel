import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingIndicator = ({customSize=null}) => (
  <CircularProgress color='secondary' size={customSize || 40}/>
);

export default LoadingIndicator;