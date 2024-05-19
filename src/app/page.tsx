"use client"
import React, { useState } from 'react';
import Timepicker from '../../components/Timepicker';

const Home = () => {
  const [showTimepicker, setShowTimepicker] = useState(false);

  const handleButtonClick = () => {
    setShowTimepicker(true);
  };

  const handleCloseTimepicker = () => {
    setShowTimepicker(false);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Show Timepicker</button>
      {showTimepicker && <Timepicker onClose={handleCloseTimepicker} />}
      <style jsx>{`
        button {
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Home;
