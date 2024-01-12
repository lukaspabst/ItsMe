import React, {useEffect, useState} from 'react';
import './About.scss';
import BackgroundAbout from "../../containerElements/Backgrounds/BackgroundAbout";
import { useInView } from "react-intersection-observer";
import {FaGithub, FaInstagram, FaTwitter} from "react-icons/fa";

const AboutPage = () => {
    const [isHovered, setIsHovered] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.75,
        triggerOnce: false
    });


    useEffect(() => {
        console.log("About ViewState "+inView);
    }, [inView]);


    const text = "Welcome to my website! I am passionate about [your interests or profession].\nThis page is dedicated to sharing information about myself, my experiences, and\nthe things I love. Feel free to explore and learn more about me.";
    const words = text.split(/(\n| )/);

    return (
        <div ref={ref}>
            <BackgroundAbout />
            <div className="about-page" id="about">
                <h1 className={`about-header ${inView ? 'fade-in' : 'fade-out'}`}>About Me</h1>
                <div className="content-and-Image-wrapper">
                    <div className="about-me-content">
                        <p className="about-text">
                            {words.map((word, wordIndex) =>
                                word === "\n" ? (
                                    <br key={wordIndex}/>
                                ) : (
                                    <span key={wordIndex} style={{display: 'inline-block', marginRight: '5px'}}>
                                            {word.split('').map((char, charIndex, charArray) => {
                                                const reversedIndex = charArray.length - charIndex;
                                                return (
                                                    <span
                                                        key={`${wordIndex}-${charIndex}`}
                                                        style={{
                                                            animation: inView
                                                                ? `appear 2s ease ${charIndex / 10}s forwards`
                                                                : `leave 0.5s ease ${reversedIndex / 10}s forwards`,
                                                        }}
                                                    >
                                                  {char}
                                                </span>
                                                );
                                            })}
                                      </span>
                                )
                            )}
                        </p>
                        <div className={`social-media-wrapper ${inView ? 'scale-up' : 'scale-down'}`}>
                            <ul>
                                <li>
                                    <a href="#">
                                        <i className="fa-brands fa-github-f">
                                            <FaGithub />
                                        </i>
                                        <span>
                                            - Github
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa-brands">
                                            <FaTwitter />
                                        </i>
                                        <span>
                                            - Twitter
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa-brands">
                                            <FaInstagram />
                                        </i>
                                        <span>
                                            - Instagram
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="about-me-image-wrapper">
                        <img src="/assets/pictures/img.png" alt="Me"
                             className={`about-me-image pixelated ${inView ? 'scale-up' : 'scale-down'}`}
                             onMouseOver={() => setIsHovered(true)}
                             onMouseOut={() => setIsHovered(false)}/>
                        <div
                            style={{position: 'absolute', top: '50%', left: '75%', transform: 'translate(-50%, -50%)'}}>
                            <div
                                className={`image-overlay-toRevealHover ${inView ? 'is-visible' : 'is-hidden'} ${isHovered ? 'is-hidden' : ''}`}>Hover
                                to reveal
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
