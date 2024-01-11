import React from 'react';
import './About.scss';
import BackgroundAbout from "../../containerElements/Backgrounds/BackgroundAbout";
import { useInView } from "react-intersection-observer";

const AboutPage = () => {
    const { ref, inView } = useInView({
        threshold: 0.75,
        triggerOnce: false
    });

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
                    </div>
                    <div className="about-me-image-wrapper">
                        <img src="/assets/pictures/img.png" alt="Me"
                             className={`about-me-image pixelated ${inView ? 'scale-up' : 'scale-down'}`}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
