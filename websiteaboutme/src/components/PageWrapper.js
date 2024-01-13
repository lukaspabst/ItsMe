import React, { useEffect, useState } from 'react';
import { scroller } from 'react-scroll';
import LandingPage from './Landing/LandingPage';
import AboutPage from './About/About';

function PageWrapper() {
    const [isAutoScrolling, setIsAutoScrolling] = useState(false);
    const [prevScrollY, setPrevScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (!isAutoScrolling && currentScrollY > prevScrollY && currentScrollY > 75) {
                setIsAutoScrolling(true);

                scroller.scrollTo('about', {
                    smooth: true,
                    duration: 1000,
                    easing: 'easeInOutQuart',
                });
            }

            setPrevScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollY, isAutoScrolling]);

    useEffect(() => {
        if (isAutoScrolling) {
            const scrollDuration = 1000;
            const timer = setTimeout(() => {
                setIsAutoScrolling(false);
                // After animation, re-enable scrolling
                document.body.style.overflow = 'visible';
            }, scrollDuration);

            // Clear timeout if the component is unmounted
            return () => clearTimeout(timer);
        }
    }, [isAutoScrolling]);

    return (
        <div>
            <LandingPage />
            <AboutPage />
        </div>
    );
}

export default PageWrapper;
