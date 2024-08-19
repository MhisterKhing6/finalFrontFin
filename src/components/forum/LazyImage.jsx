import React, { useState, useEffect, useRef } from 'react';

const LazyImage = ({ src, alt }) => {
    const [isVisible, setIsVisible] = useState(false);
    const imageRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (imageRef.current) {
            observer.observe(imageRef.current);
        }

        return () => {
            if (observer && observer.disconnect) {
                observer.disconnect();
            }
        };
    }, []);

    return (
        <img
            ref={imageRef}
            src={isVisible ? src : ''}
            alt={alt}
            style={{ width: '100%', height: 'auto' }}
        />
    );
};

export default LazyImage;
