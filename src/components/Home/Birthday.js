
import React, { useState, useEffect } from 'react';
export const BirthdayCard = () => {
    const [isCardOpen, setIsCardOpen] = useState(false);
    const [candlesOn, setCandlesOn] = useState(false);
  
    useEffect(() => {
      // Light candles when card is opened
      if (isCardOpen) {
        setCandlesOn(true);
        const timer = setTimeout(() => {
          setCandlesOn(false);
        }, 2000); // Candle flicker effect duration
        return () => clearTimeout(timer);
      }
    }, [isCardOpen]);
  
    return (
      <div className="flex justify-center items-center flex-col mt-20">
        <div 
          className={`card-container relative w-80 h-96 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 rounded-lg shadow-lg text-white font-bold text-4xl mb-6 cursor-pointer transform ${isCardOpen ? 'rotate-y-180' : ''}`}
          onClick={() => setIsCardOpen(!isCardOpen)}
        >
          <div className="card-content">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-yellow-400"></div>
            <div className="absolute bottom-0 left-0 w-full h-10 bg-yellow-400"></div>
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg z-10"></div>
            {candlesOn && (
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-orange-600 rounded-md animate-pulse"></div>
            )}
          </div>
        </div>
        {isCardOpen && (
          <div className="mt-8 animate-fade-in">
            <h2 className="text-3xl text-center ">
              🎉 Wishing you an amazing year ahead! 🎂
            </h2>
          </div>
        )}
        <Celebration />
      </div>
    );
  };
  
  const Celebration = () => {
    return (
      <div className="mt-8 relative">
        {/* Confetti Effect */}
        <div className="absolute top-5 left-5 animate-ping bg-red-300 p-2 rounded-full"></div>
        <div className="absolute top-5 right-5 animate-ping bg-yellow-300 p-2 rounded-full"></div>
        <div className="absolute bottom-10 left-1/4 animate-ping bg-blue-300 p-2 rounded-full"></div>
        {/* Party popper effect */}
        <div className="absolute top-16 right-20 animate-bounce bg-purple-300 p-4 rounded-full shadow-xl"></div>
      </div>
    );
  };

  