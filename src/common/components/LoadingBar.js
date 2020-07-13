import React from 'react';
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';

function LoadingBar({ show, color = 'red' }) {
  return <Loading show={show} color={color} />;
}

export default LoadingBar;

// interface load {
//   show: boolean;
//   color: string;
// }
