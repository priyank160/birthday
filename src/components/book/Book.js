import React, { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import "./book.css";
import { HiOutlineCursorClick } from "react-icons/hi";
import { FaMicrophone } from "react-icons/fa";

const Book = ({ name, message }) => {
  const bookRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const [isMicAccessGranted, setMicAccessGranted] = useState(false);
  const [error, setError] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);

  const requestMicAccess = async () => {
    setIsRequesting(true);
    setError(""); // Reset error on each request
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicAccessGranted(true);
      setIsRequesting(false);
      console.log("Microphone access granted!");
    } catch (err) {
      setIsRequesting(false);
      setError("Microphone access denied or failed.");
      console.error("Error accessing microphone:", err);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [currentPage, setCurrentPage] = useState(0);

  const handleNextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const handlePrevPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const handleFlip = (e) => {
    setCurrentPage(e.data);
  };

  return (
    <div className="flipbook-container">
      <HTMLFlipBook
        ref={bookRef}
        width={isMobile ? 300 : 600}
        height={isMobile ? 450 : 800}
        size="fixed"
        minWidth={300}
        maxWidth={800}
        minHeight={400}
        maxHeight={1000}
        maxShadowOpacity={0.5}
        drawShadow={false}
        flippingTime={1000}
        useMouseEvents={true}
        showCover={true}
        onFlip={handleFlip}
      >
        <div className="page">
          <div className="py-2 px-10 mt-14  lg:mt-0 flex flex-col lg:justify-center  text-center items-center min-h-full">
            <h2 className="text-center lg:text-[43px] text-[32px] font-bold leading-[50px] capitalize">
              Happy birthday
            </h2>
            <h2 className="text-center lg:text-[55px] text-[42px] lg:mt-8 font-bold leading-[65px] capitalize ">
              {name}
            </h2>
            <button className="absolute right-5 bottom-5 inline-flex items-center gap-2 text-lg uppercase font-semibold">
              Click here <HiOutlineCursorClick className="text-xl" />
            </button>
          </div>
        </div>
        <div className="page">
          <p className="flex justify-center m-auto items-center text-center min-h-full font-semibold text-2xl">
            {message}
          </p>
        </div>
        <div className="page">
          <h2 className="lg:text-[70px] text-[40px] font-bold lg:mt-16 mt-1 text-center font-pontano">
            Blow!
          </h2>
          <h2 className="lg:mt-3 mt-1 text-xl text-center">(For a surprise)</h2>
          <iframe
            src="/cake.html"
            title="Cake Animation"
            style={{
              width: isMobile ? "90%" : "100%",
              height:isMobile ? "400px" :  "500px",
              border: "none",
              marginTop: isMobile ? "" : '',
            }}
            
          />
          <button className="absolute right-6 top-4 inline-flex underline items-center gap-2 lg:text-xl  text-lg font-semibold">
            Skip
          </button>
          <button
            onClick={requestMicAccess}
            className="mx-auto flex items-center bg-[#4a4a4a] opacity-70 py-2 px-6 rounded-md text-white gap-2 lg:text-xl text-sm capitalize font-semibold"
          >
            <FaMicrophone className="text-2xl" /> Allow access to mic
          </button>

          {isRequesting && (
            <p className="mt-4 text-blue-500">
              Requesting microphone access...
            </p>
          )}

          {isMicAccessGranted && (
            <p className="mt-4 text-green-500">Microphone access granted!</p>
          )}

          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
        <div className="page">Back Cover</div>
      </HTMLFlipBook>
    </div>
  );
};

export default Book;
