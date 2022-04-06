import React, { useEffect } from 'react';
import '../styles/spinner.css';


const Spinner = () => {
  return (
    <div className="spinner-background">
      <div className="spinner">
        <div className="keg">
          <span className="handle"></span>
          <span className="pipe"></span>
        </div>
        <div className="glass">
          <span className="beer"></span>
        </div>
      </div>
      <h2 className='spinner-text'>Loading</h2>
    </div>
  );
};

export default Spinner; 