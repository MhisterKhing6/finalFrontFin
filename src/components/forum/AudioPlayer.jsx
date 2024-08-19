import React, { useState, useRef, useEffect } from 'react';
import './AudioPlayer.css';

const AudioPlay = ({file}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        
        const handleLoadedMetadata = () => {
            const totalDuration = formatTime(audio.duration);
            setDuration(totalDuration);
        };

        const handleTimeUpdate = () => {
            const currentTime = formatTime(audio.currentTime);
            setCurrentTime(currentTime);
            setProgress((audio.currentTime / audio.duration) * 100);
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleProgressChange = (e) => {
        const audio = audioRef.current;
        const newTime = (e.target.value / 100) * audio.duration;
        audio.currentTime = newTime;
        setProgress(e.target.value);
    };

    return (
        <>
        <div className='my-2'>
             <div key={file.fileName} className="my-1 audio-player">
             <button className="play-pause-btn" onClick={togglePlayPause}>
                 {isPlaying ? 'Pause' : 'Play'}
             </button>
             <div className="progress-container">
                 <input 
                     type="range" 
                     className="progress-bar" 
                     value={progress} 
                     onChange={handleProgressChange}
                 />
             </div>
             <div className="time-info">
                 <span>{currentTime}</span> / <span>{duration}</span>
             </div>
             <audio ref={audioRef} src={file.fileUrl}></audio>
         </div>
         <small>{file.fileName}</small>
         </div>
        </>
    );
};

export {AudioPlay};
