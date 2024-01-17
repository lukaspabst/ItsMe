import React, { useEffect, useState } from "react";
import './WelcomeAnimation.scss';
import {useTranslation} from "react-i18next"; // Add your welcome animation styles here

const WelcomeAnimation = () => {
    const { t } = useTranslation();
    useEffect(() => {
        const textContainer = document.querySelector('.text-container');
        if (textContainer) {
            const text = textContainer.innerText;
            const chars = text.split('');

            textContainer.innerHTML = chars
                .map(
                    (char, index) =>
                        `<span class="animated-char" style="animation-delay: ${index * 0.1}s">${char}</span>`
                )
                .join('');
        }
    }, []);
    return (
        <div className={`animation-container `}>
            <div className="text-container">
                <h1>{t('welcome')}</h1>
            </div>
            <div className="ellipse"></div>
        </div>
    );
};

export default WelcomeAnimation;
