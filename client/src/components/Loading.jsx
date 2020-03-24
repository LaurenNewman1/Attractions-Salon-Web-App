import React from 'react';
import { CircularProgress } from '@material-ui/core';

const Loading = () => (
  <CircularProgress
    style={{
      position: 'absolute',
      top: '50%',
      bottom: '50%',
      left: '50%',
      right: '50%',
    }}
  />
);

export default Loading;
