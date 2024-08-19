import React, { useState, useRef, useEffect } from 'react';
import image from "../../assets/c.png"
import './VideoPlayer.css';
import { FaPlay } from 'react-icons/fa';

const VideoPlayer = ({ file }) => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    const handlePlayClick = () => {
        setIsVideoLoaded(true);
    };

    return (
        <>
                <div className="video-card">
                <div className="video-content">
                    {(!isVideoLoaded && !file.st) ? (
                        <div className="video-placeholder" onClick={handlePlayClick}>
                            <img src={image} alt="Video thumbnail" className="video-thumbnail" />
                            <div className="play-button-overlay">
                                <FaPlay size={40} color="#fff" />
                            </div>
                        </div>
                    ) : (
                        <video controls className="video-element">
                            <source src={file.fileUrl} type='video/mp4' />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>
            </div>
        </>
    );
};

export {VideoPlayer};
