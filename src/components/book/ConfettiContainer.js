import React, { useEffect, useState } from 'react'
import Confetti from "react-confetti";

function ConfettiContainer() {

    const { width } = window.innerWidth;
    const { height } = window.innerHeight;
    const [candleBlown, setCandleBlown] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (sessionStorage.getItem('candleBlown')) {
                clearInterval(interval);
                setCandleBlown(true);
                document.querySelector('.birthday-greeting-page').classList.replace('hidden', 'flex');
            } else {
                setCandleBlown(false);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
            sessionStorage.removeItem('candleBlown');
        };
    }, []);

    if (!candleBlown) return null;
    return (
        <Confetti width={width} height={height} />
    )
}

export default ConfettiContainer