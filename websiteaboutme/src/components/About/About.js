import React from 'react';
import './About.scss';
import BackgroundAbout from "../../containerElements/Backgrounds/BackgroundAbout";
import { useInView } from "react-intersection-observer";
import {FaGithub, FaInstagram, FaTwitter} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import {FaXing} from "react-icons/fa6";

const AboutPage = () => {
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
                        <p className="about-text overflow-y">
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
                    <div className={`about-me-image-wrapper ${inView ? 'fade-in' : 'fade-out'}`}>
                        <img
                            src="/assets/pictures/ItsMe.webp"
                            alt="Me"
                            className={`about-me-image ${inView ? 'scale-up' : 'scale-down'}`}
                        />
                    </div>
                </div>

                <div className={`social-media-wrapper ${inView ? 'scale-up' : 'scale-down'}`}>
                    <ul>
                    <li>
                            <a href="https://github.com/lukaspabst" target="_blank" rel="noreferrer"  aria-label="Github Link">>
                                <i className="fa-brands fa-github-f">
                                    <FaGithub/>
                                </i>
                                <span>
                                    - Github
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.xing.com/profile/Lukas_Pabst102" target="_blank" rel="noreferrer"  aria-label="Xing Link">>
                                <i className="fa-brands">
                                    <FaXing/>
                                </i>
                                <span>
                                    - Xing
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com/ZenayoK" target="_blank" rel="noreferrer"  aria-label="Twitter Link">>
                                <i className="fa-brands">
                                    <FaTwitter/>
                                </i>
                                <span>
                                            - Twitter
                                        </span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/lukas_23.03" target="_blank" rel="noreferrer"  aria-label="Instagram Link">>
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
