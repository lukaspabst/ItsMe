import React, {useEffect, useState} from 'react';
import {Link, Element, scroller} from 'react-scroll';
import AbstractBackground from '../../containerElements/Backgrounds/AbstractBackground';
import './LandingPage.scss';
import AboutPage from "../About/About";

const LandingPage = () => {
    const [isAutoScrolling, setIsAutoScrolling] = useState(false);
    const [prevScrollY, setPrevScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (!isAutoScrolling && currentScrollY > prevScrollY && currentScrollY > 75) {
                setIsAutoScrolling(true);

                scroller.scrollTo('about', {
                    smooth: true,
                    duration: 500,
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
            const scrollDuration = 500;
            const timer = setTimeout(() => {
                setIsAutoScrolling(false);
                // After animation, re-enable scrolling
                document.body.style.overflow = 'visible';
            }, scrollDuration);

            // Clear timeout if the component is unmounted
            return () => clearTimeout(timer);
        }
    }, [isAutoScrolling]);

    useEffect(() => {
        const spans = document.querySelectorAll('.aboutMe-wrapper h1 span, .aboutMe-wrapper p span');

        spans.forEach((span, index) => {
            span.style.animation = `flyIn 1s ease forwards ${index * 0.025}s`;
        });
    }, []);

    const headline = 'About me';
    const text = 'This is where you can provide information about yourself.';

    return (
        <div>
            <AbstractBackground />

            <div className="aboutMe-wrapper">
                <h1>
                    {headline.split('').map((char, idx) => (
                        char === ' ' ? <span key={idx}>&nbsp;</span> : <span key={idx}>{char}</span>
                    ))}
                </h1>
                <p>
                    {text.split('').map((char, idx) => (
                        char === ' ' ? <span key={idx}>&nbsp;</span> : <span key={idx}>{char}</span>
                    ))}
                </p>
            </div>
                <Link
                    to="about"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                >
                    <div className="scroll-toAbout">
                        Scroll to About
                    </div>
                </Link>

            <Element name="about">
                 <AboutPage />
            </Element>

        </div>
    );
};

export default LandingPage;
