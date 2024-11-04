// Cam.js
import React, { useEffect, useState } from 'react';

const Cam = () => {
    const [imageSrc, setImageSrc] = useState("http://192.168.0.104"); // Initial image source

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Generate a new URL with a query parameter to bypass cache
            setImageSrc(`http://192.168.0.104?timestamp=${Date.now()}`);
        }, 100); // Adjust the interval as needed (1000ms = 1 second)

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    return (
        <div style={{
            flex: '1', // Takes 1 part of the flex space
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000' // Optional: Background color
        }}>
            <img
                src={imageSrc} // Use the image source state
                alt="Camera Stream"
                style={{ width: '100%', height: 'auto', transform: "scaleY(-1)"}} // Adjust as necessary
            />
        </div>
    );
};

export default Cam;
