import React from 'react';
import {FaGithub, FaXing, FaInstagram, FaTwitter, FaRegCopyright} from "react-icons/fa6";
import'./Footer.scss'
import {useTranslation} from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer>
            <div className="footer-content">
                <div className="social-media">
                    <a href="https://github.com/lukaspabst" target="_blank" rel="noopener noreferrer">
                        <FaGithub/>
                    </a>
                    <a href="https://www.xing.com/profile/Lukas_Pabst102" target="_blank" rel="noopener noreferrer">
                        <FaXing/>
                    </a>
                    <a href="https://twitter.com/ZenayoK" target="_blank" rel="noopener noreferrer">
                        <FaTwitter/>
                    </a>
                    <a href="https://www.instagram.com/lukas_23.03" target="_blank" rel="noopener noreferrer">
                        <FaInstagram/>
                    </a>
                </div>
                <div className="copyright">
                    <FaRegCopyright />
                    <p>{t('copyright')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
