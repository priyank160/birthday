// Envelope.js
import React, { useState, useEffect } from "react";
import "./index.css";

const Envelope = ({ name }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const openTimeout = setTimeout(() => {
      setIsOpen(true);
    }, 500); // Open after 0.5 seconds

    const closeTimeout = setTimeout(() => {
      setIsOpen(false);
    }, 5000);

    return () => {
      clearTimeout(openTimeout);
      clearTimeout(closeTimeout);
    };
  }, []);

  return (
    <div className="container">
      <div className={`envelope-wrapper ${isOpen ? "flap" : ""}`}>
        <div className="envelope">
          <div className="letter">
            <div className="text">
              <p className="text-center text-xl font-bold">Happy Birthday</p>
              <p className="text-center text-xl font-bold">{name || ""}</p>
            </div>
          </div>
        </div>
        <div className="heart"></div>
      </div>
    </div>
  );
};

export default Envelope;
