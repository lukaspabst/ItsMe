import React, {useState} from 'react';
import './About.scss';
import BackgroundAbout from "../../containerElements/Backgrounds/BackgroundAbout";
import { useInView } from "react-intersection-observer";
import {FaGithub, FaInstagram, FaTwitter} from "react-icons/fa";
import {useTranslation} from "react-i18next";

const AboutPage = () => {
    const [isHovered, setIsHovered] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.75,
        triggerOnce: false
    });
    const { t } = useTranslation();

    const content = [
        { word: t('aboutMe.greeting'), icon: '👋', newLine: true },
        { word: '', icon: '', newLine: true },
        {
            word: t('aboutMe.work'),
            icon: '💼',
            subItems: [
                { word: t('aboutMe.myCurrentFocus'), subItems: [
                        { word: `⇒  ${t('aboutMe.backendDevelopment')}` },
                        { word: `⇒  ${t('aboutMe.restServiceDevelopment')}` }
                    ]},
            ]
        },
        { word: t('aboutMe.education'), icon: '🎓', newLine: true },
        { word: '', icon: '', newLine: true },
        { word: t('aboutMe.languages'), icon: '🌐', newLine: true },
        { word: '', icon: '', newLine: true },
        { word: t('aboutMe.hobbies'), icon: '🏋️‍♂️', newLine: true },
        { word: '', icon: '', newLine: true },
        { word: t('aboutMe.contact'), icon: '📧', newLine: true },
        { word: '', icon: '', newLine: true },
        { word: t('aboutMe.lookingForward'), icon: '', newLine: false },
    ];

    return (
        <div ref={ref}>
            <BackgroundAbout/>
            <div className="about-page" id="about">
                <h1 className={`about-header ${inView ? 'fade-in' : 'fade-out'}`}>{t('aboutMe.headline')}</h1>
                <div className="content-and-Image-wrapper">
                    <div className={`about-me-content ${inView ? 'fade-in' : 'fade-out'}`}>
                        <p className="about-text">
                            {content.map((entry, wordIndex) =>
                                <>
                                    <span key={wordIndex} style={{
                                        display: 'inline-block',
                                        marginRight: '5px',
                                        animation: inView ? `appear 2s ease ${wordIndex / 2}s forwards` : `leave 0.25s ease`
                                    }}>{entry.icon}{entry.word}
                                    </span>
                                    {entry.subItems && entry.subItems.map((subItem, subIndex) => (
                                        <div key={subIndex} style={{marginLeft: '36px'}}>
                                            <span style={{
                                                display: 'inline-block',
                                                marginRight: '5px',
                                                animation: inView ? `appear 2s ease ${subIndex / 2 + wordIndex / 2}s forwards` : `leave 0.25s ease`
                                            }}>
                                                {subItem.word}{subItem.word && <br/>}
                                            </span>
                                            {subItem.subItems && subItem.subItems.map((subSubItem, subSubIndex) => (
                                                <div key={subSubIndex} style={{
                                                    marginLeft: '20px',
                                                    marginTop: subSubIndex === 0 ? '10px' : '0px'
                                                }}>
                                                    <span style={{
                                                        display: 'inline-block',
                                                        marginRight: '5px',
                                                        animation: inView ? `appear 2s ease ${subSubIndex / 2 + subIndex / 2 + wordIndex / 2}s forwards` : `leave 0.25s ease`
                                                    }}>
                                                        {subSubItem.word}
                                                    </span>
                                                    <br/>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                    <br/>
                                </>
                            )}
                        </p>
                    </div>
                        <div className="about-me-image-wrapper">
                            <img src="/assets/pictures/img.png" alt="Me"
                                 className={`about-me-image pixelated ${inView ? 'scale-up' : 'scale-down'}`}
                                 onMouseOver={() => setIsHovered(true)}
                                 onMouseOut={() => setIsHovered(false)}/>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '40%',
                                    left: '75%',
                                    transform: 'translate(-50%, -40%)'
                                }}>
                                <div
                                    className={`image-overlay-toRevealHover ${inView ? 'is-visible' : 'is-hidden'} ${isHovered ? 'is-hidden' : ''}`}>Hover
                                    to reveal
                                </div>
                            </div>
                        </div>
                    </div>

                <div className={`social-media-wrapper ${inView ? 'scale-up' : 'scale-down'}`}>
                    <ul>
                        <li>
                            <a href="https://github.com/lukaspabst" target="_blank" rel="noreferrer">
                                <i className="fa-brands fa-github-f">
                                    <FaGithub/>
                                </i>
                                <span>
                                    - Github
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com/ZenayoK" target="_blank" rel="noreferrer">
                                <i className="fa-brands">
                                    <FaTwitter/>
                                </i>
                                <span>
                                            - Twitter
                                        </span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/lukas_23.03" target="_blank" rel="noreferrer">
                                <i className="fa-brands">
                                    <FaInstagram/>
                                </i>
                                <span>
                                    - Instagram
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
