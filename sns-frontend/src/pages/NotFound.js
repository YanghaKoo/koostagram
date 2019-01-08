import React from 'react';
import Spinner from '../lib/Spinner';

const NotFound = () => {
  return (
    // <div className="no-post" style={{fontSize : "3rem", marginTop : "15vh"}}>
    <div>
      Page Not Found
      <Spinner width="100px" height="100px" pw="10%" ph="10vh"/>
    </div>
  );
};

export default NotFound;
