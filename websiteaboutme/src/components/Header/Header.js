import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './Header.scss';
import styled, { keyframes } from 'styled-components';
import CustomBarsIcon from "../../containerElements/CustomBarIcon/BarIcon";
import {useTranslation} from "react-i18next";
import {useGlobalDispatch, useGlobalState} from "../../GlobalContext";
import PageTransition from "../../PageAnimations/PageTransition";

const slideIn = keyframes`
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(0);
    }
`;

const AnimatedLi = styled.li`
    animation: ${slideIn} 0.5s both;
    animation-delay: ${props => props.delay || '0s'};
`;

const Header = () => {
    const state = useGlobalState();
    const dispatch = useGlobalDispatch();
    const [isActive, setIsActive] = useState(false);
    const [prevPage, setPrevPage] = useState(1);
    const toggleMobileMenu = () => {
        setIsActive(!isActive);
    };
    const [showDropdown, setShowDropdown] = useState(false);
    const closeMobileMenu = () => {
        setIsActive(false);
    };
    const {t, i18n} = useTranslation();
    const changeLanguage = (language) => {

        i18n.changeLanguage(language);
        localStorage.setItem('selectedLanguage', language);
        setShowDropdown(false);
        window.location.reload();
    };
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    const scrollTo = (elementId) => {
            setTimeout(() => {
                document.getElementById(elementId).scrollIntoView({ behavior: 'smooth' });
            }, 625);
    };
    const handleLandingClick = () => {
        setPrevPage(state.currentPage);
        closeMobileMenu();
        dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 });
        startPageTransition();
    };
    const handleAboutClick = () => {
        startPageTransition();
        setPrevPage(state.currentPage);
        closeMobileMenu();
        dispatch({ type: 'SET_CURRENT_PAGE', payload: 2 });

    };
    const handleSkillsClick = () => {
        setPrevPage(state.currentPage);
        closeMobileMenu();
        dispatch({ type: 'SET_CURRENT_PAGE', payload: 3 });
        startPageTransition();
    };
    const handleProjectsClick = () => {
        setPrevPage(state.currentPage);
        closeMobileMenu();
        dispatch({ type: 'SET_CURRENT_PAGE', payload: 4 });
        startPageTransition();
    };

    const handleContactClick = () => {
        setPrevPage(state.currentPage);
        closeMobileMenu();
        dispatch({ type: 'SET_CURRENT_PAGE', payload: 5 });
        startPageTransition();
    };
    const [isTransitionActive, setIsTransitionActive] = useState(false);

    const startPageTransition = () => {
        setIsTransitionActive(true);
        setTimeout(() => {
            setIsTransitionActive(false);
        }, 1800);
    };

    return (
        <header>
            <nav className="header-navbar">
                {isTransitionActive && <PageTransition />}
                <div className="logo-wrapper-header">
                    <img src="/assets/logo/logo_withoutBG_white.png" alt="logo" className="logo-header"/>
                    <Link onClick={() => {
                        handleLandingClick();
                        scrollTo('landingPage');
                    }}>
                        <div
                            className={`current-page ${state.currentPage === 1 ? 'active' : ''} ${prevPage === 1 && state.currentPage !== 1 ? 'prev' : ''}`}
                        >
                            <h1>Lukas Pabst </h1>
                        </div>
                    </Link>
                </div>
                <div className="menu-desktop-header">
                    <ul>
                        <li className="dropdown-container">
                            <button className="dropdown-button" onClick={toggleDropdown}>
                                {i18n.language.toUpperCase()}
                            </button>
                            {showDropdown && (
                                <div className="dropdown-content">
                                    <button className="button" onClick={() => changeLanguage('en')}>EN</button>
                                    <button className="button" onClick={() => changeLanguage('de')}>DE</button>
                                </div>
                            )}
                        </li>
                        <li>
                            <Link onClick={() => {
                                handleAboutClick();
                                scrollTo('about');
                            }}>
                                <div
                                    className={`current-page ${state.currentPage === 2 ? 'active' : ''} ${prevPage === 2 && state.currentPage !== 2 ? 'prev' : ''}`}
                                >
                                    {t('menu.about')}
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => {
                                handleSkillsClick();
                                scrollTo('skills');
                            }}>
                                <div
                                    className={`current-page ${state.currentPage === 3 ? 'active' : ''} ${prevPage === 3 && state.currentPage !== 3 ? 'prev' : ''}`}
                                >
                                    {t('menu.skills')}
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => {
                                handleProjectsClick();
                                scrollTo('projects');
                            }}>
                                <div
                                    className={`current-page ${state.currentPage === 4 ? 'active' : ''} ${prevPage === 4 && state.currentPage !== 4 ? 'prev' : ''}`}
                                >
                                    {t('menu.projects')}</div>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => {
                                handleContactClick();
                                scrollTo('contact');
                            }}>
                                <div
                                    className={`current-page ${state.currentPage === 5 ? 'active' : ''} ${prevPage === 5 && state.currentPage !== 5 ? 'prev' : ''}`}
                                >
                                    {t('menu.contact')}</div>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="menu-mobile-header">

                    <div className="dropdown-container">
                        <div>
                            <button className="dropdown-button" onClick={toggleDropdown}>
                                {i18n.language.toUpperCase()}
                            </button>
                            </div>
                            {showDropdown && (
                                <div className="dropdown-content">
                                    <button className="button" onClick={() => changeLanguage('en')}>EN</button>
                                    <button className="button" onClick={() => changeLanguage('de')}>DE</button>
                                </div>
                            )}
                        </div>

                    <CustomBarsIcon onIconClick={toggleMobileMenu} isActive={isActive} setIsActive={setIsActive}/>
                </div>

                {isActive && (
                    <div className="mobile-menu">
                        <ul>
                            <AnimatedLi delay="0s">
                                <Link onClick={() => {
                                    handleLandingClick();
                                    scrollTo('landingPage');
                                }}>
                                    <div className="mobile-menu-element">{t('menu.landingPage')}</div>
                                </Link>
                            </AnimatedLi>
                            <AnimatedLi delay="0.25s">
                                <Link onClick={() => {
                                    handleAboutClick();
                                    scrollTo('about');
                                }}>
                                    <div className="mobile-menu-element">{t('menu.about')}</div>
                                </Link>
                            </AnimatedLi>
                            <AnimatedLi delay="0.5s">
                                <Link onClick={() => {
                                    handleSkillsClick();
                                    scrollTo('skills');
                                }}>
                                    <div className="mobile-menu-element">{t('menu.skills')}</div>
                                </Link>
                            </AnimatedLi>

                            <AnimatedLi delay="0.75s">
                                <Link onClick={() => {
                                    handleProjectsClick();
                                    scrollTo('projects');
                                }}>
                                    <div className="mobile-menu-element">{t('menu.projects')}</div>
                                </Link>
                            </AnimatedLi>
                            <AnimatedLi delay="1s">
                                <Link onClick={() => {
                                    handleContactClick();
                                    scrollTo('contact');
                                }}>
                                    <div className="mobile-menu-element">{t('menu.contact')}</div>
                                </Link>
                            </AnimatedLi>
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;