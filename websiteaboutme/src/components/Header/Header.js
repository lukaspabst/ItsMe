import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './Header.scss';
import styled, { keyframes } from 'styled-components';
import CustomBarsIcon from "../../containerElements/CustomBarIcon/BarIcon";
import {useTranslation} from "react-i18next";

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

    const [isActive, setIsActive] = useState(false);
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
    };
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    return (
        <header>
            <nav className="header-navbar">
                <div className="logo-wrapper-header">
                    <img src="/assets/logo/logo_withoutBG_white.png" alt="logo" className="logo-header"/>
                    <h1>Lukas Pabst </h1>
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
                            <Link to="/" onClick={closeMobileMenu}>
                                <div>{t('menu.about')}</div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/skills" onClick={closeMobileMenu}>
                                <div>{t('menu.skills')}</div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/projects" onClick={closeMobileMenu}>
                                <div>{t('menu.projects')}</div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" onClick={closeMobileMenu}>
                                <div>{t('menu.contact')}</div>
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
                                <Link to="/" onClick={closeMobileMenu}>
                                    <div className="mobile-menu-element">{t('menu.about')}</div>
                                </Link>
                            </AnimatedLi>
                            <AnimatedLi delay="0.25s">
                                <Link to="/projects" onClick={closeMobileMenu}>
                                    <div className="mobile-menu-element">{t('menu.projects')}</div>
                                </Link>
                            </AnimatedLi>
                            <AnimatedLi delay="0.5s">
                                <Link to="/contact" onClick={closeMobileMenu}>
                                    <div className="mobile-menu-element">{t('menu.contact')}</div>
                                </Link>
                            </AnimatedLi>
                            <AnimatedLi delay="0.75s">
                                <Link to="/skills" onClick={closeMobileMenu}>
                                    <div className="mobile-menu-element">{t('menu.skills')}</div>
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